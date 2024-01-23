// Core Imports
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

// Custom Imports
import * as CONFIG from "../../config";
import BodyText from "../BodyText";
import Chip from "../Chip";
import Card from "../Card";

const SelectOptionsCard = (props) => {
  return (
    <View style={{ ...STYLES.main, ...props.style }}>
      <Image source={props.icon} style={STYLES.icon} />
      <View
        style={{
          ...STYLES.header,
          ...{
            backgroundColor: props.chipbgcolor
              ? props.chipbgcolor
              : "rgba(93, 177, 213,.4)",
          },
        }}
      >
        <View
          style={{
            ...STYLES.labelCon,
            ...{
              backgroundColor: props.labelbgcolor
                ? props.labelbgcolor
                : "#5DB1D5",
            },
          }}
        >
          <BodyText
            style={{
              ...STYLES.label,
            }}
          >
            {props.label}
          </BodyText>
        </View>
        <TouchableOpacity
          style={{ ...STYLES.selectTextWrapper }}
          onPress={
            props.onPress ? props.onPress : () => alert("pass 'onPress' props")
          }
        >
          <View style={{ ...STYLES.selectTextCon }}>
            <BodyText style={STYLES.selectText}>Select</BodyText>
            <Ionicons
              style={STYLES.selectIcon}
              name="chevron-forward"
              color={CONFIG.LIGHT_TEXT_COLOR}
              size={20}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={STYLES.body}>
        <Card style={STYLES.bodyCard}>
          {props.chips.map((item, index) => {
            if (item.checked) {
              return (
                <Chip
                  key={index}
                  checked={item.checked}
                  style={{
                    ...STYLES.chip,
                    backgroundColor: props.chipbgcolor
                      ? props.chipbgcolor
                      : "rgba(93, 177, 213,.4)",
                    borderColor: props.chipbgcolor
                      ? props.chipbgcolor
                      : "rgba(93, 177, 213,.4)",
                  }}
                  textStyle={{
                    color: props.chiptextcolor
                      ? props.chiptextcolor
                      : CONFIG.CHIP_TEXT,
                  }}
                >
                  {item.value}
                </Chip>
              );
            }
          })}
        </Card>
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  main: {
    // flex: 1,
    position: "relative",
  },
  icon: {
    position: "absolute",
    zIndex: 12,
    top: -10,
    left: -10,
    resizeMode: "contain",
  },
  header: {
    // flexWrap: "wrap"
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 40,
    marginBottom: 10,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  labelCon: {
    flex: 0.5,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontFamily: CONFIG.FONT_RUBIK_MEDIUM,
    color: CONFIG.WHITE,
  },
  selectTextWrapper: {
    flex: 0.5,
  },
  selectTextCon: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingRight: 20,
    alignItems: "center",
  },
  selectText: {
    fontFamily: CONFIG.FONT_RUBIK_REGULAR,
    fontSize: 16,
    color: CONFIG.CHIP_TEXT,
  },
  selectIcon: {
    color: CONFIG.LIGHT_TEXT_COLOR,
  },
  body: {},
  bodyCard: {
    paddingHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 6,
    height: "auto",
    minHeight: 70,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {},
});

export default SelectOptionsCard;
