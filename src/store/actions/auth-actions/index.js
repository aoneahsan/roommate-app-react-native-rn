import * as ACTION_TYPES from "./../../action-types";

export const authAction = (authData, authMode) => {
  return async dispatch => {
    try {
        
    } catch (error) {
        console.log("");
        throw error;
    }
  };
};

export const setIsLoadingFalse = () => {
  return {
    type: ACTION_TYPES.SET_LOADING_FALSE,
  };
};
