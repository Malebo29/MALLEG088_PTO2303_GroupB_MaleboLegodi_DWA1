//@ts-check
import { authors } from "../data.js";

export class BookPreview {
  constructor(author, id, image, title) {
    this.author = author;
    this.id = id;
    this.image = image;
    this.title = title;
  }

  create() {
    const bookPreviewElement = document.createElement("button");
    bookPreviewElement.classList = "preview";
    bookPreviewElement.setAttribute("data-preview", this.id);
    bookPreviewElement.innerHTML = `
        <img
            class="preview__image"
            src="${this.image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${this.title}</h3>
            <div class="preview__author">${authors[this.author]}</div>
        </div>
    `;
    return bookPreviewElement;
  }
}
