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
  fetch: async (service, args) => {
    const queryString = args ? new URLSearchParams(args).toString() : "";
    const url = API.baseURL + service + "?" + queryString;

    try {
      const response = await fetch(url);
      console.log(API.baseURL + service + "?" + queryString);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (e) {
      console.error("url: ", url);
      console.error("error: ", e.message);
    }
  },
};
