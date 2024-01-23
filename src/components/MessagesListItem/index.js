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
        <Card style={{ ...STYLES.imageCard, ...props.cardStyle }}>
          {itemData.alerts && itemData.alerts > 1 && (
            <BodyText style={{ ...STYLES.alerts }}>{itemData.alerts}</BodyText>
          )}
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
    height: 54,
    maxWidth: 58,
    marginLeft: 4,
    position: "relative",
  },
  alerts: {
    position: "absolute",
    top: -6,
    right: -6,
    fontSize: 12,
    backgroundColor: CONFIG.RED,
    color: CONFIG.WHITE,
    fontFamily: CONFIG.FONT_RUBIK_MEDIUM,
    borderRadius: 12,
    width: 20,
    height: 20,
    paddingTop: 3,
    textAlign: "center",
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
