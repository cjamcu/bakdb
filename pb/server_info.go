package pb

import (
	"log"
	"os"
	"strings"

	"github.com/fatih/color"
	"github.com/pocketbase/pocketbase/core"
)

func SetupServerInfoMessage(app core.App) {
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		schema := "http"
		addr := e.Server.Addr

		if strings.Contains(addr, ":443") {
			schema = "https"
			args := os.Args
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
}
