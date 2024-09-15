package database

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type MySQL struct{}

func (my *MySQL) Backup(taskId string, config DBConfig) (string, error) {
	timestamp := time.Now().Format("20060102150405")
	filename := fmt.Sprintf("%s_%s_%s.sql", config.Database, taskId, timestamp)

	cmd := exec.Command("mysqldump",
		"-h", config.Host,
		"-P", fmt.Sprintf("%d", config.Port),
		"-u", config.User,
		"-p"+config.Password,
		config.Database)

	output, err := cmd.Output()
	if err != nil {
		return "", fmt.Errorf("error performing backup: %v", err)
	}

	err = os.WriteFile(filename, output, 0644)
	if err != nil {
		return "", fmt.Errorf("error writing backup file: %v", err)
	}

	// Get the absolute path of the file
	absPath, err := filepath.Abs(filename)
	if err != nil {
		return "", fmt.Errorf("error getting absolute path: %v", err)
	}

	fmt.Printf("Backup completed successfully: %s\n", absPath)
	return absPath, nil
}

func (my *MySQL) Restore(config DBConfig, backupFile string) error {
	cmd := exec.Command("mysql",
		"-h", config.Host,
		"-P", fmt.Sprintf("%d", config.Port),
		"-u", config.User,
		"-p"+config.Password,
		config.Database)

	file, err := os.Open(backupFile)
	if err != nil {
		return fmt.Errorf("error opening backup file: %v", err)
	}
	defer file.Close()

	cmd.Stdin = file

	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("error restoring backup: %v, output: %s", err, string(output))
	}

	fmt.Printf("Restoration completed successfully from: %s\n", backupFile)
	return nil
}

func (my *MySQL) ValidateConnection(config DBConfig) error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s",
		config.User, config.Password, config.Host, config.Port, config.Database)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return my.handleConnectionError(err)
	}
	defer db.Close()

	err = db.PingContext(ctx)
	if err != nil {
		return my.handleConnectionError(err)
	}

	return nil
}

func (my *MySQL) handleConnectionError(err error) error {
	errMsg := err.Error()
	switch {
	case strings.Contains(errMsg, "connection refused"):
		return fmt.Errorf("unable to connect to the database server. Please ensure the MySQL service is running")
	case strings.Contains(errMsg, "unknown network"):
		return fmt.Errorf("unable to resolve the database hostname. Please check if the host address is correct")
	case strings.Contains(errMsg, "Unknown database"):
		return fmt.Errorf("the specified database does not exist. Please check the database name")
	case strings.Contains(errMsg, "Access denied"):
		return fmt.Errorf("authentication failed. Please check your username and password")
	default:
		return fmt.Errorf("an error occurred while connecting to the database: %v", err)
	}
}
