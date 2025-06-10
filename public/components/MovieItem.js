export class MovieItem extends HTMLElement {
  constructor(movie) {
    super(); // override the default constructor, so super needs to be called again
    this.movie = movie;
  }

  connectedCallback() {
    const url = "/movies/" + this.movie.id;
    this.innerHTML = `
      <a 
        href="#" 
        onclick="event.preventDefault(); app.Router.go('${url}')" >
        <article>
          <img src="${this.movie.poster_url}" alt="${this.movie.title} Poster">
          <p>${this.movie.title} (${this.movie.release_year})</p>
        </article>
      </a>
    `;
  }
}

customElements.define("movie-item", MovieItem);
