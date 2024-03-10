package database

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/go-pg/pg/v10"
)

func Seed(db *pg.DB) {

	// Read the SQL file
	content, err := os.ReadFile("database/seeds.sql")
	if err != nil {
		log.Fatal("Error reading SQL file:", err)
	}

	// Split the file content into individual SQL statements
	statements := strings.Split(string(content), ";")

	// Execute each SQL statement
	for _, statement := range statements {
		statement = strings.TrimSpace(statement)
		if statement == "" {
			continue
		}

		_, err := db.Exec(statement)
		if err != nil {
			log.Fatal("Error executing SQL statement:", err)
		}
	}

	fmt.Println("SQL file executed successfully")
}
