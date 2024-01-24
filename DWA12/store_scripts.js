import { subscribe, update, Action, Notify } from "./model/store_store.js";

const handler = (prevState, nextState) => console.log(prevState, nextState);
const unsubscribe = subscribe(handler);

/**
 * @type {Notify}
 */

const htmlHandler = (nextState, prevState) => {
  if (prevState.wind.value === nextState.wind.value) return;

  const div = document.createElement("div");
  div.innerText = nextState.wind.value.toString();
  document.body.appendChild(div);
};

subscribe(htmlHandler);

/**
 * @type {Action}
 */
const customAction = (state) => {
  return {
    ...state,
    wind: {
      ...state.wind,
      value: state.wind.value + 19,
    },
  };
};

update(customAction);
update(customAction);
unsubscribe();

update(customAction);
update(customAction);
