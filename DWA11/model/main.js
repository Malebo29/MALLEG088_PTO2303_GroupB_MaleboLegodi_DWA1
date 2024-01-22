import { createStore } from "./store.js";
import { actions } from "./Actions.js";
import { reducer } from "./Reducer.js";

/**
 * The main entry point of the application.
 */
function main() {
  // Create the store
  const store = createStore(reducer);

  // Subscribe to the store
  store.subscribe(() => console.log(store.getState()));

  // Dispatch actions
  store.dispatch({ type: actions.ADD }); // After this line executes, "count: 1"
  store.dispatch({ type: actions.ADD }); // After this line executes, "count: 2"
  store.dispatch({ type: actions.SUBTRACT }); // After this line executes, "count: 1"
  store.dispatch({ type: actions.RESET });
}

main();
