// Core Imports
import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

// Custom Imports
import * as CONFIG from "../../config";
import BodyText from "../BodyText";

const UserInfoRow = (props) => {
  return (
    <View style={STYLES.userinfo_row}>
      <View style={STYLES.userinfo_key}>
        <BodyText style={{ ...STYLES.userinfo_keyText, ...props.labelstyles }}>
          {props.label}
        </BodyText>
      </View>
      <View style={STYLES.userinfo_value}>
        {props.listitems && (
          <Picker
            selectedValue={
              props.selectedValue
                ? props.selectedValue
                : props.listitems
                ? props.listitems[0].value
                : ""
            }
            style={STYLES.userinfo_valueSelect}
            onValueChange={props.onValueChange}
            itemStyle={STYLES.userinfo_valueSelectText}
          >
            {props.listitems
              ? props.listitems.map((item, index) => {
                  return (
                    <Picker.Item
                      label={item.label ? item.label : item.value}
                      value={item.value}
                    />
                  );
                })
              : null}
          </Picker>
        )}
        {!props.hideicon && <Ionicons
          name="chevron-forward"
          style={STYLES.userinfo_valueSelectIcon}
        />}
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  userinfo_row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
    paddingBottom: 4,
    marginBottom: 12,
  },
  userinfo_key: {
    flex: 1,
  },
  userinfo_keyText: {
    color: CONFIG.LIGHT_TEXT_COLOR,
    fontSize: 18,
  },
  userinfo_value: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  userinfo_valueSelect: {
    height: 20,
    width: "86%",
    position: "relative",
    fontFamily: CONFIG.FONT_RUBIK_BOLD,
    backgroundColor: CONFIG.WHITE,
  },
  userinfo_valueSelectIcon: {
    fontSize: 18,
    position: "absolute",
    color: CONFIG.LIGHT_TEXT_COLOR,
  },
  userinfo_valueSelectText: {},
});

export default UserInfoRow;
