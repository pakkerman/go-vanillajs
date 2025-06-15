import store from "../services/Store.js";

export class DeletePage extends HTMLElement {
  connectedCallback() {
    const template = document.getElementById("template-delete");
    const content = template.content.cloneNode(true);
    content.querySelector("#email").textContent = `Deleting ${store.email}`;
    this.appendChild(content);
  }
}

customElements.define("delete-page", DeletePage);
