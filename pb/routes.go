package pb

import (
	"bakdb/pb/api"
	"bakdb/pb/middleware"
	"bakdb/ui"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func SetupRoutes(app *pocketbase.PocketBase) {
	// Serves static files from the provided public dir (if exists)
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/*", apis.StaticDirectoryHandler(ui.DistDirFS, true), middleware.InstallerRedirect(app))

		e.Router.POST("/api/tasks", api.CreateTaskHandler(app))

		e.Router.GET("/api/backups/:id/download", api.DownloadBackupHandler(app))

		return nil
	})

}
