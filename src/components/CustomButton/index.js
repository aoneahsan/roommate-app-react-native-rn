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
import CustomText from "./../CustomText";
import * as CONFIG from "./../../config";

const CustomButton = (props) => {
  let BaseTouchable = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    BaseTouchable = TouchableNativeFeedback;
  }

  let btnStyles = STYLES.whiteBtn;
  let textStyles = STYLES.whiteBtnText;
  if (props.color == "white") {
    btnStyles = STYLES.whiteBtn;
    textStyles = STYLES.whiteBtnText;
  } else if (props.color == "primary") {
    btnStyles = STYLES.primaryBtn;
    textStyles = STYLES.primaryBtnText;
  }

  return (
    <BaseTouchable
      style={{ ...STYLES.main }}
      opacity={props.touchableOpacity ? props.touchableOpacity : .1}
      onPress={props.onPress}
    >
      <View style={{ ...STYLES.innerCon, ...props.style, ...btnStyles }}>
        <CustomText
          textalign="center"
          fontfamily="medium"
          fontsize={CONFIG.BTN_TEXT_SIZE}
          style={{ ...STYLES.text, ...textStyles }}
        >
          {props.children}
        </CustomText>
      </View>
    </BaseTouchable>
  );
};

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
    borderRadius: 100,
    overflow: "hidden"
  },
  innerCon: {
    paddingVertical: 16,
    borderRadius: 100,
    overflow: "hidden"
  },
  whiteBtn: {
    backgroundColor: CONFIG.WHITE,
  },
  whiteBtnText: {
    color: CONFIG.TEXT_COLOR,
  },
  primaryBtn: {
    backgroundColor: CONFIG.PRIMARY,
  },
  primaryBtnText: {
    color: CONFIG.WHITE,
  },
  text: {
    textTransform: "capitalize",
    letterSpacing: 0.4,
  },
});

export default CustomButton;
