package backup

import (
	"fmt"
	"log"
	"time"

	"github.com/pocketbase/pocketbase"
)

func DeleteOldBackups(app *pocketbase.PocketBase) error {
	log.Printf("Deleting old backups")
	backups, err := app.Dao().FindRecordsByFilter(
		"backups",
		"filename != ''",
		"-created",
		0,
		0,
	)
	if err != nil {
		return fmt.Errorf("error finding backups: %v", err)
	}

	if errs := app.Dao().ExpandRecords(backups, []string{"task"}, nil); len(errs) > 0 {
		return fmt.Errorf("failed to expand: %v", errs)
	}

	for _, backup := range backups {
		task := backup.ExpandedOne("task")
		retentionDays := task.GetInt("retentionDays")
		createdAt := backup.GetDateTime("created")
		if retentionDays > 0 && time.Since(createdAt.Time()) > time.Duration(retentionDays)*24*time.Hour {
			if err := app.Dao().DeleteRecord(backup); err != nil {
				log.Printf("Error deleting backup: %v", err)
				continue
			}

			log.Printf("Deleted backup: %s", backup.GetString("filename"))
		}
	}

	return nil
}
