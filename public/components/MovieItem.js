import store from "../services/Store.js";

export class MovieItem extends HTMLElement {
  constructor(movie) {
    super(); // override the default constructor, so super needs to be called again
    this.movie = movie;
    this.isFavorited = store.collection.favorites
      ? store.collection.favorites.some((id) => id === this.movie.id)
      : false;
    this.isWatchlisted = store.collection.watchlist
      ? store.collection.watchlist.some((id) => id === this.movie.id)
      : false;
  }

  connectedCallback() {
    const url = "/movies/" + this.movie.id;
    this.innerHTML = `
    <div style="position:relative">
      <a 
        href="#" 
        onclick="event.preventDefault(); app.Router.go('${url}')" 
      >
        <article>
          <img src="${this.movie.poster_url}" alt="${this.movie.title} Poster">

          <p>${this.movie.title} (${this.movie.release_year})</p>
        </article>
      </a>
      <div class="icon-wrapper">
        <div class="icon ${this.isFavorited ? "icon-heart-full" : "hidden"}"></div>
        <div class="icon ${this.isWatchlisted ? "icon-eye-full" : "hidden"}"></div>
      </div>
    </div>
    `;
  }
}

customElements.define("movie-item", MovieItem);
