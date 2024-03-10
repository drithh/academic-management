package database

import (
	"context"
	"crypto/tls"
	"fmt"
	"os"

	"github.com/go-pg/pg/v10"
)

type DBLogger struct{}

func (d DBLogger) BeforeQuery(ctx context.Context, q *pg.QueryEvent) (context.Context, error) {
	return ctx, nil
}

func (d DBLogger) AfterQuery(ctx context.Context, q *pg.QueryEvent) error {
	query, err := q.FormattedQuery()
	if err != nil {
		return err
	}
	fmt.Println(string(query))
	return nil
}

func New() *pg.DB {

	// Create a new TLS config with InsecureSkipVerify enabled
	var tlsConfig *tls.Config

	// Get the value of the SSL_MODE environment variable
	sslMode := os.Getenv("SSL_MODE")
	fmt.Println("sslMode: ", sslMode)
	// Check if SSL_MODE is set to "false", then TLS should be disabled
	if sslMode == "disable" {
		tlsConfig = nil
	} else {
		// Enable TLS with InsecureSkipVerify
		tlsConfig = &tls.Config{
			InsecureSkipVerify: true,
		}
	}

	// Connect to PostgreSQL with the TLS config
	db := pg.Connect(&pg.Options{
		Addr:      os.Getenv("POSTGRES_HOST") + ":" + os.Getenv("POSTGRES_PORT"),
		User:      os.Getenv("POSTGRES_USER"),
		Password:  os.Getenv("POSTGRES_PASSWORD"),
		Database:  os.Getenv("POSTGRES_DB"),
		TLSConfig: tlsConfig,
	})

	return db
}

func Close(db *pg.DB) {
	db.Close()
}
