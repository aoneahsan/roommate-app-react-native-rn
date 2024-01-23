import * as ACTION_TYPES from "./../../action-types";

export const setIsLoadingTrue = () => {
  return {
    type: ACTION_TYPES.SET_LOADING_TRUE,
  };
};

export const setIsLoadingFalse = () => {
  return {
    type: ACTION_TYPES.SET_LOADING_FALSE,
  };
};
