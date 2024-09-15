package api

import (
	"bakdb/pb/storage"
	"fmt"
	"io"
	"log"
	"net/http"

	"encoding/json"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
)

func DownloadBackupHandler(app *pocketbase.PocketBase) echo.HandlerFunc {
	return func(c echo.Context) error {
		backupId := c.PathParam("id")

		// Get the backup record
		backup, err := app.Dao().FindRecordById("backups", backupId)
		if err != nil {
			log.Printf("Error finding backup: %v", err)
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Backup not found"})
		}

		// Get the task associated with the backup
		taskId := backup.GetString("task")
		task, err := app.Dao().FindRecordById("tasks", taskId)
		if err != nil {
			log.Printf("Error finding associated task: %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Associated task not found"})
		}

		// Get the storage configuration
		var storageConfigs []storage.StorageConfig
		if err := json.Unmarshal([]byte(task.GetString("storageConfigs")), &storageConfigs); err != nil {
			log.Printf("Error parsing storage configuration: %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error parsing storage configuration"})
		}

		// Use the first storage configuration (you can adjust this according to your needs)
		if len(storageConfigs) == 0 {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "No storage configuration found"})
		}
		storageConfig := storageConfigs[0]

		// Create storage instance
		store, err := storage.NewStorage(storageConfig)
		if err != nil {
			log.Printf("Error creating storage instance: %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error creating storage instance"})
		}

		// Get the file from storage
		fileName := backup.GetString("filename")
		if fileName == "" {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Filename is empty"})
		}
		fileReader, err := store.Download(fileName)
		if err != nil {
			log.Printf("Error downloading file from storage: %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": fmt.Sprintf("Error retrieving file from storage: %v", err)})
		}
		defer fileReader.Close()

		// Set headers for download
		c.Response().Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s", fileName))
		c.Response().Header().Set("Content-Type", "application/octet-stream")

		// Copy file content to response
		_, err = io.Copy(c.Response().Writer, fileReader)
		if err != nil {
			log.Printf("Error streaming file content: %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": fmt.Sprintf("Error streaming file content: %v", err)})
		}

		return nil
	}
}
