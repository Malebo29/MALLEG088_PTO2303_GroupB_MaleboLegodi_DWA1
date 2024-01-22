/**
 * Creates a Redux-inspired store.
 * @param {function} reducer - The reducer function used to change the state.
 * @returns {object} The store with `getState`, `dispatch`, and `subscribe` methods.
 */
export const createStore = (reducer) => {
  let state = reducer(undefined, {});
  let listeners = [];

  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };
};
