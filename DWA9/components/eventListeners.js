//@ts-check

import { toggleOverlay, selectHtmlElement } from "../modules/overlay.js";
import { books, genres, authors, BOOKS_PER_PAGE } from "../data.js";
import { setTheme } from "../modules/theme.js";
import { filterBooks } from "../modules/filters.js";
import { updateBookList } from "../modules/update.js";
import { BookPreview } from "./bookPreview.js";
import { state } from "../modules/state.js";

export const settingsEventListener = () => {
  // settings event listener
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
};

export const searchEventListener = () => {
  // search event listener
  selectHtmlElement("[data-search-form]").addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const filters = Object.fromEntries(formData);
      const result = filterBooks(books, filters);

      state.page = 1;
      state.matches = result;
      if (result.length < 1) {
        selectHtmlElement("[data-list-message]").classList.add(
          "list__message_show"
        );
      } else {
        selectHtmlElement("[data-list-message]").classList.remove(
          "list__message_show"
        );
      }
      // Use the bookListFactory to update the book list
      updateBookList(result);
      toggleOverlay(false, "[data-search-overlay]");
    }
  );
};

export const listCloseEventListener = () => {
  // list close event listener
  selectHtmlElement("[data-list-close]").addEventListener("click", () => {
    toggleOverlay(false, "[data-list-active]");
  });
};

export const listButtonEventListener = () => {
  // list button event listener
  selectHtmlElement("[data-list-button]").addEventListener("click", () => {
    const bookFragment = document.createDocumentFragment();
    for (const { author, id, image, title } of state.matches.slice(
      state.page * BOOKS_PER_PAGE,
      (state.page + 1) * BOOKS_PER_PAGE
    )) {
      const bookPreview = new BookPreview(author, id, image, title);
      const bookElement = bookPreview.create();
      bookFragment.appendChild(bookElement);
    }

    selectHtmlElement("[data-list-items]").appendChild(bookFragment);
    state.page += 1;
  });
};

export const listItemsEventListener = () => {
  // list items event listener
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
      selectHtmlElement("[data-list-description]").innerText =
        active.description;
    }
  });
};
