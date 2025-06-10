import { API } from "./services/API.js";
import { Router } from "./services/Router.js";

import "./components/HomePage.js";
import "./components/MovieDetailsPage.js";
import "./components/AnimatedLoading.js";
import "./components/YouTubeEmbed.js";

window.addEventListener("DOMContentLoaded", (event) => {
  app.Router.init();
});

window.app = {
  Router,

  search: (event) => {
    event.preventDefault();
    const q = document.querySelector("input[type=search]").value;
    //TODO: call to api
  },

  api: API,

  showError: (message = "There was an error.", goToHome = true) => {
    document.getElementById("alert-modal").showModal();
    document.querySelector("#alert-modal p").textContent = message;
    if (goToHome) app.Router.go("/");
  },

  closeError: () => {
    document.getElementById("alert-modal").close();
  },
};
