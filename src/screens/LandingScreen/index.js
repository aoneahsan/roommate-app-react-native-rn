// Core Imports
import React from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";

import { NavigationActions } from "react-navigation";
// Custom Imports
import * as CONFIG from "./../../config";
import LandingScreenBgImage from "./../../../assets/images/main-screen-bg.png";
import Logo from "./../../components/Logo";
import MainButton from "./../../components/MainButton";

class LandingScreen extends React.Component {
  componentDidMount() {
    const props = this.props;
    // console.log("LandingScreen === componentDidMount == res = ", { props });
  }

  navigateToAuthHandler = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({ routeName: "auth_stack_components" })
    );
  };

  navigateToProfileHandler = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({ routeName: "profile_stack_components" })
    );
  };

  render() {
    return (
      <ScrollView contentContainerStyle={STYLES.bgWhite}>
        <View style={STYLES.main}>
          <ImageBackground
            source={LandingScreenBgImage}
            style={STYLES.mainBgCon}
          >
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
                      onPress={this.navigateToAuthHandler}
                    >
                      Sign Up
                    </MainButton>
                  </View>
                  <View style={STYLES.btnCon}>
                    <MainButton
                      style={STYLES.btn}
                      onPress={this.navigateToProfileHandler}
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
  }
}

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
