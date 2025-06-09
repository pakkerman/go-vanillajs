export class MovieItemComponent extends HTMLElement {
  constructor(movie) {
    super(); // override the default constructor, so super needs to be called again
    this.movie = movie;
  }

  connectedCallback() {
    this.innerHTML = `
      <a href="#">
        <article>
          <img src="${this.movie.poster_url}" alt="${this.movie.title} Poster">
          <p>${this.movie.title} (${this.movie.release_year})</p>
        </article>
      </a>
    `;
  }
}

customElements.define("movie-item", MovieItemComponent);
