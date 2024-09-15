package api

import (
	backup "bakdb/pb/backup"
	"bakdb/pb/database"

	"bakdb/pb/storage"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

type TaskRequest struct {
	User           string                  `json:"user"`
	Name           string                  `json:"name"`
	DBConfig       database.DBConfig       `json:"dbConfig"`
	StorageConfigs []storage.StorageConfig `json:"storageConfigs"`
	Cron           string                  `json:"cron"`
	RetentionDays  int                     `json:"retentionDays"`
}

func CreateTaskHandler(app *pocketbase.PocketBase) echo.HandlerFunc {
	return func(c echo.Context) error {
		var taskReq TaskRequest

		// Decode the request body
		if err := c.Bind(&taskReq); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Error decoding JSON: " + err.Error()})
		}

		// Validate database connection
		db, err := database.NewDatabase(taskReq.DBConfig.Type)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error creating database instance: " + err.Error()})
		}
		if err := db.ValidateConnection(taskReq.DBConfig); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Error validating database connection: " + err.Error()})
		}

		// Validate storage connections
		for _, storageConfig := range taskReq.StorageConfigs {
			store, err := storage.NewStorage(storageConfig)
			if err != nil {
				return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error creating storage instance: " + err.Error()})
			}
			if err := store.ValidateConnection(storageConfig); err != nil {
				return c.JSON(http.StatusBadRequest, map[string]string{"error": "Error validating storage connection: " + err.Error()})
			}
		}

		// If all validations pass, create the record in the tasks collection
		collection, err := app.Dao().FindCollectionByNameOrId("tasks")
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error finding tasks collection: " + err.Error()})
		}

		record := models.NewRecord(collection)
		form := forms.NewRecordUpsert(app, record)

		form.LoadData(map[string]any{
			"name":           taskReq.Name,
			"dbConfig":       taskReq.DBConfig,
			"storageConfigs": taskReq.StorageConfigs,
			"cron":           taskReq.Cron,
			"status":         "Active",
			"nextBackup":     backup.CalculateNextBackup(taskReq.Cron),
			"user":           taskReq.User,
		})

		if err := form.Submit(); err != nil {
			return err
		}
		return c.JSON(http.StatusCreated, map[string]string{
			"message": "Task created successfully",
			"id":      record.Id,
		})
	}
}
