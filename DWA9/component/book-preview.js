// Create a template for the book preview
const bookPreviewTemplate = document.createElement("template");
bookPreviewTemplate.innerHTML = `
<style>

</style>

  <button class="preview">
    <img class="preview__image" />
    <div class="preview__info">
      <h3 class="preview__title"></h3>
      <div class="preview__author"></div>
    </div>
  </button>
`;

/**
 * Creates a book preview element.
 * @param {Book} book - The book data.
 * @returns {HTMLElement} The created book preview element.
 */
const createBookPreview = ({ author, id, image, title }) => {
  // Clone the template
  const bookPreviewElement = bookPreviewTemplate.content.cloneNode(true);

  // Set the attributes and content
  bookPreviewElement.querySelector("button").setAttribute("data-preview", id);
  bookPreviewElement.querySelector(".preview__image").src = image;
  bookPreviewElement.querySelector(".preview__title").innerText = title;
  bookPreviewElement.querySelector(".preview__author").innerText =
    authors[author];

  return bookPreviewElement;
};
