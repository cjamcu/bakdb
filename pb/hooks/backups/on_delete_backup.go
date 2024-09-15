package backups

import (
	"bakdb/pb/storage"
	"fmt"
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

func OnDeleteBackupModel(e *core.ModelEvent, app *pocketbase.PocketBase) error {
	log.Printf("Running on delete backup model hook")

	if record, ok := e.Model.(*models.Record); ok {
		return OnDeleteBackup(record, app)
	}

	return nil
}

func OnDeleteBackup(record *models.Record, app *pocketbase.PocketBase) error {

	backup := record
	taskId := backup.GetString("task")
	task, err := app.Dao().FindRecordById("tasks", taskId)
	if err != nil {
		return fmt.Errorf("error finding task: %v", err)
	}

	var storageConfigs []storage.StorageConfig
	if err := task.UnmarshalJSONField("storageConfigs", &storageConfigs); err != nil {
		return fmt.Errorf("error parsing storage configuration: %v", err)
	}

	for _, config := range storageConfigs {
		store, err := storage.NewStorage(config)
		if err != nil {
			return fmt.Errorf("error creating storage: %v", err)
		}
		if err := store.Delete(backup.GetString("filename")); err != nil {
			return fmt.Errorf("error deleting backup: %v", err)
		}

		log.Printf("Backup file deleted: %s", backup.GetString("filename"))
	}

	return nil

}
