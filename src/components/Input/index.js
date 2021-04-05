// Core Imports
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

// Custom Imports
import * as CONFIG from "../../config";
import BodyText from "./../BodyText";

const Input = (props) => {
  return (
    <View style={STYLES.main}>
      <BodyText style={STYLES.label}>Country/Region</BodyText>
      <TextInput
        style={STYLES.input}
        onBlur={props.onBlur}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
      ></TextInput>
    </View>
  );
};

const STYLES = StyleSheet.create({
  main: {
    borderColor: CONFIG.LIGHT_TEXT_COLOR,
    borderRadius: 20,
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  label: {
    color: CONFIG.LIGHT_TEXT_COLOR,
    fontSize: CONFIG.INPUT_LABEL_SIZE,
  },
  input: {
    fontSize: CONFIG.INPUT_TEXT_SIZE,
  },
});

export default Input;
