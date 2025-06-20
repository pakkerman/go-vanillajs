import { routes } from "./Routes.js";

export const Router = {
  init: () => {
    window.addEventListener("popstate", () => {
      Router.go(location.pathname, false);
    });

    // enhance current links in the document
    document.querySelectorAll("a.navlink").forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const href = a.getAttribute("href");
        Router.go(href);
      }),
    );

    // go to initial route
    Router.go(location.pathname + location.search);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState(null, "", route);
    }

    let pageElement = null;
    const routePath = route.includes("?") ? route.split("?")[0] : route;
    let needsLogin = false;
    for (const r of routes) {
      if (typeof r.path === "string" && r.path === routePath) {
        // string path
        pageElement = new r.component();
        needsLogin = r.loggedIn == true;

        break;
      } else if (r.path instanceof RegExp) {
        // regex path
        const match = r.path.exec(route);
        if (match) {
          pageElement = new r.component();
          const params = match.slice(1);
          pageElement.params = params;
          needsLogin = r.loggedIn == true;

          break;
        }
      }
    }

    if (pageElement) {
      // We have a page from routes
      if (needsLogin && app.Store.loggedIn === false) {
        app.Router.go("/account/login");
        return;
      }
    }

    if (pageElement == null) {
      pageElement = document.createElement("h1");
      pageElement.textContent = "Page not found";
    }

    // Inserting new page into UI
    const oldPage = document.querySelector("main").firstElementChild;
    if (oldPage) oldPage.style.viewTransitionName = "old";
    pageElement.style.viewTransitionName = "new";

    if (!document.startViewTransition) {
      updatePage();
    } else {
      document.startViewTransition(() => {
        updatePage();
      });
    }

    function updatePage() {
      document.querySelector("main").innerHTML = "";
      document.querySelector("main").appendChild(pageElement);
    }
  },
};
