import * as ACTION_TYPES from "../../action-types";

const initState = {
  isLoading: false,
};

const systemReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING_TRUE:
      return setLoadingTrue(state, action);
    case ACTION_TYPES.SET_LOADING_FALSE:
      return setLoadingFalse(state, action);
    default:
      return state;
  }
};

const setLoadingTrue = (state, action) => {
  return { ...state, isLoading: true };
};

const setLoadingFalse = (state, action) => {
  return { ...state, isLoading: false };
};

export default systemReducer;
