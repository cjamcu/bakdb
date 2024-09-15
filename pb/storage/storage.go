package storage

import (
	"fmt"
	"io"
)

type StorageConfig struct {
	Type     string `json:"type"`
	Path     string `json:"path,omitempty"`
	Bucket   string `json:"bucket,omitempty"`
	Region   string `json:"region,omitempty"`
	Key      string `json:"key,omitempty"`
	Secret   string `json:"secret,omitempty"`
	Endpoint string `json:"endpoint,omitempty"`
}

type Storage interface {
	Upload(filename string, data io.Reader) error
	Download(filename string) (io.ReadCloser, error)
	Delete(filename string) error
	ValidateConnection(config StorageConfig) error
}

func NewStorage(config StorageConfig) (Storage, error) {
	switch config.Type {
	case "Local":
		return NewLocalStorage(config)
	case "R2", "Spaces", "B2", "S3":
		return NewS3Storage(config)
	default:
		return nil, fmt.Errorf("storage type not supported: %s", config.Type)
	}
}
