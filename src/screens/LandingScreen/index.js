// Core Imports
import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";

// Custom Imports
import LandingScreenBgImage from "./../../../assets/images/main-screen-bg.png";
import Logo from "./../../components/Logo";
import CustomButton from "./../../components/CustomButton";

class LandingScreen extends React.Component {
  render() {
    return (
      <View style={STYLES.main}>
        <ImageBackground source={LandingScreenBgImage} style={STYLES.mainBgCon}>
          <View style={STYLES.contentCon}>
            <View style={STYLES.contentInnerCon}>
              <Logo />
            </View>
            <View style={STYLES.contentInnerCon}>
              <View style={STYLES.btnsCon}>
                <View style={STYLES.btnCon}>
                  <CustomButton
                    style={STYLES.btn}
                    color="white"
                    onPress={() => alert("Sign Up")}
                  >
                    Sign Up
                  </CustomButton>
                </View>
                <View style={STYLES.btnCon}>
                  <CustomButton
                    style={STYLES.btn}
                    onPress={() => alert("Log In")}
                  >
                    Log In
                  </CustomButton>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const STYLES = StyleSheet.create({
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
