package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"github.com/joho/godotenv"
)

// Connect to database
func Connect() *gorm.DB {
	err := godotenv.Load("../.env")
	if err != nil {
		panic(err)
	}

	db, err := gorm.Open(postgres.Open(

	), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	return db
}


