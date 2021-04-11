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
      throw error;
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
      throw error;
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const result = await removeLocalUserAuthData();
      await dispatch({
        type: ACTION_TYPES.LOGOUT,
      });
    } catch (error) {
      throw error;
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
    return null;
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
