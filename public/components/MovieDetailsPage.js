import { API } from "../services/API.js";

export class MovieDetailsPage extends HTMLElement {
  movie = null;
  id = null;

  async render() {
    try {
      this.movie = await API.getMovieById(14);
      console.log(this.movie);
    } catch {
      // TODO: alert the user
      alert("movie doesn't exist"); //TODO: replace this alert
      return;
    }

    const template = document.getElementById("template-movie-details");
    const content = template.content.cloneNode(true);

    this.appendChild(content);
    this.querySelector("h2").textContent = this.movie.title;
    this.querySelector("h3").textContent = this.movie.tagline;
  }

  connectedCallback() {
    this.id = 134;
    this.render();
  }
}

customElements.define("movie-details-page", MovieDetailsPage);
