// Core Imports
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Carousel from "react-native-snap-carousel";

// Custom Imports
import * as CONFIG from "../../../config";
import BodyText from "../../../components/BodyText";
import StepFooter from "../../../components/StepFooter";
import PickmeCreditCarouselItem from "../../../components/PickmeCreditCarouselItem";

const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i);
}
const FindRoommateStep5 = (props) => {
  const navigateToUserListScreen = () => {
    props.navigation.navigate({ name: "find_roommate_step2_screen" });
  };

  props.navigation.setOptions({
    headerRight: () => {
      return (
        <HeaderButtons>
          <Item
            title="skip"
            color={CONFIG.BLACK}
            onPress={navigateToUserListScreen}
          />
        </HeaderButtons>
      );
    },
  });

  return (
    <ScrollView contentContainerStyle={STYLES.bgWhite}>
      <View style={STYLES.main}>
        <BodyText style={STYLES.pagetitle}>Credit Score</BodyText>
        <View style={STYLES.progressBarCon}>
          <View style={STYLES.progressBarBg}>
            <View style={STYLES.progressBar}>
              <BodyText style={STYLES.progressBarText}>15%</BodyText>
            </View>
          </View>
          <BodyText style={STYLES.progressBarScoreText}>
            Your current credit score
          </BodyText>
        </View>
        <Carousel
          // ref={(c) => { this._carousel = c; }}
          data={DATA}
          renderItem={PickmeCreditCarouselItem}
          sliderWidth={300}
          itemWidth={270}
          layout={"default"}
        />
      </View>
      <StepFooter currentStep="5" totalSteps="5"></StepFooter>
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
    padding: 20,
  },
});

export default FindRoommateStep5;
