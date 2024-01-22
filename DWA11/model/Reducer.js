import { actions } from "./Actions.js";

/**
 * The initial state of the Redux-inspired store.
 * @type {object}
 */
const initialState = {
  count: 0,
};

/**
 * The amount by which the count should be incremented or decremented.
 * @type {number}
 */
const STEP_AMOUNT = 1;
const MAX_NUMBER = 10;
const MIN_NUMBER = -5;

/**
 * The reducer function for the Redux-inspired store.
 * @param {object} [state=initialState] - The current state.
 * @param {object} action - The action to be applied.
 * @returns {object} The new state.
 */
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD:
      return {
        ...state,
        count: Math.min(state.count + STEP_AMOUNT, MAX_NUMBER),
      };
    case actions.SUBTRACT:
      return {
        ...state,
        count: Math.max(state.count - STEP_AMOUNT, MIN_NUMBER),
      };
    case actions.RESET:
      return { ...state, count: 0 };
    default:
      return state;
  }
};
