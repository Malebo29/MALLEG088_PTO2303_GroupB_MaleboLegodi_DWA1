// @ts-check

import { state, Task } from "./state.js";
console.log("It works");

const addTaskToHtml = () => {
    const preview = document.createElement('li');
    preview.className = "task";

    preview.innerHTML = /* html */ `
        <label class="task__check">
        <input class="task__input" type="checkbox" />
        </label>
        <button class="task__title">
        Wash th Dog asda sdasd asd as ddas Dog asda sdasd asd as ddase Dog
        asda sdasd asd as ddas
        </button>
        <label class="task__check">
        <svg
        class="task__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 96 960 960"
        >
        <path
            d ="M253 961q-40.212 0-67.606-27.1Q158 906.8 158 867V314h-58v-94h231v-48h297v48h232v94h-58v553q0 39.05-27.769 66.525Q746.463 961 707 961H253Zm454-647H253v553h454V314ZM354 789h77V390h-77v399Zm175 0h78V390h-78v399ZM253 314v553-553Z"
        >
        </path>
     </svg>
    </label>
`;
    
    list.appendChild(preview);
}
const list = document.querySelector('[data-list]');
const isHtmlElement = list instanceof HTMLElement;

if(!isHtmlElement) {
    throw new Error('"data-list" attribute not found in HTML');
}


