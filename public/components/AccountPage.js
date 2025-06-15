import store from "../services/Store.js";

export class AccountPage extends HTMLElement {
  connectedCallback() {
    const template = document.getElementById("template-account");
    const content = template.content.cloneNode(true);
    content.querySelector("h2 span").textContent = store.email;
    this.appendChild(content);
  }
}

customElements.define("account-page", AccountPage);
