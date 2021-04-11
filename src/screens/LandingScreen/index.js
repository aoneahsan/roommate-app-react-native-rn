// Core Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { NavigationActions } from "react-navigation";

// Custom Imports
import * as CONFIG from "./../../config";
import LandingScreenBgImage from "./../../../assets/images/main-screen-bg.png";
import Logo from "./../../components/Logo";
import MainButton from "./../../components/MainButton";

const LandingScreen = (props) => {
  useEffect(() => {
    const props = props;
    // console.log("LandingScreen === componentDidMount == res = ", { props });
  }, []);

  const navigateToAuthHandler = () => {
    props.navigation.dispatch(
      NavigationActions.navigate({ routeName: "app_stack_components" })
    );
  };

  const navigateToProfileHandler = () => {
    props.navigation.dispatch(
      NavigationActions.navigate({ routeName: "app_stack_components" })
    );
  };

  return (
    <ScrollView contentContainerStyle={STYLES.bgWhite}>
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
                    onPress={navigateToAuthHandler}
                  >
                    Sign Up
                  </MainButton>
                </View>
                <View style={STYLES.btnCon}>
                  <MainButton
                    style={STYLES.btn}
                    onPress={navigateToAuthHandler}
                  >
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
  bgWhite: {
    backgroundColor: CONFIG.WHITE,
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
