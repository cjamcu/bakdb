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
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/tools/cron"
)

func OnUpdateTask(e *core.RecordUpdateEvent, scheduler *cron.Cron, app *pocketbase.PocketBase) error {
	record := e.Record
	oldRecord := record.OriginalCopy()

	if oldRecord.Get("status").(string) == "Active" && record.Get("status").(string) != "Active" {
		scheduler.Remove(record.Get("id").(string))
		fmt.Printf("Task unscheduled: %s\n", record.Get("id").(string))
		return nil
	}

	if oldRecord.Get("status").(string) != "Active" && record.Get("status").(string) == "Active" || oldRecord.Get("cron").(string) != record.Get("cron").(string) {
		// Update the nextBackup field in the database when the task is updated
		taskToUpdate, err := app.Dao().FindRecordById("tasks", record.Get("id").(string))
		if err != nil {
			return fmt.Errorf("error finding task: %v", err)
		}

		form := forms.NewRecordUpsert(app, taskToUpdate)

		form.LoadData(map[string]any{
			"nextBackup": backup.CalculateNextBackup(record.Get("cron").(string)),
		})

		if err := form.Submit(); err != nil {
			return fmt.Errorf("error updating task backup information: %v", err)
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
			Id:             record.Get("id").(string),
			Name:           record.Get("name").(string),
			Cron:           record.Get("cron").(string),
			DBConfig:       dbConfig,
			StorageConfigs: storageConfigs,
			Status:         record.Get("status").(string),
		}

		scheduler.Remove(task.Id)
		scheduler.Add(task.Id, task.Cron, func() {
			if err := backup.PerformBackup(task, app); err != nil {
				log.Printf("Error performing scheduled backup: %v", err)
			}
		})

		scheduler.Start()

		fmt.Printf("Task scheduled: %s\n", task.Id)

	}

	return nil
}
