// Core Imports
import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Carousel from "react-native-snap-carousel";
import ProgressCircle from "react-native-progress-circle";

// Custom Imports
import * as CONFIG from "../../../config";
import BodyText from "../../../components/BodyText";
import StepFooter from "../../../components/StepFooter";
import Card from "../../../components/Card";
import PickmeCreditCarouselItem from "../../../components/PickmeCreditCarouselItem";

const DEVICE_WIDTH = Dimensions.get("window").width;

const FindRoommateStep5 = (props) => {
  const navigateToUserListScreen = () => {
    props.navigation.navigate("users_list_stack_screens", {
      screen: "users_list_screen",
    });
  };
  const percentage = 30;
  const lineBarProgress = 15;

  useEffect(() => {
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
  }, []);

  const carouselData = [
    { id: 1, title: "Personal Info", percentage: "20", bgColor: "#5D00B5" },
    { id: 1, title: "Personal Info", percentage: "20", bgColor: "#5DB1D5" },
    { id: 1, title: "Personal Info", percentage: "20", bgColor: "#B1D005" },
    { id: 1, title: "Personal Info", percentage: "20", bgColor: "#a10Da5" },
  ];

  return (
    <ScrollView contentContainerStyle={STYLES.bgWhite}>
      <View style={STYLES.main}>
        <BodyText style={STYLES.pagetitle}>Credit Score</BodyText>
        <View style={STYLES.progressBarCon}>
          <Card style={STYLES.progressBarBg}>
            <View
              style={{
                ...STYLES.progressBar,
                ...{
                  width:
                    lineBarProgress < 11 ? 10 + "%" : lineBarProgress + "%",
                },
              }}
            >
              <BodyText
                style={{
                  ...STYLES.progressBarText,
                  fontSize: lineBarProgress < 11 ? 18 : 24,
                }}
              >
                {lineBarProgress}%
              </BodyText>
            </View>
          </Card>
          <BodyText style={STYLES.progressBarScoreText}>
            Your current credit score
          </BodyText>
        </View>
        <View style={STYLES.carouselCon}>
          {/* <PickmeCreditCarouselItem /> */}
          <Carousel
            data={carouselData}
            renderItem={PickmeCreditCarouselItem}
            sliderWidth={DEVICE_WIDTH}
            itemWidth={270}
            firstItem={1}
            layout={"default"}
            containerCustomStyle={STYLES.carousel}
          />
        </View>
        <View style={STYLES.detailsCon}>
          <View style={STYLES.details_leftside}>
            <BodyText style={STYLES.smallText}>
              Complete your verification, let more people trust you!
            </BodyText>
            <BodyText style={STYLES.smallText}>Let’s do it now!</BodyText>
            <BodyText style={STYLES.colorText}>30% of 100%</BodyText>
          </View>
          <View style={STYLES.details_rightside}>
            <BodyText style={STYLES.details_title}>Proportion</BodyText>
            <View style={STYLES.circleProgressCon}>
              <ProgressCircle
                percent={percentage}
                radius={50}
                borderWidth={8}
                color="#2E35E4"
                shadowColor="#eee"
                bgColor="#fff"
                containerStyle={{ transform: [{ rotate: "-90deg" }] }}
                outerCircleStyle={{ transform: [{ rotate: "90deg" }] }}
              >
                <BodyText style={{ fontSize: 18 }}>{"30%"}</BodyText>
              </ProgressCircle>
            </View>
          </View>
        </View>
      </View>
      <StepFooter currentStep="5" totalSteps="5" onPress={navigateToUserListScreen}></StepFooter>
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
  },
  pagetitle: {
    fontSize: 22,
    fontFamily: CONFIG.FONT_RUBIK_MEDIUM,
    color: CONFIG.PURPLE,
    paddingHorizontal: 20,
  },
  progressBarCon: {
    paddingHorizontal: 20,
  },
  progressBarBg: {
    height: 40,
  },
  progressBar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CONFIG.PRIMARY,
    borderRadius: 50,
    height: "100%",
  },
  progressBarText: {
    color: CONFIG.WHITE,
  },
  progressBarScoreText: {
    color: CONFIG.LIGHT_TEXT_COLOR,
    fontSize: 14,
    marginTop: 10,
    marginLeft: 10,
  },
  carouselCon: {
    marginTop: 10,
  },
  carousel: {},
  detailsCon: {
    borderTopLeftRadius: 50,
    borderWidth: 1,
    paddingTop: 40,
    backgroundColor: CONFIG.WHITE,
    paddingLeft: 20,
    flexDirection: "row",
    paddingBottom: 20,
    marginTop: -50,
    zIndex: -1,
    marginLeft: 2,
    borderColor: CONFIG.LIGHT_TEXT_COLOR,
  },
  details_leftside: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 20,
  },
  circleProgressCon: {},
  smallText: {
    marginBottom: 16,
  },
  colorText: {
    color: CONFIG.CHIP_TEXT,
    fontSize: 20,
  },
  details_rightside: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  details_title: {
    fontSize: 24,
    color: CONFIG.CHIP_TEXT,
    fontFamily: CONFIG.FONT_RUBIK_MEDIUM,
    marginBottom: 10,
  },
});

export default FindRoommateStep5;
