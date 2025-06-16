const Store = {
  email: "",
  jwt: null,
  collection: {},

  get loggedIn() {
    return this.jwt !== null;
  },

  clear: () => {
    Store.jwt = null;
    Store.email = "";
    Store.collection = {};

    localStorage.clear();
  },
};

const jwt = localStorage.getItem("jwt");
const email = localStorage.getItem("email");
const collection = localStorage.getItem("collection");

if (jwt) Store.jwt = jwt;
if (email) Store.email = email;
if (collection) Store.collection = JSON.parse(collection);

// so this will hook event when something happens to Store

const proxiedStore = new Proxy(Store, {
  // when target's prop "jwt" is changed,  setting the target's prop jwt to the value,
  // and store it to localStorage
  set: (target, prop, value) => {
    switch (prop) {
      case "jwt":
        target[prop] = value;
        if (value == null) localStorage.removeItem("jwt");
        else localStorage.setItem("jwt", value);
        break;
      case "email":
        target[prop] = value;
        if (value == null) localStorage.removeItem("email");
        else localStorage.setItem("email", value);
        break;
      case "collection":
        target[prop] = value;
        if (value == null) localStorage.removeItem("collection");
        else {
          localStorage.setItem("collection", JSON.stringify(value));
        }
        break;
    }

    return true;
  },
});

export default proxiedStore;
