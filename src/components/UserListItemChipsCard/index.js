// Core Imports
import React from "react";
import { StyleSheet, View, Image } from "react-native";

// Custom Imports
import * as CONFIG from "../../config";
import BodyText from "../BodyText";
import Card from "../Card";
import Chip from "../Chip";

const UserListItemChipsCard = (props) => {
  const data = props.data;
  const image = data.image;
  const bgColor = data.bgColor;
  const items = data.data;
  const chipBg = data.chipBg ? data.chipBg : CONFIG.CHIP_BG;
  return (
    <View style={{ ...STYLES.main, ...props.style }}>
      <Card style={{ ...STYLES.card, ...STYLES.topRadius }}>
        <View
          style={{
            ...STYLES.imageCon,
            ...{ backgroundColor: bgColor },
            ...STYLES.topRadius,
          }}
        >
          <Image style={{ ...STYLES.image }} source={image}></Image>
        </View>
        <View style={{ ...STYLES.content, ...STYLES.row }}>
          {items &&
            items.map((item, index) => {
              // console.log("UserListItemChipsCard === map == res = ", {
              //   item,
              //   index,
              // });
              return (
                <Chip
                  style={{ ...STYLES.chip, ...{ backgroundColor: chipBg } }}
                  key={index}
                  checked
                  textStyle={STYLES.chipText}
                >
                  {item.value}
                </Chip>
              );
            })}
        </View>
      </Card>
    </View>
  );
};

const STYLES = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  card: {
    height: "auto",
    width: "100%",
  },
  topRadius: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  imageCon: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    paddingTop: 10,
    marginBottom: 20,
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  content: {},
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  chip: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginRight: 2,
    paddingHorizontal: 7,
  },
  chipText: { fontSize: 12 },
});

export default UserListItemChipsCard;
