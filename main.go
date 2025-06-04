package main

import (
	"log"
	"net/http"

	logger "github.com/pakkerman/looger"
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
	logInstance := initializeLogger()

	http.Handle("/", http.FileServer(http.Dir("public")))

	const addr = ":3000"
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatalf("Server failed: %v", err)
		logInstance.Error("Server failed", err)
	}
}
