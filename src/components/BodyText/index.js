// Core Imports
import React from "react";
import { Text } from "react-native";

// Custom Imports
import * as CONFIG from "./../../config";

const BodyText = (props) => {
  return (
    <Text
      {...props}
      style={{
        fontFamily:
          props.fontfamily == "light"
            ? CONFIG.FONT_RUBIK_LIGHT
            : props.fontfamily == "regular"
            ? CONFIG.FONT_RUBIK_REGULAR
            : props.fontfamily == "medium"
            ? CONFIG.FONT_RUBIK_MEDIUM
            : props.fontfamily == "simebold"
            ? CONFIG.FONT_RUBIK_SEMI_BOLD
            : props.fontfamily == "bold"
            ? CONFIG.FONT_RUBIK_BOLD
            : props.fontfamily == "extrabold"
            ? CONFIG.FONT_RUBIK_EXTRA_BOLD
            : CONFIG.FONT_RUBIK_REGULAR,
        fontSize: props.fontsize ? props.fontsize : CONFIG.TEXT_SIZE,
        color: props.color ? props.color : CONFIG.TEXT_COLOR,
        textAlign:
          props.textalign == "center"
            ? "center"
            : props.textalign == "right"
            ? "right"
            : props.textalign == "justify"
            ? "justify"
            : "left",
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};
// Font weight update not available as using custom font

// fontWeight:
//           props.fontWeight == "light"
//             ? CONFIG.FONT_WEIGHT_LIGHT
//             : props.fontWeight == "regular"
//             ? CONFIG.FONT_WEIGHT_REGULAR
//             : props.fontWeight == "medium"
//             ? CONFIG.FONT_WEIGHT_MEDIUM
//             : props.fontWeight == "simebold"
//             ? CONFIG.FONT_WEIGHT_SIME_BOLD
//             : props.fontWeight == "bold"
//             ? CONFIG.FONT_WEIGHT_BOLD
//             : props.fontWeight == "extrabold"
//             ? CONFIG.FONT_WEIGHT_EXTRA_BOLD
//             : CONFIG.FONT_WEIGHT_REGULAR,

export default BodyText;
