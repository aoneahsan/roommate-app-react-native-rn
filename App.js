// Core Imports
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import * as FONT from "expo-font";

// Custom Imports
import Layout from "./src/Layout";

// Global Constants
const FONTS_LOADER = () => {
  return FONT.loadAsync({
    "Rubik-Light": require("./assets/fonts/Rubik-Light.ttf"),
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("./assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("./assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Black": require("./assets/fonts/Rubik-Black.ttf"),
  });
};

export default function App() {
  const [loadingData, setLoadingData] = useState(true);

  if (loadingData) {
    return (
      <AppLoading
        startAsync={FONTS_LOADER}
        onFinsh={() => {
          setLoadingData(false);
        }}
        onError={() => {
          console.log("ERROR OCCURED WHILE LOADING FONTS");
        }}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Layout />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
