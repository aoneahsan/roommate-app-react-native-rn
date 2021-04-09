// Core Imports
import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

// Custom Imports
import * as CONFIG from "../../config";
import BodyText from "../BodyText";
import Card from "../Card";
import ProgressBar from "../ProgressBar";

const UserListItem = (props) => {
  const itemData = props.item;
  const progressBarTopText = "PikyMe Credit";
  return (
    <View style={{ ...STYLES.main }}>
      <Card
        style={{
          ...STYLES.card,
          ...{
            backgroundColor: itemData.bgColor ? itemData.bgColor : CONFIG.WHITE,
          },
        }}
      >
        <View
          style={{
            ...STYLES.profileImageCon,
            ...{
              backgroundColor: itemData.imageBgColor
                ? itemData.imageBgColor
                : CONFIG.PRIMARY,
            },
          }}
        >
          <ImageBackground
            style={{ ...STYLES.profileImage }}
            source={itemData.image}
          >
            <View
              style={{
                ...STYLES.profileDetails,
                ...{
                  backgroundColor: props.infoBgColor
                    ? props.infoBgColor
                    : "rgba(255,255,255, .2)",
                },
              }}
            >
              <BodyText
                style={{ ...STYLES.profileDetailsText, ...{ width: "70%" } }}
              >
                {itemData.info.name}
              </BodyText>
              <BodyText
                style={{ ...STYLES.profileDetailsText, ...{ width: "84%" } }}
              >
                {itemData.info.gender}
              </BodyText>
              <BodyText
                style={{ ...STYLES.profileDetailsText, ...{ width: "90%" } }}
              >
                {itemData.info.occupation}
              </BodyText>
              <BodyText
                style={{ ...STYLES.profileDetailsText, ...{ width: "97%" } }}
              >
                {itemData.info.budget.min}-{itemData.info.budget.max}
              </BodyText>
            </View>
            <View
              style={{
                ...STYLES.badgeCon,
                ...{
                  backgroundColor: itemData.badgeBgColor
                    ? itemData.badgeBgColor
                    : CONFIG.BADGE_BG,
                },
              }}
            >
              <BodyText
                style={{
                  ...STYLES.badgeText,
                  ...{
                    color: itemData.badgeTextColor
                      ? itemData.badgeTextColor
                      : CONFIG.WHITE,
                  },
                }}
              >
                {itemData.badgetext}
              </BodyText>
            </View>
          </ImageBackground>
        </View>
        <View style={STYLES.progressCon}>
          <ProgressBar
            style={STYLES.progress}
            topText={progressBarTopText}
            progress={itemData.progress}
            hideBottomText
          />
        </View>
      </Card>
    </View>
  );
};

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: "90%",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profileImageCon: {
    flex: 0.82,
    justifyContent: "flex-end",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profileImage: {
    flex: 0.9,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profileDetails: {
    width: 140,
    height: 140,
    borderTopRightRadius: 140,
    paddingLeft: 7,
    paddingTop: 20,
    justifyContent: "center",
  },
  profileDetailsText: {
    marginBottom: 2,
  },
  badgeCon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -42,
    marginRight: 20,
  },
  badgeText: {
    fontSize: 20,
    fontFamily: CONFIG.FONT_RUBIK_BOLD,
  },
  progressCon: {
    flex: 0.18,
    justifyContent: "center",
    // paddingBottom
  },
  progress: {},
});

export default UserListItem;
