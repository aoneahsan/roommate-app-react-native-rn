// Core Imports
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import AnimatedLoader from "react-native-animated-loader";

// Custom Imports
import Navigation from "./Navigation";

const Layout = () => {
  const isLoading = useSelector((state) => state.systemR.isLoading);

  return (
    <View style={STYLES.main}>
      {isLoading && (
        <View style={STYLES.loaderCon}>
          <AnimatedLoader
            visible={isLoading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("./../assets/loader-json/loader.json")}
            animationStyle={STYLES.lottie}
            speed={0.6}
          ></AnimatedLoader>
        </View>
      )}
      <Navigation />
    </View>
  );
};

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
    position: "relative",
  },
  loaderCon: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default Layout;
