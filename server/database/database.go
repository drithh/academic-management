package database

import (
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// Connect to database
func Connect() *gorm.DB {
	user := os.Getenv("POSTGRE_USER")
	password := os.Getenv("POSTGRE_PASSWORD")
	name := os.Getenv("POSTGRE_DB")

	
	
	db, err := gorm.Open(postgres.Open(
		"host=localhost user="+user+" password="+password+" dbname="+name+" port=5432 sslmode=disable",
	), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		panic(err)
	}
	return db
}


