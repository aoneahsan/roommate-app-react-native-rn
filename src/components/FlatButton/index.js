// Core Imports
import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

// Custom Imports
import BodyText from "../BodyText";
import * as CONFIG from "../../config";

const FlatButton = (props) => {
  let BaseTouchable = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    BaseTouchable = TouchableNativeFeedback;
  }

  let textStyles = STYLES.blackText;
  if (props.color == "black") {
    textStyles = STYLES.blackText;
  } else if (props.color == "primary") {
    textStyles = STYLES.primaryText;
  } else {
    textStyles = STYLES.blackText;
  }
  let disabledText = {};
  if (props.disabled) {
    disabledText = STYLES.disabledText;
  }
  let underlineStyles = {};
  if (props.underlined) {
    underlineStyles = STYLES.underlined;
  }

  return (
    <BaseTouchable
      style={{ ...STYLES.main }}
      opacity={props.touchableOpacity ? props.touchableOpacity : 0.1}
      onPress={
        props.onPress ? props.onPress : () => alert("Pass a onPress function.")
      }
    >
      <View style={STYLES.wrapper}>
        <BodyText
          textalign={props.textalign ? props.textalign : "left"}
          fontfamily={props.fontfamily ? props.fontfamily : "medium"}
          fontsize={props.fontsize ? props.fontsize : CONFIG.BTN_TEXT_SIZE}
          style={{
            ...STYLES.text,
            ...textStyles,
            ...underlineStyles,
          }}
        >
          {props.children}
        </BodyText>
      </View>
    </BaseTouchable>
  );
};

const STYLES = StyleSheet.create({
  main: {
    // justifyContent: "flex-start"
  },
  wrapper: {},
  blackText: {
    color: CONFIG.TEXT_COLOR,
  },
  primaryText: {
    color: CONFIG.PRIMARY,
  },
  disabledText: {
    color: CONFIG.GREY,
  },
  text: {
    letterSpacing: 0.4,
    fontFamily: CONFIG.FONT_BOLD,
    fontSize: 16,
  },
  underlined: {
    textDecorationLine: "underline",

    // borderBottomWidth: 1,
    // borderBottomColor: CONFIG.BLACK,
  },
});

export default FlatButton;
