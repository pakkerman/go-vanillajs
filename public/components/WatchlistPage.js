import { API } from "../services/API.js";
import { CollectionPage } from "./CollectionPage.js";

export class WatchlistPage extends CollectionPage {
  constructor() {
    super(API.getWatchlist, "Watchlist", "watchlist");
  }
}

customElements.define("watchlist-page", WatchlistPage);
