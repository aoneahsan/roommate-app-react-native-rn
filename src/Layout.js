// Core Imports
import React from "react";
import { StyleSheet, View } from "react-native";

// Custom Imports
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <View style={STYLES.main}>
      <Navigation />
    </View>
  );
};

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default Layout;
