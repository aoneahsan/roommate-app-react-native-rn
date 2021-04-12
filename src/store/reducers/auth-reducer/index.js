import * as ACTION_TYPES from "../../action-types";

const initState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_AUTH_DATA:
      return setAuthData(state, action);
    case ACTION_TYPES.LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

const setAuthData = (state, action) => {
  const authData = action.payload.authData;
  return { ...state, isLoggedIn: true, user: authData, token: authData.token };
};

const logout = (state, action) => {
  return { ...state, isLoggedIn: false, user: null, token: null };
};

export default authReducer;
