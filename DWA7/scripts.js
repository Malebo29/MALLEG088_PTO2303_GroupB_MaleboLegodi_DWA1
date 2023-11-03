import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { setTheme } from "./theme.js";

let page = 1;
let matches = books;

/**
 * A generic function that toggles the three overlays - the settings, search and the book preview (data-list-active) overlay.
 * @param {boolean} open - Whether to open or close the triggered overlay.
 */
const toggleOverlay = (open, overlay) => {
  selectHtmlElement(overlay).open = open;
};

const selectHtmlElement = (attribute) => {
  return document.querySelector(attribute);
};

const listFragment = document.createDocumentFragment();

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
  // Create a new button element
  const bookPreviewElement = document.createElement("button");

  // Add the "preview" class to the element
  bookPreviewElement.classList = "preview";

  // Set the "data-preview" attribute to the ID of the book
  bookPreviewElement.setAttribute("data-preview", id);

  // Set the inner HTML of the element to include the book's image, title, and author
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

  // Return the created book preview element
  return bookPreviewElement;
};

// Loop over the first page of matches
for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
  // Create a new book preview element for each match
  const bookCardElement = createBookPreview({ author, id, image, title });

  // Add the new book preview element to the list fragment
  listFragment.appendChild(bookCardElement);
}

// Function to create an option element
const createOptionElement = (value, text) => {
  const optionElement = document.createElement("option");
  optionElement.value = value;
  optionElement.innerText = text;
  return optionElement;
};

// Function to populate a select element with options
const populateSelectElement = (selectElement, items, defaultOptionText) => {
  const htmlFragment = document.createDocumentFragment();
  htmlFragment.appendChild(createOptionElement("any", defaultOptionText));

  for (const [id, name] of Object.entries(items)) {
    htmlFragment.appendChild(createOptionElement(id, name));
  }

  selectElement.appendChild(htmlFragment);
};

// Populate the genres select element
populateSelectElement(
  document.querySelector("[data-search-genres]"),
  genres,
  "All Genres"
);

// Populate the authors select element
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

const filterBooks = (books, filters) => {
  // Use the filter method to create a new array with all books that pass the test implemented by the provided function
  return books.filter((book) => {
    // Initialize genreMatch to true if the genre filter is "any"
    let genreMatch = filters.genre === "any";

    // Loop over the genres of the book
    for (const singleGenre of book.genres) {
      // If genreMatch is already true, break the loop
      if (genreMatch) break;
      // If the current genre matches the genre filter, set genreMatch to true
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    // Return true if the book passes all filters, and false otherwise
    return (
      // If the title filter is empty, or if the book's title includes the title filter (case-insensitive), this condition is true
      (filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      // If the author filter is "any", or if the book's author matches the author filter, this condition is true
      (filters.author === "any" || book.author === filters.author) &&
      // If genreMatch is true, this condition is true
      genreMatch
    );
  });
};

/**
 * Updates the book list with the given books.
 * @param {Object[]} books - The books to display.
 */
const updateBookList = (books) => {
  // Clear the existing book list
  selectHtmlElement("[data-list-items]").innerHTML = "";

  // Create a new document fragment to hold the new book preview elements
  const newItems = document.createDocumentFragment();

  // Loop over the books, but only up to the maximum number of books per page
  for (const book of books.slice(0, BOOKS_PER_PAGE)) {
    // Create a new book preview element for each book
    const element = createBookPreview(book);

    // Add the new book preview element to the document fragment
    newItems.appendChild(element);
  }

  // Add the document fragment with the new book preview elements to the book list
  selectHtmlElement("[data-list-items]").appendChild(newItems);

  // Disable the "Show more" button if there are no more books to show
  selectHtmlElement("[data-list-button]").disabled =
    matches.length - page * BOOKS_PER_PAGE < 1;

  // Update the text of the "Show more" button to show the number of remaining books
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
  // Prevent the default form submission behavior
  event.preventDefault();

  // Create a FormData object from the form data
  const formData = new FormData(event.target);

  // Convert the FormData object to a plain object
  const filters = Object.fromEntries(formData);

  // Filter the books based on the filters
  const result = filterBooks(books, filters);

  // Reset the page and matches variables
  page = 1;
  matches = result;

  // If there are no matches, show the list message
  if (result.length < 1) {
    selectHtmlElement("[data-list-message]").classList.add(
      "list__message_show"
    );
  } else {
    // Otherwise, hide the list message
    selectHtmlElement("[data-list-message]").classList.remove(
      "list__message_show"
    );
  }

  // Update the book list with the filtered books
  updateBookList(result);

  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Close the search overlay
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
  // Create a new document fragment
  const bookFragment = document.createDocumentFragment();

  // Loop over the matches for the current page
  for (const { author, id, image, title } of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    // Create a new book preview element for each match
    const bookElement = createBookPreview({ author, id, image, title });

    // Add the new book preview element to the document fragment
    bookFragment.appendChild(bookElement);
  }

  // Add the document fragment to the list items
  selectHtmlElement("[data-list-items]").appendChild(bookFragment);

  // Increment the page variable
  page += 1;
});

/**
 * Handles a click event on the book list items.
 * @param {Event} event - The click event.
 */
selectHtmlElement("[data-list-items]").addEventListener("click", (event) => {
  // Create an array from the event path or the composed path of the event
  const pathArray = Array.from(event.path || event.composedPath());

  // Initialize active to null
  let active = null;

  // Loop over the nodes in the path array
  for (const node of pathArray) {
    // If active is not null, break the loop
    if (active) break;

    // If the node has a "data-preview" attribute
    if (node?.dataset?.preview) {
      // Initialize result to null
      let result = null;

      // Loop over the books
      for (const singleBook of books) {
        // If result is not null, break the loop
        if (result) break;

        // If the ID of the book matches the "data-preview" attribute of the node
        if (singleBook.id === node?.dataset?.preview) {
          // Set result to the book
          result = singleBook;
        }
      }

      // Set active to result
      active = result;
    }
  }

  // If active is not null
  if (active) {
    // Open the active book list item
    selectHtmlElement("[data-list-active]").open = true;

    // Set the source of the blur and image elements to the image of the active book
    selectHtmlElement("[data-list-blur]").src = active.image;
    selectHtmlElement("[data-list-image]").src = active.image;

    // Set the text of the title element to the title of the active book
    selectHtmlElement("[data-list-title]").innerText = active.title;

    // Set the text of the subtitle element to the author and publication year of the active book
    selectHtmlElement("[data-list-subtitle]").innerText = `${
      authors[active.author]
    } (${new Date(active.published).getFullYear()})`;

    // Set the text of the description element to the description of the active book
    selectHtmlElement("[data-list-description]").innerText = active.description;
  }
});
