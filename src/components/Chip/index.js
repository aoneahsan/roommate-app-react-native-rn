// Core Imports
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

// Custom Imports
import * as CONFIG from "../../config";
import BodyText from "../BodyText";

const Chip = (props) => {
  return (
    <TouchableOpacity
      onPress={
        props.onPress ? props.onPress : () => alert("pass 'onPress' props")
      }
    >
      <View
        style={{
          ...STYLES.main,
          ...{
            backgroundColor: props.checked ? CONFIG.CHIP_BG : CONFIG.WHITE,
            marginRight: 4,
            marginBottom: 6,
          },
          ...props.style,
        }}
      >
        <BodyText style={{ ...STYLES.text, ...props.textStyle }}>
          {props.children}
        </BodyText>
      </View>
    </TouchableOpacity>
  );
};

const STYLES = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderColor: CONFIG.BLACK,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  text: {
    fontSize: 14,
  },
});

export default Chip;
