package database

import (
	"encoding/json"
	"fmt"
)

type DBConfig struct {
	Type     string `json:"type"`
	Host     string `json:"host"`
	Port     int    `json:"port"`
	Database string `json:"database"`
	User     string `json:"user"`
	Password string `json:"password"`
	SSLMode  string `json:"sslMode"`
}

type Database interface {
	Backup(taskId string, config DBConfig) (string, error)
	ValidateConnection(config DBConfig) error
}

func ParseConfig(configJSON string) (DBConfig, error) {
	var config DBConfig
	err := json.Unmarshal([]byte(configJSON), &config)
	if err != nil {
		return DBConfig{}, fmt.Errorf("error parsing configuration: %v", err)
	}
	return config, nil
}

func NewDatabase(dbType string) (Database, error) {
	switch dbType {
	case "PostgreSQL":
		return &PostgreSQL{}, nil
	case "MySQL", "MariaDB":
		return &MySQL{}, nil
	// You can add more cases for other database types in the future
	default:
		return nil, fmt.Errorf("unsupported database type: %s", dbType)
	}
}
