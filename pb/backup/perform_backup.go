package backup

import (
	"bakdb/pb/database"
	bmodels "bakdb/pb/models"
	"bakdb/pb/storage"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/robfig/cron/v3"
)

// PerformBackup performs the backup for a specific task
func PerformBackup(task bmodels.Task, app *pocketbase.PocketBase) error {
	// Insert backup start record
	startTime := time.Now()
	historyID, err := insertBackupHistory(task.Id, "In Progress", startTime, app)
	if err != nil {
		log.Printf("Error inserting backup start record: %v", err)
	}

	db, err := database.NewDatabase(task.DBConfig.Type)
	if err != nil {
		updateBackupHistory(historyID, "Failed", startTime, fmt.Sprintf("Error creating database instance: %v", err), 0, "", app)
		return fmt.Errorf("error creating database instance: %v", err)
	}

	log.Printf("Starting backup for task %s", task.Name)
	backupPath, err := db.Backup(task.Id, task.DBConfig)
	if err != nil {
		updateBackupHistory(historyID, "Failed", startTime, fmt.Sprintf("Error performing backup: %v", err), 0, "", app)
		return fmt.Errorf("error performing backup for task %s: %v", task.Name, err)
	}

	backupFileName := filepath.Base(backupPath)

	file, err := os.Open(backupPath)
	size := getFileSize(file)
	if err != nil {
		updateBackupHistory(historyID, "Failed", startTime, fmt.Sprintf("Error opening backup file: %v", err), size, "", app)
		return fmt.Errorf("error opening backup file: %v", err)
	}
	defer file.Close()

	for i, config := range task.StorageConfigs {
		store, err := storage.NewStorage(config)
		if err != nil {
			log.Printf("Error creating storage instance %d: %v", i, err)
			continue
		}

		err = store.Upload(backupFileName, file)
		if err != nil {
			log.Printf("Error uploading backup to storage %d: %v", i, err)
			continue
		}
		log.Printf("Backup successfully uploaded to storage %d", i)
	}

	if err := os.Remove(backupPath); err != nil {
		log.Printf("Error removing local backup file: %v", err)
	}

	log.Printf("filename %v", backupFileName)
	// Update backup completion record
	updateBackupHistory(historyID, "Completed", startTime, "", size, backupFileName, app)

	// Update lastBackup and nextBackup in the task
	err = updateTaskBackupInfo(task.Id, app)
	if err != nil {
		log.Printf("Error updating task backup information: %v", err)
	}

	log.Printf("Backup completed and stored successfully for task %s", task.Name)

	return nil
}

func getFileSize(file *os.File) int64 {
	stat, err := file.Stat()
	if err != nil {
		log.Printf("Error getting file size: %v", err)
		return 0
	}
	return stat.Size()
}

func insertBackupHistory(taskID string, status string, startTime time.Time, app *pocketbase.PocketBase) (string, error) {
	collection, err := app.Dao().FindCollectionByNameOrId("backups")
	if err != nil {
		return "", fmt.Errorf("error finding backups collection: %v", err)
	}

	record := models.NewRecord(collection)
	form := forms.NewRecordUpsert(app, record)
	form.LoadData(map[string]any{
		"task":      taskID,
		"status":    status,
		"startTime": startTime,
	})

	if err := form.Submit(); err != nil {
		return "", fmt.Errorf("error inserting backup history: %v", err)
	}

	return record.Id, nil
}

func updateBackupHistory(backupID string, status string, startTime time.Time, errorMessage string, size int64, backupFileName string, app *pocketbase.PocketBase) {
	endTime := time.Now()
	duration := endTime.Sub(startTime)

	record, err := app.Dao().FindRecordById("backups", backupID)
	if err != nil {
		log.Printf("Error finding backups record: %v", err)
		return
	}

	form := forms.NewRecordUpsert(app, record)
	form.LoadData(map[string]any{
		"status":   status,
		"endTime":  endTime,
		"duration": duration.Seconds(),
		"error":    errorMessage,
		"size":     size,
		"filename": backupFileName,
	})

	if err := form.Submit(); err != nil {
		log.Printf("Error updating backups record: %v", err)
	}
}

// Add this new function at the end of the file
func updateTaskBackupInfo(taskID string, app *pocketbase.PocketBase) error {
	record, err := app.Dao().FindRecordById("tasks", taskID)
	if err != nil {
		return fmt.Errorf("error finding task record: %v", err)
	}

	now := time.Now()
	cronExpression := record.GetString("cron")
	nextBackup := CalculateNextBackup(cronExpression)

	form := forms.NewRecordUpsert(app, record)
	form.LoadData(map[string]any{
		"lastBackup": now,
		"nextBackup": nextBackup,
	})

	if err := form.Submit(); err != nil {
		return fmt.Errorf("error updating task backup information: %v", err)
	}

	return nil
}

func CalculateNextBackup(cronExpression string) time.Time {
	now := time.Now()

	if cronExpression == "" {
		log.Printf("Cron expression is empty, using default (daily)")
		return now.AddDate(0, 0, 1)
	}

	schedule, err := cron.ParseStandard(cronExpression)
	if err != nil {
		log.Printf("Error parsing cron expression: %v", err)
		return now.AddDate(0, 0, 1)
	}

	return schedule.Next(now)
}
