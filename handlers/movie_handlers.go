package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/pakkerman/data"
	"github.com/pakkerman/logger"
	"github.com/pakkerman/models"
)

type MovieHandler struct {
	Storage data.MovieStroage
	Logger  *logger.Logger
}

func (h *MovieHandler) writeJsonResponse(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(data); err != nil {
		h.Logger.Error("JSON encoding error", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

func (h *MovieHandler) GetTopMovies(w http.ResponseWriter, r *http.Request) {
	movies := []models.Movie{
		{
			ID:          1,
			TMDB_ID:     181,
			Title:       "The Hacker",
			ReleaseYear: 2022,
			Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
			Keywords:    []string{},
			Casting:     []models.Actor{{ID: 1, FirstName: "Max", LastName: "Huge"}},
		}, {
			ID:          2,
			TMDB_ID:     188,
			Title:       "Back to the Future",
			ReleaseYear: 1984,
			Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
			Keywords:    []string{},
			Casting:     []models.Actor{{ID: 1, FirstName: "Max", LastName: "Huge"}},
		},
	}

	h.writeJsonResponse(w, movies)
}

func (h *MovieHandler) GetRandomMovies(w http.ResponseWriter, r *http.Request) {
	movies := []models.Movie{
		{
			ID:          1,
			TMDB_ID:     181,
			Title:       "The Hacker",
			ReleaseYear: 2022,
			Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
			Keywords:    []string{},
			Casting:     []models.Actor{{ID: 1, FirstName: "Max", LastName: "Huge"}},
		}, {
			ID:          2,
			TMDB_ID:     188,
			Title:       "Back to the Future Random",
			ReleaseYear: 1984,
			Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
			Keywords:    []string{},
			Casting:     []models.Actor{{ID: 1, FirstName: "Max", LastName: "Huge"}},
		},
	}

	h.writeJsonResponse(w, movies)
}
