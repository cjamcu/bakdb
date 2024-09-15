package main

import (
	"bakdb/pb"
	"bakdb/pb/hooks"
	_ "bakdb/pb/migrations"
	"log"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/pocketbase/pocketbase/tools/cron"
)

func main() {
	app := pocketbase.New()

	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: isGoRun,
	})

	scheduler := cron.New()
	hooks.SetupHooks(app, scheduler)
	pb.SetupRoutes(app)
	pb.SetupScheduler(app, scheduler)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
