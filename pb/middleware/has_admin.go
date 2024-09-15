package middleware

import (
	"net/http"
	"strings"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/core"
	"github.com/spf13/cast"
)

const hasAdminsCacheKey = "@hasAdmins"

func updateHasAdminsCache(app core.App) error {
	total, err := app.Dao().TotalAdmins()
	if err != nil {
		return err
	}

	app.Store().Set(hasAdminsCacheKey, total > 0)

	return nil
}

func InstallerRedirect(app core.App) echo.MiddlewareFunc {
	// keep hasAdminsCacheKey value up-to-date
	app.OnAdminAfterCreateRequest().Add(func(data *core.AdminCreateEvent) error {
		return updateHasAdminsCache(app)
	})

	app.OnAdminAfterDeleteRequest().Add(func(data *core.AdminDeleteEvent) error {
		return updateHasAdminsCache(app)
	})

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			path := c.Request().URL.Path

			// No redirect if it's a resource in /assets or /_/
			if strings.HasPrefix(path, "/assets/") || strings.HasPrefix(path, "/_/") {
				return next(c)
			}

			hasAdmins := cast.ToBool(app.Store().Get(hasAdminsCacheKey))

			if path == "/installer" {
				if hasAdmins {
					// Redirect to home if trying to access /installer and already has admin
					return c.Redirect(http.StatusTemporaryRedirect, "/")
				}
				return next(c)
			}

			if !hasAdmins {
				// Update the cache to ensure the admin wasn't created by another process
				if err := updateHasAdminsCache(app); err != nil {
					return err
				}
				return c.Redirect(http.StatusTemporaryRedirect, "/installer")

			}

			return next(c)
		}
	}
}
