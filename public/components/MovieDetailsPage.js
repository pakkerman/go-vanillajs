import { API } from "../services/API.js";
import store from "../services/Store.js";

export class MovieDetailsPage extends HTMLElement {
  movie = null;
  id = null;
  collection = store.collection;

  async render() {
    try {
      this.movie = await API.getMovieById(this.id);
    } catch {
      // TODO: alert the user
      return;
    }

    const template = document.getElementById("template-movie-details");
    const content = template.content.cloneNode(true);

    this.appendChild(content);
    this.querySelector("h2").textContent = this.movie.title;
    this.querySelector("h3").textContent = this.movie.tagline;
    this.querySelector("img").src = this.movie.poster_url;
    this.querySelector("#trailer").dataset.url = this.movie.trailer_url;
    this.querySelector("#overview").textContent = this.movie.overview;
    this.querySelector("#metadata").innerHTML = `
      <dt>Release Year</dt>
      <dd>${this.movie.release_year}</dd>
      <dt>Score</dt>
      <dd>${this.movie.score} / 10</dd>
      <dt>Popularity</dt>
      <dd>${this.movie.popularity}</dd>
    `;

    const ulGenres = this.querySelector("#genres");
    ulGenres.innerHTML = "";
    this.movie.genres.forEach((genre) => {
      const li = document.createElement("li");
      li.textContent = genre.name;
      ulGenres.appendChild(li);
    });

    const favoriteBtn = this.querySelector("#actions #btnFavorites");
    const watchlistBtn = this.querySelector("#actions #btnWatchlist");

    favoriteBtn.addEventListener("click", () => {
      app.saveToCollection(this.movie.id, "favorite");
    });
    watchlistBtn.addEventListener("click", () => {
      app.saveToCollection(this.movie.id, "watchlist");
    });

    this.collection.Favorites.forEach((item) => {
      if (item.id === this.movie.id) {
        favoriteBtn.disabled = true;
      }
    });

    this.collection.Watchlist.forEach((item) => {
      if (item.id === this.movie.id) {
        watchlistBtn.disabled = true;
      }
    });

    const ulCast = this.querySelector("#cast");
    ulCast.innerHTML = "";
    this.movie.casting.forEach((actor) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <img src="${actor.image_url ?? "/images/generic_actor.jpg"}" alt="Picture of ${actor.last_name}">
                <p>${actor.first_name} ${actor.last_name}</p>
            `;
      ulCast.appendChild(li);
    });
  }

  connectedCallback() {
    this.id = this.params[0];
    this.render();
  }
}

customElements.define("movie-details-page", MovieDetailsPage);
