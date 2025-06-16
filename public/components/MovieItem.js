import store from "../services/Store.js";

export class MovieItem extends HTMLElement {
  constructor(movie) {
    super(); // override the default constructor, so super needs to be called again
    this.movie = movie;
    this.favorited = store.collection.Favorites.some(
      (item) => item.id === this.movie.id,
    );
    this.watchlisted = store.collection.Watchlist.some(
      (item) => item.id === this.movie.id,
    );
    console.log(this.favorited, this.watrchlisted);
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
      <div class="icon ${this.favorited ? "icon-heart-full" : "icon-heart-empty"}"  />
    </div>
    `;
  }
}

customElements.define("movie-item", MovieItem);
