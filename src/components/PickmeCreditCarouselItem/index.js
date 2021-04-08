// Core Imports
import React from "react";
import { StyleSheet, View, Image } from "react-native";

// Custom Imports
import * as CONFIG from "../../config";
import BodyText from "../BodyText";
import PersonalInfo from "./../../../assets/images/icons/personal-info.png";

const PickmeCreditCarouselItem = (props) => {
  return (
    <View style={STYLES.main}>
      <Image source={PersonalInfo} />
      <BodyText>Personal Info</BodyText>
      <BodyText>20%</BodyText>
    </View>
  );
};

const STYLES = StyleSheet.create({
  main: {},
});

export default PickmeCreditCarouselItem;
