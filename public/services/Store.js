const Store = {
  email: "",
  jwt: null,
  get loggedIn() {
    return this.jwt !== null;
  },

  reset: () => {
    Store.email = "";
  },
};

const jwt = localStorage.getItem("jwt");
const email = localStorage.getItem("email");

if (jwt) Store.jwt = jwt;
if (email) Store.email = email;

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
    }

    return true;
  },
});

export default proxiedStore;
