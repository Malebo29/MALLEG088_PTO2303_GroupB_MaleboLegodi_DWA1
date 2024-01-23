export const populateSelectElement = (
  selectElement,
  items,
  defaultOptionText
) => {
  const htmlFragment = document.createDocumentFragment();
  htmlFragment.appendChild(createOptionElement("any", defaultOptionText));

  for (const [id, name] of Object.entries(items)) {
    htmlFragment.appendChild(createOptionElement(id, name));
  }

  selectElement.appendChild(htmlFragment);
};

const createOptionElement = (value, text) => {
  const optionElement = document.createElement("option");
  optionElement.value = value;
  optionElement.innerText = text;
  return optionElement;
};
