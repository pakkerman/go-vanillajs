const Store = {
  jwt: null,
  get loggedIn() {
    return this.jwt !== null;
  },
};

if (localStorage.getItem("jwt")) {
  Store.jwt = localStorage.getItem("jwt");
}

// so this will hook event when something happens to Store

const proxiedStore = new Proxy(Store, {
  // when target's prop "jwt" is changed,  setting the target's prop jwt to the value,
  // and store it to localStorage
  set: (target, prop, value) => {
    if (prop === "jwt") {
      target[prop] = value;
      if (value == null) {
        localStorage.removeItem("jwt");
      } else {
        localStorage.setItem("jwt", value);
      }
    }

    return true;
  },
});

export default proxiedStore;
