import * as ACTION_TYPES from "../../action-types";

const initState = {
  profileData: null,
  usersList: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PROFILE_DATA:
      return setProfileData(state, action);
    case ACTION_TYPES.SET_USERS_LIST_DATA:
      return setUsersListData(state, action);
    default:
      return state;
  }
};

const setProfileData = (state, action) => {
  const profileData = action.payload.profileData;
  return { ...state, isLoggedIn: true, profileData: profileData };
};

const setUsersListData = (state, action) => {
  const usersList = action.payload.usersList;
  return { ...state, usersList: usersList };
};

export default userReducer;
