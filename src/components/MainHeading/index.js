// Core Imports
import React from "react";
import { StyleSheet } from "react-native";

// Custom Imports
import * as CONFIG from "../../config";
import CustomText from "../CustomText";

const MainHeading = (props) => {
  return (
    <CustomText
      style={{ ...STYLES.heading, ...props.style }}
      fontfamily={props.fontfamily ? props.fontfamily : "medium"}
      fontsize={props.fontsize ? props.fontsize : CONFIG.HEADING_SIZE}
      color={props.color}
      textalign={props.textalign}
    >
      {props.children}
    </CustomText>
  );
};

const STYLES = StyleSheet.create({
  heading: {},
});

export default MainHeading;
