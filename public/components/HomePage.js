import {API} from "../services/API.js"

export class HomePage extends HTMLElement {
  // <home-page>

  async render(){

    const topMovies= awiat API.getTopMovies()

  }

  connectedCallback() {
    const template = document.getElementById("template-home");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.render()
  }
}

customElements.define("home-page", HomePage);
