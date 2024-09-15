package models

import (
	"bakdb/pb/database"
	"bakdb/pb/storage"
)

type Task struct {
	Id             string
	Name           string
	Cron           string
	DBConfig       database.DBConfig
	StorageConfigs []storage.StorageConfig
	Status         string
	RetentionDays  int // Number of days to keep backups
}
