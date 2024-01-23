import { BOOKS_PER_PAGE } from "../data.js";
import { state } from "../modules/state.js";
import { BookPreview } from "../components/bookPreview.js";
import { selectHtmlElement } from "./overlay.js";

export const updateBookList = (books) => {
  selectHtmlElement("[data-list-items]").innerHTML = "";
  const newItems = document.createDocumentFragment();

  for (const book of books.slice(0, BOOKS_PER_PAGE)) {
    const bookPreview = new BookPreview(
      book.author,
      book.id,
      book.image,
      book.title
    );
    const element = bookPreview.create();
    newItems.appendChild(element);
  }

  selectHtmlElement("[data-list-items]").appendChild(newItems);
  selectHtmlElement("[data-list-button]").disabled =
    state.matches.length - state.page * BOOKS_PER_PAGE < 1;
  selectHtmlElement("[data-list-button]").innerHTML = `
          <span>Show more</span>
          <span class="list__remaining"> (${
            state.matches.length - state.page * BOOKS_PER_PAGE > 0
              ? state.matches.length - state.page * BOOKS_PER_PAGE
              : 0
          })</span>
      `;
};
