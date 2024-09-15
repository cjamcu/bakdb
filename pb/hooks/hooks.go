package hooks

import (
	"bakdb/pb/hooks/backups"
	"bakdb/pb/hooks/tasks"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/cron"
)

func SetupHooks(app *pocketbase.PocketBase, scheduler *cron.Cron) {
	app.OnModelAfterCreate("tasks").Add(func(e *core.ModelEvent) error {
		return tasks.OnNewTask(e, scheduler, app)
	})
	app.OnRecordAfterDeleteRequest("tasks").Add(func(e *core.RecordDeleteEvent) error {
		return tasks.OnDeleteTask(e, scheduler)
	})

	app.OnRecordAfterUpdateRequest("tasks").Add(func(e *core.RecordUpdateEvent) error {
		return tasks.OnUpdateTask(e, scheduler, app)
	})

	app.OnModelBeforeDelete("backups").Add(func(e *core.ModelEvent) error {
		return backups.OnDeleteBackupModel(e, app)
	})

}
