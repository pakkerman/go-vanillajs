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
  api: API,
  Router,

  search: (event) => {
    event.preventDefault();
    const q = document.querySelector("input[type=search]").value;
    app.Router.go("/movies?q=" + q);
  },

  searchOrderChange: (order) => {
    const urlParams = new URLSearchParams(location.search);
    const q = urlParams.get("q");
    const genre = urlParams.get("genre") ?? "";
    app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
  },

  searchFilterChange: (genre) => {
    const urlParams = new URLSearchParams(location.search);
    const q = urlParams.get("q");
    const order = urlParams.get("order") ?? "";
    app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
  },

  showError: (message = "There was an error.", goToHome = true) => {
    document.getElementById("alert-modal").showModal();
    document.querySelector("#alert-modal p").textContent = message;
    if (goToHome) app.Router.go("/");
  },

  closeError: () => {
    document.getElementById("alert-modal").close();
  },
};
