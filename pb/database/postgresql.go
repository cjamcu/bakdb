package database

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/jackc/pgx/v4"
)

type PostgreSQL struct{}

func (pg *PostgreSQL) Backup(taskId string, config DBConfig) (string, error) {
	timestamp := time.Now().Format("20060102150405")
	filename := fmt.Sprintf("%s_%s_%s.sql", config.Database, taskId, timestamp)

	cmd := exec.Command("pg_dump",
		"-h", config.Host,
		"-p", fmt.Sprintf("%d", config.Port),
		"-U", config.User,
		"-d", config.Database,
		"-f", filename)

	cmd.Env = append(os.Environ(), fmt.Sprintf("PGPASSWORD=%s", config.Password))

	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("error performing backup: %v, output: %s", err, string(output))
	}

	// Get the absolute path of the file
	absPath, err := filepath.Abs(filename)
	if err != nil {
		return "", fmt.Errorf("error getting absolute path: %v", err)
	}

	fmt.Printf("Backup completed successfully: %s\n", absPath)
	return absPath, nil
}

func (pg *PostgreSQL) Restore(config DBConfig, backupFile string) error {
	cmd := exec.Command("psql",
		"-h", config.Host,
		"-p", fmt.Sprintf("%d", config.Port),
		"-U", config.User,
		"-d", config.Database,
		"-f", backupFile)

	cmd.Env = append(os.Environ(), fmt.Sprintf("PGPASSWORD=%s", config.Password))

	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("error restoring backup: %v, output: %s", err, string(output))
	}

	fmt.Printf("Restoration completed successfully from: %s\n", backupFile)
	return nil
}

func (pg *PostgreSQL) ValidateConnection(config DBConfig) error {
	connStr := fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=%s",
		config.User, config.Password, config.Host, config.Port, config.Database, config.SSLMode)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	conn, err := pgx.Connect(ctx, connStr)
	if err != nil {
		return pg.handleConnectionError(err)
	}
	defer conn.Close(ctx)

	err = conn.Ping(ctx)
	if err != nil {
		return pg.handleConnectionError(err)
	}

	return nil
}

func (pg *PostgreSQL) handleConnectionError(err error) error {
	errMsg := err.Error()
	switch {
	case strings.Contains(errMsg, "connection refused"):
		return fmt.Errorf("unable to connect to the database server. Please ensure the PostgreSQL service is running")
	case strings.Contains(errMsg, "hostname resolving error"):
		return fmt.Errorf("unable to resolve the database hostname. Please check if the host address is correct")
	case strings.Contains(errMsg, "SQLSTATE 3D000"):
		return fmt.Errorf("the specified database does not exist. Please check the database name")
	case strings.Contains(errMsg, "SQLSTATE 28P01"):
		return fmt.Errorf("authentication failed. Please check your username and password")
	default:
		return fmt.Errorf("an error occurred while connecting to the database: %v", err)
	}
}
