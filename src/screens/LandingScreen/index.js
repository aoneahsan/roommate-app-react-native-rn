// Core Imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// Custom Imports
import * as CONFIG from "./../../config";
import * as ACTIONS from "./../../store/actions";
import LandingScreenBgImage from "./../../../assets/images/main-screen-bg.png";
import Logo from "./../../components/Logo";
import MainButton from "./../../components/MainButton";

const LandingScreen = (props) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((store) => store.authR.isLoggedIn);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      // logout(); // just for testing/development purpose, remove before making APK
      (async function () {
        dispatch(ACTIONS.setIsLoadingFalse());
        if (isLoggedIn) {
          navigateToUsersListScreen();
        } else {
          checkAutoLogin();
        }
      })();

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const checkAutoLogin = async () => {
    dispatch(ACTIONS.setIsLoadingTrue());
    const result = await dispatch(ACTIONS.autoLogin());
    if (!!result) {
      dispatch(ACTIONS.setIsLoadingFalse());
      navigateToUsersListScreen();
      // checkLoginStatusAndNavigate();
    } else {
      dispatch(ACTIONS.setIsLoadingFalse());
    }
  };

  const checkLoginStatusAndNavigate = async () => {
    if (isLoggedIn) {
      const result = await dispatch(ACTIONS.checkLoginStatus());
      console.log("LandingScreen === checkLoginStatusAndNavigate == res = ", {
        result,
      });
      if (!result.success) {
        navigateToUsersListScreen();
      }
    }
  };

  const logout = async () => {
    const result = await dispatch(ACTIONS.logout());
    console.log("LandingScreen === logout == res = ", {
      result,
    });
  };

  const navigateToAuthScreen = (mode = "login") => {
    props.navigation.navigate("auth_stack_screens", {
      screen: "auth_screen",
    });
  };

  const navigateToUsersListScreen = () => {
    props.navigation.navigate("users_list_stack_screens", {
      screen: "users_list_tab_screen",
    });
  };

  return (
    <ScrollView contentContainerStyle={STYLES.bgPink}>
      <View style={STYLES.main}>
        <ImageBackground source={LandingScreenBgImage} style={STYLES.mainBgCon}>
          <View style={STYLES.contentCon}>
            <View style={STYLES.contentInnerCon}>
              <Logo />
            </View>
            <View style={STYLES.contentInnerCon}>
              <View style={STYLES.btnsCon}>
                <View style={STYLES.btnCon}>
                  <MainButton
                    style={STYLES.btn}
                    color="white"
                    onPress={navigateToAuthScreen}
                  >
                    Sign Up
                  </MainButton>
                </View>
                <View style={STYLES.btnCon}>
                  <MainButton style={STYLES.btn} onPress={navigateToAuthScreen}>
                    Log In
                  </MainButton>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const STYLES = StyleSheet.create({
  bgPink: {
    backgroundColor: CONFIG.LANDING_SCREEN_BG_COLOR,
    flexGrow: 1,
  },
  main: {
    flex: 1,
  },
  mainBgCon: {
    width: "100%",
    height: "100%",
  },
  contentCon: {
    flex: 1,
  },
  contentInnerCon: {
    flex: 1,
    justifyContent: "center",
  },
  btnsCon: {
    alignItems: "center",
  },
  btnCon: {
    width: "85%",
    marginVertical: 8,
  },
  btn: {},
});

export default LandingScreen;
