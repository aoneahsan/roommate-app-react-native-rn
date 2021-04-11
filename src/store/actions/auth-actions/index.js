// Core Imports
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom Imports
import axios from "./../../../axios";
import * as CONFIG from "./../../../config";
import * as ACTION_TYPES from "./../../action-types";

export const authAction = (authData, isLoginMode) => {
  return async (dispatch) => {
    try {
      let AUTH_URL = "/login";
      if (!isLoginMode) {
        AUTH_URL = "/signup";
      }
      const response = await axios.post(AUTH_URL, authData);
      // console.log(response);
      const data = response.data;
      return data;
    } catch (error) {
      const response = error.response;
      console.log("auth-actions === authAction == catch error = ", {
        response,
      });
      return response.data;
    }
  };
};

export const verifyCode = (phone, verifyCode) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/verify-phone-code", {
        phone,
        verifyCode,
      });
      // console.log(response);
      const data = response.data;
      const result = await saveUserDataLocally(data);
      const responseData = data.data;
      await dispatch({
        type: ACTION_TYPES.SET_AUTH_DATA,
        payload: {
          authData: responseData,
        },
      });
      return data;
    } catch (error) {
      const response = error.response;
      console.log("auth-actions === verifyCode == catch error = ", {
        response,
      });
      return response.data;
    }
  };
};

export const resendVerificationCode = (phone) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/resend-verify-code", {
        phone,
      });
      // console.log(response);
      const data = response.data;
      return data;
    } catch (error) {
      const response = error.response;
      console.log("auth-actions === resendVerificationCode == catch error = ", {
        response,
      });
      return response.data;
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const result = await removeLocalUserAuthData();
      const response = await dispatch({
        type: ACTION_TYPES.LOGOUT,
      });
      return result;
    } catch (error) {
      const response = error.response;
      console.log("auth-actions === logout == catch error = ", {
        response,
      });
      return response.data;
    }
  };
};

export const autoLogin = () => {
  return async (dispatch) => {
    try {
      const authData = await getLocalUserAuthData();
      if (!authData) {
        return false;
      } else {
        await dispatch({
          type: ACTION_TYPES.SET_AUTH_DATA,
          payload: {
            authData: authData,
          },
        });
        return authData;
      }
    } catch (error) {
      const response = error.response;
      console.log("auth-actions === autoLogin == catch error = ", {
        response,
      });
      return response.data;
    }
  };
};

export const checkLoginStatus = () => {
  return async (dispatch, getStore) => {
    try {
      const store = getStore();
      const authToken = store.authR.token;
      const response = await axios.post(
        "/check-login-status",
        {},
        {
          headers: {
            [CONFIG.AXIOS_HEADER_AUTH_KEY]: authToken,
          },
        }
      );
      // console.log("auth-actions === checkLoginStatus == res = ", { response });
      const data = response.data;
      return data;
    } catch (error) {
      const response = error.response;
      // console.log("auth-actions === checkLoginStatus == catch error = ", {
      //   response,
      // });
      return response.data;
    }
  };
};

const saveUserDataLocally = async (authData) => {
  const result = await AsyncStorage.setItem(
    CONFIG.LOCAL_AUTH_KEY,
    JSON.stringify(authData)
  );
  return result;
};

const getLocalUserAuthData = async () => {
  const data = await AsyncStorage.getItem(CONFIG.LOCAL_AUTH_KEY);
  if (data != null) {
    return JSON.parse(data);
  } else {
    return false;
  }
};

const removeLocalUserAuthData = async () => {
  const dataExists = await getLocalUserAuthData();
  if (dataExists) {
    const result = await AsyncStorage.removeItem(CONFIG.LOCAL_AUTH_KEY);
    return result;
  } else {
    return true;
  }
};
