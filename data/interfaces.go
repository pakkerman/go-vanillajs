package data

import "github.com/pakkerman/models"

type MovieStroage interface {
	GetTopMovies() ([]models.Movie, error)
	GetRandomMovies() ([]models.Movie, error)
	// GetMovieById() (models.Movie, error)
	// SearchMoviesByName(name string) ([]models.Movie, error)
	// GetAllGenres() ([]models.Genre, error)
}
