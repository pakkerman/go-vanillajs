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
	logInstance.Error("hello from the logoger", nil)
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
	movieRepo, err := data.NewMovieRepository(db, logInstance)
	if err != nil {
		log.Fatalf("Failed to initialize movie repository: %v", err)
	}

	// Init Movie handlers
	movieHandler := handlers.NewMovieHandler(movieRepo, logInstance)

	// Set up routers, also the ordering matters
	http.HandleFunc("/api/movies/top/", movieHandler.GetTopMovies)
	http.HandleFunc("/api/movies/random/", movieHandler.GetRandomMovies)
	http.HandleFunc("/api/movies/search", movieHandler.SearchMovies)
	http.HandleFunc("/api/movies/", movieHandler.GetMovie) // /api/movies/:id
	http.HandleFunc("/api/genres/", movieHandler.GetGenres)

	catchAllClientRoutesHandler := func(w http.ResponseWriter, r *http.Request) {
		// 1) HTTP Redirect 301 / 302, won't work because if you go to "/movies/14" it will send you back to "/"
		// 2) Deliver the index.html
		http.ServeFile(w, r, "./public/index.html")
	}

	http.HandleFunc("/movies", catchAllClientRoutesHandler)
	http.HandleFunc("/movies/", catchAllClientRoutesHandler)
	http.HandleFunc("/account/", catchAllClientRoutesHandler)

	// Handler for static files (frontend)
	http.Handle("/", http.FileServer(http.Dir("public")))
	fmt.Println("Served files")

	const addr = ":3000"
	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatalf("Server failed: %v", err)
		logInstance.Error("Server failed", err)
	}
}
