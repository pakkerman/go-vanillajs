package models

type Movie struct {
	ID          int
	TMDB_ID     int
	Title       string
	Tagling     string
	ReleaseYear int
	Genres      []Genre
	Overview    *string
	Score       *float32
	Popularity  *float32
	Keywords    []string
	Language    *string
	PosterURL   *string
	Trailer     *string
	Casting     []Actor
}
