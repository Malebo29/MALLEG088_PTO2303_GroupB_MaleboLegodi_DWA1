export const toggleOverlay = (open, overlay) => {
  selectHtmlElement(overlay).open = open;
};

export const selectHtmlElement = (attribute) => {
  return document.querySelector(attribute);
};
