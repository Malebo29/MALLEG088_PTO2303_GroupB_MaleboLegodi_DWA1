import { createComponent } from "../utils/components.js";
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

    // const nextTasks = Object.values(nextState.tasks);

    // const prevTaskIds = Object.keys(prevState.tasks);
    // const nextTaskIds = Object.keys(nextState.tasks);

    // const [ul] = getHtml("list");

    // // we map over it and check what has been added
    // nextTasks.forEach((item) => {
    //   if (!prevTaskIds.includes(item.id)) return;
    //   const li = document.createElement("li");
    //   li.dataset.id = item.id;
    //   li.innerText = item.title;
    //   ul.appendChild(li);
    // });

    // // we map over it and check what has been removed
    // prevTaskIds.forEach((id) => {
    //   if (nextTaskIds.includes(id)) return;
    //   const node = ul.querySelector(`[data-id="${id}]`);

    //   if (!(node instanceof HTMLElement)) {
    //     throw new Error("Required to be an HTMLElement");
    //   }
    //   node.remove();
    // });
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
