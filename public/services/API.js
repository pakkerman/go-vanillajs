export const API = {
  baseURL: "/api/",
  getTopMovies: async () => {
    return await API.fetch("movies/top/");
  },
  getRandomMovies: async () => {
    return await API.fetch("movies/random/");
  },
  getGenres: async () => {
    return await API.fetch("genres/");
  },
  getMovieById: async (id) => {
    return await API.fetch(`movies/${id}`);
  },
  searchMovies: async (q, order, genre) => {
    return await API.fetch(`movies/search`, { q, order, genre });
  },

  register: async (name, email, password) => {
    return await API.send("account/register/", { name, email, password });
  },

  login: async (email, password) => {
    return await API.send("account/authenticate/", { email, password });
  },

  getFavorites: async () => {
    return await API.fetch("account/favorites/");
  },

  getWatchlist: async () => {
    return await API.fetch("account/watchlist/");
  },

  saveToCollection: async (movieId, collection) => {},

  send: async (service, data) => {
    const url = API.baseURL + service;
    console.log(url);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: app.Store.jwt ? `Bearer ${app.Store.jwt}` : null,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (e) {
      app.showError(e);
    }
  },

  fetch: async (service, args) => {
    const queryString = args ? new URLSearchParams(args).toString() : "";
    const url = API.baseURL + service + "?" + queryString;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: app.Store.jwt ? `Bearer ${app.Store.jwt}` : null,
        },
      });
      const result = await response.json();
      return result;
    } catch (e) {
      console.error(e);
    }
  },
};
