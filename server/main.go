package main

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/drithh/multi-tier-architecture/database"
	"github.com/drithh/multi-tier-architecture/graph"
	"github.com/go-chi/chi"
	"github.com/rs/cors"
)

func main() {
	DB := database.New()

	defer DB.Close()

	DB.AddQueryHook(database.DBLogger{})
	


	router := chi.NewRouter()

	// Add CORS middleware around every request
	// See https://github.com/rs/cors for full option listing
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		Debug:            true,
	}).Handler)
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		Repository: &database.Repository{DB: DB},
	}}))



	router.Handle("/", playground.Handler("Starwars", "/query"))
	router.Handle("/query", srv)

	err := http.ListenAndServe(":8080", router)
	if err != nil {
		panic(err)
	}
}
