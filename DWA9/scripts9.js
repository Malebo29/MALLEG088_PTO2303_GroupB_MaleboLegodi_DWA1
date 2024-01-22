/* eslint-disable */

import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { setTheme } from "./theme.js";

let page = 1;
let matches = books;

const selectHtmlElement = (attribute) => {
  return document.querySelector(attribute);
};

/**
 * A generic function that toggles the three overlays - the settings, search and the book preview (data-list-active) overlay.
 * @param {boolean} open - Whether to open or close the triggered overlay.
 */
const toggleOverlay = (open, overlay) => {
  selectHtmlElement(overlay).open = open;
};

const listFragment = document.createDocumentFragment();

/**
 * @typedef {Object} Book
 * @prop {string} author - The ID of the author of the book.
 * @prop {string} id - The ID of the book.
 * @prop {string} image - The URL of the book's cover image.
 * @prop {string} title - The title of the book.
 */

/**
 * Creates a book preview element.
 * @param {Book} book - The book data.
 * @returns {HTMLElement} The created book preview element.
 */
const createBookPreview = ({ author, id, image, title }) => {
  const bookPreviewElement = document.createElement("button");
  bookPreviewElement.classList = "preview";
  bookPreviewElement.setAttribute("data-preview", id);
  bookPreviewElement.innerHTML = `
      <img
          class="preview__image"
          src="${image}"
      />
      
      <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
      </div>
  `;
  return bookPreviewElement;
};

for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
  const bookCardElement = createBookPreview({ author, id, image, title });
  listFragment.appendChild(bookCardElement);
}

const createOptionElement = (value, text) => {
  const optionElement = document.createElement("option");
  optionElement.value = value;
  optionElement.innerText = text;
  return optionElement;
};

const populateSelectElement = (selectElement, items, defaultOptionText) => {
  const htmlFragment = document.createDocumentFragment();
  htmlFragment.appendChild(createOptionElement("any", defaultOptionText));

  for (const [id, name] of Object.entries(items)) {
    htmlFragment.appendChild(createOptionElement(id, name));
  }

  selectElement.appendChild(htmlFragment);
};

populateSelectElement(
  document.querySelector("[data-search-genres]"),
  genres,
  "All Genres"
);

populateSelectElement(
  document.querySelector("[data-search-authors]"),
  authors,
  "All Authors"
);

selectHtmlElement("[data-list-items]").appendChild(listFragment);
selectHtmlElement("[data-list-button]").innerText = `Show more (${
  books.length - BOOKS_PER_PAGE
})`;

selectHtmlElement("[data-list-button]").disabled =
  matches.length - page * BOOKS_PER_PAGE <= 0;

selectHtmlElement("[data-list-button]").innerHTML = `
          <span>Show more</span>
          <span class="list__remaining"> (${
            matches.length - page * BOOKS_PER_PAGE > 0
              ? matches.length - page * BOOKS_PER_PAGE
              : 0
          })</span>
      `;

/**
 * @typedef {Object} Book
 * @prop {string} title - The title of the book.
 * @prop {string} author - The ID of the author of the book.
 * @prop {string[]} genres - The genres of the book.
 */

/**
 * @typedef {Object} Filters
 * @prop {string} title - The text phrase to filter books by title.
 * @prop {string} author - The ID of the author to filter books by author.
 * @prop {string} genre - The genre to filter books by genre.
 */

/**
 * Filters an array of books based on the provided filters.
 * @param {Book[]} books - The array of books to filter.
 * @param {Filters} filters - The filters to apply.
 * @returns {Book[]} The filtered array of books.
 */

const filterBooks = (books, filters) => {
  return books.filter((book) => {
    let genreMatch = filters.genre === "any";
    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }
    return (
      (filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "any" || book.author === filters.author) &&
      genreMatch
    );
  });
};

/**
 * Updates the book list with the given books.
 * @param {Object[]} books - The books to display.
 */
const updateBookList = (books) => {
  selectHtmlElement("[data-list-items]").innerHTML = "";
  const newItems = document.createDocumentFragment();

  for (const book of books.slice(0, BOOKS_PER_PAGE)) {
    const element = createBookPreview(book);
    newItems.appendChild(element);
  }
  selectHtmlElement("[data-list-items]").appendChild(newItems);
  selectHtmlElement("[data-list-button]").disabled =
    matches.length - page * BOOKS_PER_PAGE < 1;
  selectHtmlElement("[data-list-button]").innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${
        matches.length - page * BOOKS_PER_PAGE > 0
          ? matches.length - page * BOOKS_PER_PAGE
          : 0
      })</span>
  `;
};

selectHtmlElement("[data-settings-cancel]").addEventListener("click", () => {
  toggleOverlay(false, "[data-settings-overlay]");
});

selectHtmlElement("[data-header-settings]").addEventListener("click", () => {
  toggleOverlay(true, "[data-settings-overlay]");
});

selectHtmlElement("[data-settings-form]").addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    if (theme === "night") {
      setTheme("night");
    } else {
      setTheme("day");
    }
    toggleOverlay(false, "[data-settings-overlay]");
  }
);

selectHtmlElement("[data-search-cancel]").addEventListener("click", () => {
  toggleOverlay(false, "[data-search-overlay]");
});

selectHtmlElement("[data-header-search]").addEventListener("click", () => {
  toggleOverlay(true, "[data-search-overlay]");
  selectHtmlElement("[data-search-title]").focus();
});

/**
 * Handles a submit event on the search form.
 * @param {Event} event - The submit event.
 */
selectHtmlElement("[data-search-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = filterBooks(books, filters);

  page = 1;
  matches = result;
  if (result.length < 1) {
    selectHtmlElement("[data-list-message]").classList.add(
      "list__message_show"
    );
  } else {
    selectHtmlElement("[data-list-message]").classList.remove(
      "list__message_show"
    );
  }
  updateBookList(result);
  toggleOverlay(false, "[data-search-overlay]");
});

/**
 * Handles a click event on the list close button.
 */
selectHtmlElement("[data-list-close]").addEventListener("click", () => {
  toggleOverlay(false, "[data-list-active]");
});

/**
 * Handles a click event on the list button.
 */
selectHtmlElement("[data-list-button]").addEventListener("click", () => {
  const bookFragment = document.createDocumentFragment();
  for (const { author, id, image, title } of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    const bookElement = createBookPreview({ author, id, image, title });
    bookFragment.appendChild(bookElement);
  }

  selectHtmlElement("[data-list-items]").appendChild(bookFragment);
  page += 1;
});

/**
 * Handles a click event on the book list items.
 * @param {Event} event - The click event.
 */
selectHtmlElement("[data-list-items]").addEventListener("click", (event) => {
  const pathArray = Array.from(event.path || event.composedPath());

  let active = null;

  for (const node of pathArray) {
    if (active) break;
    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) {
          result = singleBook;
        }
      }
      active = result;
    }
  }

  if (active) {
    selectHtmlElement("[data-list-active]").open = true;
    selectHtmlElement("[data-list-blur]").src = active.image;
    selectHtmlElement("[data-list-image]").src = active.image;
    selectHtmlElement("[data-list-title]").innerText = active.title;
    selectHtmlElement("[data-list-subtitle]").innerText = `${
      authors[active.author]
    } (${new Date(active.published).getFullYear()})`;
    selectHtmlElement("[data-list-description]").innerText = active.description;
  }
});
