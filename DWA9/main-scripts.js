/* eslint-disable */

//@ts-check

import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { bookListFactory } from "./components/bookListFactory.js";
import { populateSelectElement } from "./components/selectElement.js";
import { selectHtmlElement } from "./modules/overlay.js";
import { state } from "./modules/state.js";
import {
  settingsEventListener,
  searchEventListener,
  listCloseEventListener,
  listButtonEventListener,
  listItemsEventListener,
} from "./components/eventListeners.js";

// Create a new book list
const bookList = bookListFactory();

// Append the book list to the DOM
selectHtmlElement("[data-list-items]").appendChild(bookList.create());

populateSelectElement(
  selectHtmlElement("[data-search-genres]"),
  genres,
  "All Genres"
);

populateSelectElement(
  selectHtmlElement("[data-search-authors]"),
  authors,
  "All Authors"
);

selectHtmlElement("[data-list-button]").innerText = `Show more (${
  books.length - BOOKS_PER_PAGE
})`;

selectHtmlElement("[data-list-button]").disabled =
  state.matches.length - state.page * BOOKS_PER_PAGE <= 0;

selectHtmlElement("[data-list-button]").innerHTML = `
          <span>Show more</span>
          <span class="list__remaining"> (${
            state.matches.length - state.page * BOOKS_PER_PAGE > 0
              ? state.matches.length - state.page * BOOKS_PER_PAGE
              : 0
          })</span>
      `;

settingsEventListener();
searchEventListener();
listCloseEventListener();
listButtonEventListener();
listItemsEventListener();

// Update the book list when necessary
// bookList.update(result);
