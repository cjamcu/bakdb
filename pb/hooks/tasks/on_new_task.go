package tasks

import (
	backup "bakdb/pb/backup"
	"bakdb/pb/database"
	bmodels "bakdb/pb/models"
	"bakdb/pb/storage"
	"fmt"
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/tools/cron"
)

func OnNewTask(e *core.ModelEvent, scheduler *cron.Cron, app *pocketbase.PocketBase) error {
	if record, ok := e.Model.(*models.Record); ok {
		cronText, ok := record.Get("cron").(string)
		if !ok {
			return fmt.Errorf("invalid cron format")
		}
		name, ok := record.Get("name").(string)
		if !ok {
			return fmt.Errorf("invalid name format")
		}

		id, ok := record.Get("id").(string)
		if !ok {
			return fmt.Errorf("invalid id format")
		}

		var dbConfig database.DBConfig
		if err := record.UnmarshalJSONField("dbConfig", &dbConfig); err != nil {
			return fmt.Errorf("error parsing database configuration: %v", err)
		}

		var storageConfigs []storage.StorageConfig
		if err := record.UnmarshalJSONField("storageConfigs", &storageConfigs); err != nil {
			return fmt.Errorf("error parsing storage configuration: %v", err)
		}

		task := bmodels.Task{
			Id:             id,
			Name:           name,
			Cron:           cronText,
			DBConfig:       dbConfig,
			StorageConfigs: storageConfigs,
		}

		scheduler.Add(task.Id, cronText, func() {
			if err := backup.PerformBackup(task, app); err != nil {
				log.Printf("Error performing scheduled backup: %v", err)
			}
		})

		scheduler.Start()

		// Print Task schedule
		fmt.Printf("Task scheduled: %s\n", task.Id)

		return nil
	}

	return nil
}
