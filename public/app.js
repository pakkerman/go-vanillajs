import { API } from "./services/API.js";
import { Router } from "./services/Router.js";
import Store from "./services/Store.js";

import "./components/HomePage.js";
import "./components/MovieDetailsPage.js";
import "./components/AnimatedLoading.js";
import "./components/YouTubeEmbed.js";
import "./components/AccountPage.js";

window.addEventListener("DOMContentLoaded", () => {
  app.Router.init();
});

window.app = {
  api: API,
  Store,
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

  showError: (message = "There was an error.", goToHome = false) => {
    document.getElementById("alert-modal").showModal();
    document.querySelector("#alert-modal p").textContent = message;
    if (goToHome) app.Router.go("/");
  },

  closeError: () => {
    document.getElementById("alert-modal").close();
  },

  register: async (event) => {
    event.preventDefault();

    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const passwordConfirmation = document.getElementById(
      "register-password-confirmation",
    ).value;

    const errors = [];
    if (name.length < 4) errors.push("Name must be 4 characters or longer.");
    if (password.length < 6)
      errors.push("Enter a password with at least 7 characters.");
    if (email.length < 4) errors.push("Enter your complete email.");
    if (password !== passwordConfirmation)
      errors.push("Password and confirmation does not match.");

    if (errors.length) {
      app.showError(errors.join("\n"));
      return;
    }

    const response = await API.register(name, email, password);
    if (response.success) {
      app.Store.jwt = response.jwt;
      app.Router.go("/account/");
    } else {
      app.showError(response.message);
    }
  },

  login: async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const errors = [];
    if (email.length < 4) errors.push("Enter your complete email.");
    if (password.length < 6)
      errors.push("Enter a password with at least 7 characters.");

    if (errors.length) {
      app.showError(errors.join("\n"));
      return;
    }

    const response = await API.login(email, password);
    if (response.success) {
      app.Store.jwt = response.jwt;
      app.Router.go("/account/");
    } else {
      app.showError(response.message);
    }
  },

  logout: () => {
    Store.jwt = null;
    app.Router.go("/");
  },

  saveToCollection: async (movie_id, collection) => {
    if (app.Store.loggedIn) {
      try {
        const response = await API.saveToCollection(movie_id, collection);
        if (response.success) {
          switch (collection) {
            case "favorite":
              app.Router.go("/account/favorites");
              break;
            case "watchlist":
              app.Router.go("/account/watchlist");
          }
        } else {
          app.showError("We couldn't save the movie.");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      app.Router.go("/account/");
    }
  },
};
