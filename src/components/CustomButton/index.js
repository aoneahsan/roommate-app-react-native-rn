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
    <View style={STYLES.wrapper}>
      <BaseTouchable
        style={{ ...STYLES.main }}
        opacity={props.touchableOpacity ? props.touchableOpacity : 0.1}
      >
        {/* onPress={props.onPress} */}
        <View style={{ ...STYLES.innerCon, ...props.style, ...btnStyles }}>
          <CustomText
            textalign={props.textalign ? props.textalign : "center"}
            fontfamily={props.fontfamily ? props.fontfamily : "medium"}
            fontsize={props.fontsize ? props.fontsize : CONFIG.BTN_TEXT_SIZE}
            style={{ ...STYLES.text, ...textStyles }}
          >
            {props.children}
          </CustomText>
        </View>
      </BaseTouchable>
    </View>
  );
};

const STYLES = StyleSheet.create({
  wrapper: {
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    borderRadius: 100,
    elevation: 6,
  },
  main: {
    flex: 1,
    shadowColor: CONFIG.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  innerCon: {
    paddingVertical: 16,
    borderRadius: 100,
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
