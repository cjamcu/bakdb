package tasks

import (
	"fmt"
	"log"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/cron"
)

func OnDeleteTask(e *core.RecordDeleteEvent, scheduler *cron.Cron) error {
	task := e.Record
	id, ok := task.Get("id").(string)
	if !ok {
		return fmt.Errorf("invalid id format")
	}
	scheduler.Remove(id)
	log.Printf("Deleted task and removed from scheduler: %s", id)
	return nil
}
