import { API } from "./services/API.js";

window.app = {
  search: (event) => {
    event.preventDefault();
    const q = document.querySelector("input[type=search]").value;
    //TODO: call to api
  },

  api: API,
};
