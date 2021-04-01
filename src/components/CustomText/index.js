// Core Imports
import React from "react";
import { Text } from "react-native";

// Custom Imports
import * as CONFIG from "./../../config";

const CustomText = (props) => {
  return (
    <Text
      style={{
        fontFamily:
          props.fontfamily == "light"
            ? CONFIG.FONT_LIGHT
            : props.fontfamily == "regular"
            ? CONFIG.FONT_REGULAR
            : props.fontfamily == "medium"
            ? CONFIG.FONT_MEDIUM
            : props.fontfamily == "simebold"
            ? CONFIG.FONT_SEMI_BOLD
            : props.fontfamily == "bold"
            ? CONFIG.FONT_BOLD
            : props.fontfamily == "extrabold"
            ? CONFIG.FONT_EXTRA_BOLD
            : CONFIG.FONT_REGULAR,
        fontSize: props.fontsize ? props.fontsize : CONFIG.BTN_TEXT_SIZE,
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

export default CustomText;
