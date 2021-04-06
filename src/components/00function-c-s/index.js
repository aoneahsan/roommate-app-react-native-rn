// Core Imports
import React from "react";
import { StyleSheet, View } from "react-native";

// Custom Imports
import * as CONFIG from "../../config";
import BodyText from "../BodyText";

const ImageCard = (props) => {
  return (
    <View style={STYLES.main}>
      <BodyText>working</BodyText>
    </View>
  );
};

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default ImageCard;
