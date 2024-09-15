package storage

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
)

func NewLocalStorage(config StorageConfig) (*StorageConfig, error) {
	if config.Path == "" {
		return nil, fmt.Errorf("path no especificado para almacenamiento local")
	}
	return &config, nil
}

func (config *StorageConfig) Upload(filename string, data io.Reader) error {

	fullPath := config.Path + "/" + filename

	// Asegurarse de que el directorio base existe
	if err := os.MkdirAll(config.Path, 0755); err != nil {
		return fmt.Errorf("error creating base directory %s: %v", config.Path, err)
	}

	// Crear el archivo
	file, err := os.Create(fullPath)
	if err != nil {
		return fmt.Errorf("error creating file %s: %v", fullPath, err)
	}
	defer file.Close()

	// Copiar los datos al archivo
	_, err = io.Copy(file, data)
	if err != nil {
		// Si falla la escritura, intentamos eliminar el archivo creado
		os.Remove(fullPath)
		return fmt.Errorf("error writing to file %s: %v", fullPath, err)
	}

	return nil
}

func (ls *StorageConfig) Download(filename string) (io.ReadCloser, error) {
	fullPath := filepath.Join(ls.Path, filename)
	file, err := os.Open(fullPath)
	if err != nil {
		return nil, fmt.Errorf("error opening file %s: %v", fullPath, err)
	}
	return file, nil
}

func (ls *StorageConfig) Delete(filename string) error {
	fullPath := filepath.Join(ls.Path, filename)
	err := os.Remove(fullPath)
	if err != nil {
		return fmt.Errorf("error deleting file %s: %v", fullPath, err)
	}
	return nil
}

func (cs *StorageConfig) ValidateConnection(config StorageConfig) error {
	return nil
}
