//@ts-check

import { html, render } from "https://esm.run/lit-html@1";

/**
 * @param {string} name
 */
const createView = (name) => {
  return html`<div>Hello, your name is ${name}</div> `;
};

const example1 = createView("Malebo");
const example2 = createView("Selaki");

render(example1, document.querySelector("[data-app]"));

// console.log(example1, example2);

setTimeout(() => {
  render(example2, document.querySelector("[data-app]"));
}, 3000);

// console.log(html, render);
