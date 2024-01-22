/* eslint-disable */

import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { setTheme } from "./theme.js";

/**
 * Factory function to create a book listing.
 * @param {Array} books - The books data.
 * @param {Object} authors - The authors data.
 * @param {Object} genres - The genres data.
 * @param {number} BOOK_PER_PAGE - The number of books per page.
 * @returns {Object} The book listing object.
 */
const createBookListing = (books, authors, genres, BOOK_PER_PAGE) => {
  let page = 1;
  let matches = books;
  const listFragment = document.createDocumentFragment();

  /**
   * Selects an HTML element.
   * @param {string} attribute - The attribute of the HTML element.
   * @returns {Element} The selected HTML element.
   */
  const selectHtmlElement = (attribute) => document.querySelector(attribute);

  const toggleOverlay = (open, overlay) =>
    (selectHtmlElement(overlay).open = open);

  /**
   * @typedef {Object} Book
   * @property {string} author - The ID of the author of the book.
   * @property {string} id - The ID of the book.
   * @property {string} image - The URL of the book's cover image.
   * @property {string} title - The title of the book.
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
        <img class="preview__image" src="${image}" />
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

  /**
   * @typedef {Object} Book
   * @property {string} title - The title of the book.
   * @property {string} author - The ID of the author of the book.
   * @property {string[]} genres - The genres of the book.
   */

  /**
   * @typedef {Object} Filters
   * @property {string} title - The text phrase to filter books by title.
   * @property {string} author - The ID of the author to filter books by author.
   * @property {string} genre - The genre to filter books by genre.
   */

  /**
   * Filters an array of books based on the provided filters.
   * @param {Book[]} books - The array of books to filter.
   * @param {Filters} filters - The filters to apply.
   * @returns {Book[]} The filtered array of books.
   */
  const filterBooks = (filters) => {
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

    for (const book of books.slice(0, BOOK_PER_PAGE)) {
      const element = createBookPreview(book);
      newItems.appendChild(element);
    }
    selectHtmlElement("[data-list-items]").appendChild(newItems);
    selectHtmlElement("[data-list-button]").disabled =
      matches.length - page * BOOK_PER_PAGE < 1;
    selectHtmlElement("[data-list-button]").innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${
          matches.length - page * BOOK_PER_PAGE > 0
            ? matches.length - page * BOOK_PER_PAGE
            : 0
        })</span>
      `;
  };

  // Event listeners would be added in a separate method
  const addEventListeners = () => {
    selectHtmlElement("[data-settings-cancel]").addEventListener(
      "click",
      () => {
        toggleOverlay(false, "[data-settings-overlay]");
      }
    );

    selectHtmlElement("[data-header-settings]").addEventListener(
      "click",
      () => {
        toggleOverlay(true, "[data-settings-overlay]");
      }
    );

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
    selectHtmlElement("[data-search-form]").addEventListener(
      "submit",
      (event) => {
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
      }
    );

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
    selectHtmlElement("[data-list-items]").addEventListener(
      "click",
      (event) => {
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
          selectHtmlElement("[data-list-description]").innerText =
            active.description;
        }
      }
    );
  };

  return {
    /**
     * Accessor property to get a copy of the books data.
     * @returns {Array} A copy of the books data.
     */
    get books() {
      return [...books]; // Used spread operator to create a copy of the books array
    },

    /**
     * Accessor property to get a copy of the authors data.
     * @returns {Object} A copy of the authors data.
     */
    get authors() {
      return { ...authors }; // Used spread operator to create a copy of the authors object
    },

    /**
     * Accessor property to get a copy of the genres data.
     * @returns {Object} A copy of the genres data.
     */
    get genres() {
      return { ...genres }; // Used spread operator to create a copy of the genres object
    },

    /**
     * Accessor property to get the number of books per page.
     * @returns {number} The number of books per page.
     */
    get BOOK_PER_PAGE() {
      return BOOK_PER_PAGE;
    },

    /**
     * Accessor property to set the books data.
     * @param {Array} value - The new books data.
     */
    set books(value) {
      if (Array.isArray(value)) {
        books = [...value]; // Used spread operator to create a copy of the new books array
      } else {
        throw new Error("Invalid value for books. It should be an array.");
      }
    },
    /**
     * Accessor property to set the authors data.
     * @param {Object} value - The new authors data.
     */
    set authors(value) {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        authors = { ...value }; // Used spread operator to create a copy of the new authors object
      } else {
        throw new Error("Invalid value for authors. It should be an object.");
      }
    },
    /**
     * Accessor property to set the genres data.
     * @param {Object} value - The new genres data.
     */
    set genres(value) {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        genres = { ...value }; // Used spread operator to create a copy of the new genres object
      } else {
        throw new Error("Invalid value for genres. It should be an object.");
      }
    },
    /**
     * Accessor property to set the number of books per page.
     * @param {number} value - The new number of books per page.
     */
    set BOOK_PER_PAGE(value) {
      if (typeof value === "number") {
        BOOK_PER_PAGE = value;
      } else {
        throw new Error(
          "Invalid value for BOOK_PER_PAGE. It should be a number."
        );
      }
    },

    /**
     * Accessor property to get the current page.
     * @returns {number} The current page.
     */
    get page() {
      return page;
    },

    /**
     * Accessor property to set the current page.
     * @param {number} value - The new page.
     */
    set page(value) {
      page = value;
    },

    /**
     * Accessor property to get a copy of the matches data.
     * @returns {Array} A copy of the matches data.
     */
    get matches() {
      return [...matches]; // Use spread operator to create a copy of the matches array
    },
    /**
     * Accessor property to set the matches data.
     * @param {Array} value - The new matches data.
     */
    set matches(value) {
      matches = [...value]; // Use spread operator to create a copy of the new matches array
    },
    selectHtmlElement,
    toggleOverlay,
    createBookPreview,
    populateSelectElement,
    filterBooks,
    updateBookList,
    addEventListeners,
  };
};

// Usage logic
const bookListing = createBookListing(books, authors, genres, BOOKS_PER_PAGE);
bookListing.addEventListeners();
