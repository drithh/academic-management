package database

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

type DBLogger struct{}

// func (d DBLogger) BeforeQuery(ctx context.Context, q *pg.QueryEvent) (context.Context, error) {
// 	return ctx, nil
// }

// func (d DBLogger) AfterQuery(ctx context.Context, q *pg.QueryEvent) error {
// 	query, err := q.FormattedQuery()
// 	if err != nil {
// 		return err
// 	}
// 	fmt.Println(string(query))
// 	return nil
// }

func New() (*sql.DB, error) {
	db, err := sql.Open("postgres", fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		os.Getenv("POSTGRES_HOST"), os.Getenv("POSTGRES_PORT"), os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"), os.Getenv("POSTGRES_DB"), os.Getenv("SSL_MODE")))
	if err != nil {
		return nil, err
	}
	return db, nil
}

func Close(db *sql.DB) {
	db.Close()
}
