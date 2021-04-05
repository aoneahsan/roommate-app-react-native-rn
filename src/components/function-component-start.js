// Core Imports
import React from "react";
import { StyleSheet } from "react-native";

// Custom Imports
import * as CONFIG from "./../../config";
import BodyText from "./../BodyText";

const Divider = (props) => {
  return <BodyText style={STYLES.main}>working</BodyText>;
};

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default Divider;
