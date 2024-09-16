package main

import (
	"bakdb/pb"
	"bakdb/pb/hooks"
	_ "bakdb/pb/migrations"
	"log"
	"os"
	"strings"

	"github.com/fatih/color"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/pocketbase/pocketbase/tools/cron"
)

func main() {

	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	app := pocketbase.NewWithConfig(pocketbase.Config{
		HideStartBanner: true,
		DefaultDev:      isGoRun,
	})

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: isGoRun,
	})

	scheduler := cron.New()
	hooks.SetupHooks(app, scheduler)
	pb.SetupRoutes(app)
	pb.SetupScheduler(app, scheduler)

	// Setup output message
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		schema := "http"
		addr := e.Server.Addr

		if strings.Contains(addr, ":443") {
			schema = "https"
			args := os.Args
			// Get domain from args and set addr to addr
			if len(args) > 2 {
				addr = args[2]
			}
		}

		date := new(strings.Builder)
		log.New(date, "", log.LstdFlags).Print()

		bold := color.New(color.Bold).Add(color.FgGreen)
		bold.Printf(
			"%s Server started at %s\n",
			strings.TrimSpace(date.String()),
			color.CyanString("%s://%s", schema, addr),
		)

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}

}
