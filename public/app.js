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
};
