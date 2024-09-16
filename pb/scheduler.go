package pb

import (
	"bakdb/pb/backup"
	"bakdb/pb/database"
	bmodels "bakdb/pb/models"
	"bakdb/pb/storage"
	"fmt"
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/cron"
)

func SetupScheduler(app *pocketbase.PocketBase, scheduler *cron.Cron) {
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// Load all tasks and start the scheduler
		tasks, err := app.Dao().FindRecordsByFilter(
			"tasks",
			"cron != '' && status = 'Active'",
			"-status",
			0,
			0,
		)
		if err != nil {
			log.Fatal(err)
		}
		for _, task := range tasks {
			var dbConfig database.DBConfig
			if err := task.UnmarshalJSONField("dbConfig", &dbConfig); err != nil {
				return fmt.Errorf("error parsing database configuration: %v", err)
			}

			var storageConfigs []storage.StorageConfig
			if err := task.UnmarshalJSONField("storageConfigs", &storageConfigs); err != nil {
				return fmt.Errorf("error parsing storage configuration: %v", err)
			}

			task := bmodels.Task{
				Id:             task.Get("id").(string),
				Name:           task.Get("name").(string),
				Cron:           task.Get("cron").(string),
				DBConfig:       dbConfig,
				StorageConfigs: storageConfigs,
			}

			scheduler.Add(task.Id, task.Cron, func() {
				if err := backup.PerformBackup(task, app); err != nil {
					log.Printf("Error performing scheduled backup: %v", err)
				}
			})

			scheduler.Start()

		}
		scheduler.Add("delete_old_backups", "0 0 * * *", func() {
			if err := backup.DeleteOldBackups(app); err != nil {
				log.Printf("Error deleting old backups: %v", err)
			}
		})

		scheduler.Start()

		return nil
	})

}
