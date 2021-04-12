// Core Imports

// Custom Imports
import axios from "../../../axios";
import * as CONFIG from "../../../config";
import * as ACTION_TYPES from "../../action-types";

export const fetchProfile = () => {
  return async (dispatch, getStore) => {
    try {
      const store = getStore();
      const token = store.authR.token;
      const headers = {
        [CONFIG.AXIOS_HEADER_AUTH_KEY]: token,
      };
      console.log("user-actions === fetchProfile == headers = ", headers);
      const response = await axios.get("/profile", {
        headers: headers,
      });
      // console.log(response);
      const data = response.data;
      await dispatch({
        type: ACTION_TYPES.SET_PROFILE_DATA,
        payload: {
          profileData: data.data,
        },
      });
      return data;
    } catch (error) {
      const response = error.response;
      // console.log("user-actions === fetchProfile == catch error = ", {
      //   response,
      // });
      return response.data;
    }
  };
};

export const updateProfile = (profileData) => {
  return async (dispatch, getStore) => {
    try {
      const store = getStore();
      const token = store.authR.token;
      const response = await axios.post("/profile", profileData, {
        headers: {
          [CONFIG.AXIOS_HEADER_AUTH_KEY]: token,
        },
      });
      // console.log(response);
      const data = response.data;
      const responseData = data.data;
      await dispatch({
        type: ACTION_TYPES.SET_PROFILE_DATA,
        payload: {
          profileData: responseData,
        },
      });
      return data;
    } catch (error) {
      const response = error.response;
      console.log("user-actions === verifyCode == catch error = ", {
        response,
      });
      return response.data;
    }
  };
};

export const fetchUsersListData = () => {
  return async (dispatch, getStore) => {
    try {
      const store = getStore();
      const token = store.authR.token;
      const response = await axios.get("/resend-verify-code", {
        headers: {
          [CONFIG.AXIOS_HEADER_AUTH_KEY]: token,
        },
      });
      // console.log(response);
      const data = response.data;
      const usersList = data.data;
      await dispatch({
        type: ACTION_TYPES.SET_USERS_LIST_DATA,
        payload: {
          usersList: usersList,
        },
      });
      return data;
    } catch (error) {
      const response = error.response;
      console.log("user-actions === fetchUsersListData == catch error = ", {
        response,
      });
      return response.data;
    }
  };
};

export const uploadFile = (file) => {
  return async (dispatch, getStore) => {
    try {
      const store = getStore();
      const token = store.authR.token;
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("/upload-file", formData, {
        headers: {
          [CONFIG.AXIOS_HEADER_AUTH_KEY]: token,
        },
      });
      const data = response.data;
      const responseData = data.data;
      return responseData;
    } catch (error) {
      const response = error.response;
      console.log("user-actions === uploadFile == catch error = ", {
        response,
      });
      return response.data;
    }
  };
};
