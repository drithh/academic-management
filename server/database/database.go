package database

import (
	"os"

	"github.com/go-pg/pg/v10"
)

// func (d DBLogger) AfterQuery(ctx context.Context, q *pg.QueryEvent) (context.Context, error) {
// 	query, err := q.FormattedQuery()
// 	if err != nil {
// 		return ctx, err
// 	}
// 	fmt.Println(string(query))
// 	return ctx, nil
// }
func New () *pg.DB {
	db := pg.Connect(&pg.Options{
		Addr:     "postgres:5432",
		User:     os.Getenv("POSTGRES_USER"),
		Password: os.Getenv("POSTGRES_PASSWORD"),
		Database: os.Getenv("POSTGRES_DB"),
	})
	return db
}

func Close (db *pg.DB) {
	db.Close()
}


