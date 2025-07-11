// Core Imports
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AppLoading from "expo-app-loading";
import * as FONT from "expo-font";
import { Provider } from "react-redux";

// Custom Imports
import Layout from "./src/Layout";
import AppStore from "./src/store";

// Global Constants
const FONTS_LOADER = () => {
  return FONT.loadAsync({
    // Rubik Font
    // "Rubik-Light": require("./assets/fonts/Rubik/Rubik-Light.ttf"),
    "Rubik-Regular": require("./assets/fonts/Rubik/Rubik-Regular.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("./assets/fonts/Rubik/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("./assets/fonts/Rubik/Rubik-ExtraBold.ttf"),
    // "Rubik-Black": require("./assets/fonts/Rubik/Rubik-Black.ttf"),

    // Roboto Font
    // "Roboto-Light": require("./assets/fonts/Roboto/Roboto-Light.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto/Roboto-Black.ttf"),

    // Hanson Font
    // "Hanson-Light": require("./assets/fonts/Hanson/Hanson-Light.ttf"),
    "Hanson-Bold": require("./assets/fonts/Hanson/Hanson-Bold.ttf"),

    // Gilroy Font
    // "Gilroy-Light": require("./assets/fonts/Gilroy/Gilroy-Light.ttf"),
    "Gilroy-Regular": require("./assets/fonts/Gilroy/Gilroy-Regular.ttf"),
    "Gilroy-Medium": require("./assets/fonts/Gilroy/Gilroy-Medium.ttf"),
    "Gilroy-Bold": require("./assets/fonts/Gilroy/Gilroy-Bold.ttf"),
    "Gilroy-ExtraBold": require("./assets/fonts/Gilroy/Gilroy-ExtraBold.ttf"),

    // SFProText Font
    // "SFProText-Light": require("./assets/fonts/SFProText/SFProText-Light.ttf"),
    "SFProText-Regular": require("./assets/fonts/SFProText/SFProText-Regular.ttf"),
    "SFProText-Medium": require("./assets/fonts/SFProText/SFProText-Medium.ttf"),
    "SFProText-SemiBold": require("./assets/fonts/SFProText/SFProText-SemiBold.ttf"),
    "SFProText-Black": require("./assets/fonts/SFProText/SFProText-Black.ttf"),
  });
};

export default function App() {
  const [loadingData, setLoadingData] = useState(true);

  if (loadingData) {
    return (
      <AppLoading
        startAsync={FONTS_LOADER}
        onFinish={() => {
          console.log("FONTS loaded!");
          setLoadingData(false);
        }}
        onError={() => {
          console.log("ERROR OCCURED WHILE LOADING FONTS");
        }}
      />
    );
  }
  return (
    <Provider store={AppStore}>
      <View style={styles.container}>
        <Layout />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
