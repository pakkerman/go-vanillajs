package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/pakkerman/data"
	"github.com/pakkerman/handlers"
	"github.com/pakkerman/logger"
)

func initializeLogger() *logger.Logger {
	logInstance, err := logger.NewLogger("movie.log")
	if err != nil {
		log.Fatalf("Failed to initialize logger %v", err)
	}

	defer logInstance.Close()
	return logInstance
}

func main() {
	// Init Logger
	logInstance := initializeLogger()

	// Environment Variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("No env file found")
	}

	// Connect to database
	dbConnStr := os.Getenv("DATABASE_URL")
	if dbConnStr == "" {
		log.Fatal("DATABASE_URL not found")
	}

	db, err := sql.Open("postgres", dbConnStr)
	if err != nil {
		log.Fatalf("Failed to connect to Database: %v", err)
	}

	defer db.Close()

	// Init Data Repository for movies
	movieReop, err := data.NewMovieRepository(db, logInstance)
	if err != nil {
		log.Fatalf("Failed to initialize movie repository: %v", err)
	}

	// Init Movie handlers
	movieHandler := handlers.MovieHandler{}
	movieHandler.Storage = movieReop
	movieHandler.Logger = logInstance

	http.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)
	http.HandleFunc("/api/movies/random", movieHandler.GetTopMovies)

	// Handler for static files (frontend)
	http.Handle("/", http.FileServer(http.Dir("public")))
	fmt.Println("Server files")

	const addr = ":3000"
	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatalf("Server failed: %v", err)
		logInstance.Error("Server failed", err)
	}
}
