// Core Imports
import React from "react";
import { Image, View, StyleSheet } from "react-native";

// Custom Imports
import LogoImage from "./../../../assets/images/pikyme-logo.png";

const Logo = (props) => {
  return (
    <View style={{ ...STYLES.logoCon, ...props.logoConStyle }}>
      <Image
        source={LogoImage}
        style={{ ...STYLES.logo, ...props.logoStyle }}
      />
    </View>
  );
};

const STYLES = StyleSheet.create({
  logoCon: {
    width: "100%",
    height: 100,
    alignItems: "center",
  },
  logo: {
    height: "100%",
    resizeMode: "contain",
  },
});

export default Logo;
