import { HomePage } from "../components/HomePage.js";
import { MovieDetailsPage } from "../components/MovieDetailsPage.js";
import { MoviesPage } from "../components/MoviesPage.js";
import { RegisterPage } from "../components/RegisterPage.js";
import { LoginPage } from "../components/LoginPage.js";
import { AccountPage } from "../components/AccountPage.js";
import { DeletePage } from "../components/DeletePage.js";
import { FavoritesPage } from "../components/FavoritesPage.js";
import { WatchlistPage } from "../components/WatchlistPage.js";

export const routes = [
  { path: "/", component: HomePage },
  { path: /\/movies\/(\d*)/, component: MovieDetailsPage },
  { path: "/movies", component: MoviesPage }, // search result
  { path: "/account/register", component: RegisterPage },
  { path: "/account/login", component: LoginPage },
  { path: "/account/", component: AccountPage, loggedIn: true },
  { path: "/account/delete", component: DeletePage, loggedIn: true },
  { path: "/account/favorites", component: FavoritesPage, loggedIn: true },
  { path: "/account/watchlist", component: WatchlistPage, loggedIn: true },
];
