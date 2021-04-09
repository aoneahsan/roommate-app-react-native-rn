// Core Imports
import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Custom Imports
import * as CONFIG from "../../config";
import BodyText from "../../components/BodyText";
import Card from "../../components/Card";
import Input from "../../components/Input";
import MessagesListItem from "../../components/MessagesListItem";

// Imgaes
import Avatar from "./../../../assets/images/avatar.png";

const Messages = (props) => {
  const listData = [
    {
      id: "1",
      image: Avatar,
      name: "Ann",
      message:
        "it’s nice meeting you.you are awesome you are... you. you are awesome you are...",
      time: "Yesterday,08:30pm",
    },
    {
      id: "2",
      image: Avatar,
      name: "Nancy",
      message: "it’s nice meeting you.you are awesome you are...",
      time: "Yesterday,08:30pm",
    },
    {
      id: "3",
      image: Avatar,
      name: "Luna",
      message: "Hi Jack",
      time: "1 day ago",
    },
    {
      id: "4",
      image: Avatar,
      name: "Ann",
      message:
        "it’s nice meeting you.you are awesome you are... you. you are awesome you are...",
      time: "Yesterday,08:30pm",
    },
    {
      id: "5",
      image: Avatar,
      name: "Nancy",
      message: "it’s nice meeting you.you are awesome you are...",
      time: "Yesterday,08:30pm",
    },
    {
      id: "6",
      image: Avatar,
      name: "Luna",
      message: "Hi Jack",
      time: "1 day ago",
    },
    {
      id: "7",
      image: Avatar,
      name: "Ann",
      message:
        "it’s nice meeting you.you are awesome you are... you. you are awesome you are...",
      time: "Yesterday,08:30pm",
    },
    {
      id: "8",
      image: Avatar,
      name: "Nancy",
      message: "it’s nice meeting you.you are awesome you are...",
      time: "Yesterday,08:30pm",
    },
    {
      id: "9",
      image: Avatar,
      name: "Luna",
      message: "Hi Jack",
      time: "1 day ago",
    },
  ];

  return (
    <View style={{ ...STYLES.main }}>
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
      <View style={{ ...STYLES.content }}>
        <FlatList
          style={{ ...STYLES.list }}
          data={listData}
          renderItem={(data) => (
            <MessagesListItem
              key={data.index}
              item={data.item}
              style={{ ...STYLES.listItem }}
            />
          )}
        />
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  main: {
    backgroundColor: CONFIG.WHITE,
    flex: 1,
  },
  header: {
    paddingTop: 70,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputCon: {
    flex: 0.78,
  },
  inputCard: {
    height: "auto",
  },
  input: {},
  inputGroupStyle: {
    paddingVertical: 18,
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
    height: 74,
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
  content: {
    paddingTop: 20,
  },
  list: {
    flexGrow: 1,
    width: "100%",
    paddingLeft: 12,
    paddingRight: 4,
    height: "77%"
  },
  listItem: {},
});

export default Messages;
