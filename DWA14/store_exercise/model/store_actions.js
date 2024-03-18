// These are the actions that we can pass (Function)

export const increase = (state) => {
  // takes the state and returns the new state
  return {
    ...state,
    value: state.value + 1, // override the value after we destructured it in line 20
  };
};

export const decrease = (state) => {
  return {
    ...state,
    value: state.value - 1,
  };
};

// example of  using a "lens" in FP
export const get = (state, key) => {
  return state[key];
};
