package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/pakkerman/data"
	"github.com/pakkerman/logger"
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
	movies, err := h.Storage.GetTopMovies()
	if err != nil {
		http.Error(w, "Internal Error Getting Movies", 500)
		h.Logger.Error("GetTopMovies Error: ", err)
	}
	h.writeJsonResponse(w, movies)
}

func (h *MovieHandler) GetRandomMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := h.Storage.GetRandomMovies()
	if err != nil {
		http.Error(w, "Internal Error", 500)
		h.Logger.Error("GetRandomMovies Error: ", err)
	}

	h.writeJsonResponse(w, movies)
}
