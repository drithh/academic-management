package main

import (
	"fmt"
	"net/http"
	"os"

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

	if os.Args[1] == "seed" {
		database.Seed(DB)
		return
	}

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

	port := os.Getenv("PORT")

	if port == "" {
		port = "3000"
	}

	router.Handle("/", playground.Handler("Academic Management System", "/query"))
	router.Handle("/query", srv)
	fmt.Println("Server is running on port " + port)

	err := http.ListenAndServe(":"+port, router)
	if err != nil {
		panic(err)
	}
}
