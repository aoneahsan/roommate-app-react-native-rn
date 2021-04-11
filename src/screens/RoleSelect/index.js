// Core Imports
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Custom Imports
import * as CONFIG from "./../../config";
import TouchableCard from "./../../components/TouchableCard";
import Card from "./../../components/Card";
import BodyText from "./../../components/BodyText";

const RoleSelect = (props) => {
  const navigateToAddPlaceStackHandler = () => {
    props.navigation.navigate("add_place_stack_screens", {
      screen: "add_place_step1_screen",
    });
  };

  const navigateToFindRoommateStackHandler = () => {
    props.navigation.navigate("find_roommate_stack_screens", {
      screen: "find_roommate_step1_screen",
    });
  };

  return (
    <ScrollView contentContainerStyle={STYLES.bgWhite}>
      <View style={STYLES.main}>
        <View style={STYLES.headingCon}>
          <BodyText style={STYLES.heading}>I want to...</BodyText>
        </View>
        <View style={STYLES.optionsCon}>
          <TouchableCard
            style={{ ...STYLES.option, ...STYLES.bgPrimary }}
            onPress={navigateToAddPlaceStackHandler}
          >
            <Card style={STYLES.optionIconCon}>
              <Ionicons
                style={STYLES.optionIcon}
                size={26}
                name="checkmark"
                color={CONFIG.LIGHT_TEXT_COLOR}
              />
            </Card>
            <BodyText style={{ ...STYLES.optionText, ...STYLES.textWhite }}>
              Post a New Place
            </BodyText>
          </TouchableCard>
          <TouchableCard
            style={STYLES.option}
            onPress={navigateToFindRoommateStackHandler}
          >
            <Card style={STYLES.optionIconCon}>
              <Ionicons
                style={STYLES.optionIcon}
                size={26}
                name="checkmark"
                color={CONFIG.LIGHT_TEXT_COLOR}
              />
            </Card>
            <BodyText style={STYLES.optionText}>Find Roommates</BodyText>
          </TouchableCard>
        </View>
      </View>
    </ScrollView>
  );
};

const STYLES = StyleSheet.create({
  bgWhite: {
    backgroundColor: CONFIG.WHITE,
    flexGrow: 1,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headingCon: {
    flex: 0.1,
    height: 100,
    marginTop: 40,
  },
  heading: {
    fontSize: 30,
    fontFamily: CONFIG.FONT_RUBIK_SEMI_BOLD,
  },
  optionsCon: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    backgroundColor: "#D9DFFC",
    position: "relative",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
  },
  optionText: {
    fontSize: 18,
    fontFamily: CONFIG.FONT_RUBIK_MEDIUM,
  },
  optionIconCon: {
    position: "absolute",
    top: -18,
    left: "40%",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  optionIcon: {},
  bgPrimary: {
    backgroundColor: CONFIG.PRIMARY,
  },
  textWhite: {
    color: CONFIG.WHITE,
  },
});

export default RoleSelect;
