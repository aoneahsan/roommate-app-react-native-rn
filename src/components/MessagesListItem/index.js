// Core Imports
import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

// Custom Imports
import * as CONFIG from "../../config";
import BodyText from "../BodyText";
import Card from "../Card";

const MessagesListItem = (props) => {
  const itemData = props.item;
  return (
    <TouchableOpacity>
      <View style={{ ...STYLES.main, ...props.style }}>
        <Card style={{ ...STYLES.imageCard }}>
          <Image style={{ ...STYLES.image }} source={itemData.image} />
        </Card>
        <View style={{ ...STYLES.infoCon }}>
          <View style={{ ...STYLES.row }}>
            <BodyText style={{ ...STYLES.name }}>{itemData.name}</BodyText>
            <BodyText style={{ ...STYLES.time }}>{itemData.time}</BodyText>
          </View>
          <View style={{ ...STYLES.messageCon, ...{} }}>
            <BodyText numberOfLines={2} style={{ ...STYLES.message, ...{} }}>
              {itemData.message}
            </BodyText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const STYLES = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    width: "100%",
  },
  imageCard: {
    flex: 0.2,
    width: 70,
    height: 70,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  infoCon: {
    flex: 0.8,
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 8,
  },
  name: {
    fontSize: 20,
  },
  time: {
    fontSize: 12,
    color: CONFIG.LIGHT_TEXT_COLOR,
  },
  messageCon: {
    flex: 0.7,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  message: {
    color: CONFIG.LIGHT_TEXT_COLOR,
    // fontSize: 14,
    textAlign: "justify",
    paddingLeft: 10,
    paddingRight: 8,
    flex: 1,
    flexWrap: "wrap",
  },
});

export default MessagesListItem;
