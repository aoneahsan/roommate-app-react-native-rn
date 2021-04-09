// Core Imports
import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Custom Imports
import * as CONFIG from "../../config";
import BodyText from "../BodyText";
// Images
import MenuIcon from "./../../../assets/images/icons/menu.png";

const UsersListPageHeader = (props) => {
  const menuClickHandler = () => {
    if (props.onMenuClick) {
      props.onMenuClick();
    } else {
      alert("pass 'onMenuClick' props");
    }
  };

  const titleClickHandler = () => {
    if (props.onTitleClick) {
      props.onTitleClick();
    } else {
      alert("pass 'onTitleClick' props");
    }
  };

  const filterClickHandler = () => {
    if (props.onFilterClick) {
      props.onFilterClick();
    } else {
      alert("pass 'onFilterClick' props");
    }
  };
  return (
    <View style={STYLES.pageHeader}>
      <TouchableOpacity style={STYLES.menuiconCon} onPress={menuClickHandler}>
        <Image source={MenuIcon} style={STYLES.menuicon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={STYLES.pageHeaderTitleWrapper}
        onPress={titleClickHandler}
      >
        <View style={STYLES.pageHeaderTitleCon}>
          <BodyText style={STYLES.pageHeaderTitle}>Location</BodyText>
          <Ionicons
            style={STYLES.pageHeaderTitleIcon}
            name="chevron-down"
            size={24}
            color={CONFIG.LIGHT_TEXT_COLOR}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={STYLES.pageHeaderRightsideWrapper}
        onPress={filterClickHandler}
      >
        <View style={STYLES.pageHeaderRightsideCon}>
          <BodyText style={STYLES.pageHeaderRightsideText}>Filter</BodyText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const STYLES = StyleSheet.create({
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 0,
  },
  menuiconCon: {
    marginLeft: 10,
  },
  menuicon: {},
  pageHeaderTitleWrapper: {},
  pageHeaderTitleCon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pageHeaderTitle: {
    fontFamily: CONFIG.FONT_RUBIK_MEDIUM,
    fontSize: 18,
  },
  pageHeaderTitleIcon: {},
  pageHeaderRightsideWrapper: {},
  pageHeaderRightsideCon: {
    backgroundColor: "#E8E8E8",
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 10,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  pageHeaderRightsideText: {
    fontFamily: CONFIG.FONT_RUBIK_MEDIUM,
    fontSize: 16,
  },
});

export default UsersListPageHeader;
