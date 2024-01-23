// Core Imports
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Custom Imports
import * as CONFIG from "../../config";
import Card from "../Card";
import Input from "../Input";

const MessagesPageHeader = (props) => {
  return (
    <View style={{ ...STYLES.header }}>
      <View style={{ ...STYLES.inputCon }}>
        <Card style={{ ...STYLES.inputCard, ...STYLES.inputBorderRadius }}>
          <Input
            style={{ ...STYLES.input }}
            hidelabel={true}
            hidevalidation
            inputGroupStyle={{
              ...STYLES.inputGroupStyle,
              ...STYLES.inputBorderRadius,
            }}
            inputStyle={{ fontSize: 24 }}
          />
        </Card>
      </View>
      <View style={{ ...STYLES.searchWrapper }}>
        <Card style={{ ...STYLES.searchCard }}>
          <TouchableOpacity style={{ ...STYLES.searchCon }}>
            <Ionicons
              name="search"
              style={{ ...STYLES.searchIcon }}
              size={28}
            />
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  inputCon: {
    flex: 0.78,
  },
  inputCard: {
    height: "auto",
  },
  input: {},
  inputGroupStyle: {
    paddingVertical: 12,
    borderColor: CONFIG.WHITE,
  },
  inputBorderRadius: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  searchWrapper: {
    flex: 0.2,
    alignItems: "center",
  },
  searchCard: {
    justifyContent: "center",
    alignItems: "center",
    height: 66,
    width: 66,
    borderRadius: 33,
  },
  searchCon: {},
  searchIcon: {},
});

export default MessagesPageHeader;
