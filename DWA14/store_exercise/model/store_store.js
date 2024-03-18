/**
 * @typedef {object} Item
 * @prop {number} value
 */

/**
 * @typedef {object} State
 * @prop {Item} wind
 * @prop {Item} temperature
 * @prop {Item} humadity
 */

/**
 * @callback Notify
 * @param {State} prevState
 * @param {State} nextState
 */

export const Notify = {};

/**
 * @callback Action
 * @param {State}
 * @returns {State}
 */

export const Action = {};

/**
 * @callback Update
 * @param {Action}
 */

/**
 * @callback Subscribe
 * @param {Notify} notify
 */

/**
 * @callback EmptyFn
 */

/**
 * @typedef {object} Store
 * @prop {Update} update
 * @prop {Subscribe} subscribe
 *
 */

// the initial state (Store)
const initial = {
  wind: {
    value: 1,
  },
  temperature: {
    value: 1,
  },
  humadity: {
    value: 1,
  },
};

// The new store that passes the initial state through this store.
// we then put it in state and this is the only thing tha can be mutated (the state can be replaced)

/**
 * @type {Array<State>}
 */
const states = [initial];

/**
 * @type {Array<Notification>}
 */
let notifiers = [];

// Update takes an action and that action is function then we check...

/**
 *
 * @param {Action} action
 */
export const update = (action) => {
  if (typeof action !== "function") {
    throw new Error("action is required to be a function");
  }

  //   const prevState = states[states.length - 1];

  const prevState = Object.freeze({ ...states[0] });
  const nextState = Object.freeze({ ...action(prevState) });

  const handler = (notify) => notify(nextState, prevState);
  notifiers.forEach(handler);

  states.unshift(nextState);
};

/**
 * @param {Notify} notify
 * @returns
 */
export const subscribe = (notify) => {
  notifiers.push(notify);

  const unsubscribe = () => {
    const handler = (current) => current !== notify;
    const result = notifiers.filter(handler);
    notifiers = result;
  };

  return unsubscribe;
};
