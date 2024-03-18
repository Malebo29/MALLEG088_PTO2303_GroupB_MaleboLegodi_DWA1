import { html, render } from "../node_modules/lit-html";
import { getState, dispatch, State } from "../model/store_store.js";
import { addTask, get } from "../model/store_actions.js";

createComponent({
  element: "td-app",

  events: {
    submit: (event, getHtml) => {
      event.preventDefault();

      /**
       * @type {any}
       */
      const eventAsAny = event;

      /**
       * @type {string | undefined}
       */
      const key = eventAsAny?.target?.dataset?.key;

      if (key === "add") {
        if (!(event.target instanceof HTMLFormElement)) {
          throw new Error("Is required to be a form");
        }
        const response = new FormData(event.target);
        const { title } = Object.fromEntries(response);

        event.target.reset();
        dispatch(addTask({ title: title.toString() }));
        console.log(getState);
      }
    },
  },

  connect: (prevState, nextState, getHtml) => {
    const html = render(nextState);
    const [wrapper] = getHtml("wrapper");
    wrapper.innerHTML = html;
  },

  templtae: /* html */ "<div data-wrapper></div>",
});

/**
 * Creates new HTML based on state
 *
 * @param {*} props
 * @returns {string}
 */
const render = (props) => {
  const { tasks } = props;

  /**
   * @returns {Array<string>}
   */
  const taskHTML = Object.values(tasks).map(({ created, id, title }) => {
    return /* html */ `
    <li data-id="${id}">
    <button>${title}</button>
    </li>
    `;
  });

  return /* html */ `<form data-key="add">
    <label>
        <span>Enter your name:</span>
        <input type="text" name="name" />
    </label>
    
        <button>Submit</button> 
    </form>
        
    <ul>
    ${taskHTML.join("")}
    </ul> `;
};
