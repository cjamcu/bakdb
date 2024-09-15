package models

import "time"

type Backup struct {
	Task         string        `json:"task"`
	Status       string        `json:"status"`
	StartTime    time.Time     `json:"startTime"`
	EndTime      time.Time     `json:"endTime,omitempty"`
	Duration     time.Duration `json:"duration,omitempty"`
	ErrorMessage string        `json:"errorMessage,omitempty"`
	RetentionDays int `json:"retentionDays"`
}
