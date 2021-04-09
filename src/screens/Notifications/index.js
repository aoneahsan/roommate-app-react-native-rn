// Core Imports
import React from "react";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";

// Custom Imports
import * as CONFIG from "../../config";
import MessagesPageHeader from "../../components/MessagesPageHeader";
import BodyText from "../../components/BodyText";
import NotificationsListItem from "../../components/NotificationsListItem";
import MessagesListItem from "../../components/MessagesListItem";

// Imgaes
import Avatar from "./../../../assets/images/avatar.png";

const Notifications = (props) => {
  const teamsListData = [
    {
      id: "1",
      image: Avatar,
      name: "Ann",
      status: "accepted",
      time: "Yesterday,08:30pm",
    },
    {
      id: "2",
      image: Avatar,
      name: "Nancy",
      status: "pending",
      time: "Yesterday,08:30pm",
    },
    {
      id: "3",
      image: Avatar,
      name: "Luna",
      status: "accepted",
      time: "1 day ago",
    },
  ];

  const peoplesListData = [
    {
      id: "4",
      image: Avatar,
      name: "Ann",
      status: "pending",
      time: "Yesterday,08:30pm",
    },
    {
      id: "5",
      image: Avatar,
      name: "Nancy",
      status: "accepted",
      time: "Yesterday,08:30pm",
    },
    {
      id: "6",
      image: Avatar,
      name: "Luna",
      status: "pending",
      time: "1 day ago",
    },
  ];

  const myoffersListData = [
    {
      id: "1",
      image: Avatar,
      name: "Ann",
      message:
        "it’s nice meeting you.you are awesome you are... you. you are awesome you are...",
      time: "Yesterday,08:30pm",
      alerts: 1,
    },
    {
      id: "2",
      image: Avatar,
      name: "Nancy",
      message: "it’s nice meeting you.you are awesome you are...",
      time: "Yesterday,08:30pm",
      alerts: 3,
    },
  ];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ ...STYLES.main }}>
        <MessagesPageHeader />
        <View style={{ ...STYLES.content }}>
          <View style={{ ...STYLES.listCon }}>
            <View style={{ ...STYLES.listTitleCon }}>
              <BodyText style={{ ...STYLES.listTitle }}>Team</BodyText>
            </View>
            {teamsListData.map((item, index) => (
              <NotificationsListItem
                key={index}
                item={item}
                style={{ ...STYLES.listItem }}
              />
            ))}
          </View>
          {/* My Offers */}
          <View style={{ ...STYLES.listCon }}>
            <View style={{ ...STYLES.listTitleCon }}>
              <BodyText style={{ ...STYLES.listTitle }}>My Offers</BodyText>
            </View>
            {myoffersListData.map((item, index) => (
              <MessagesListItem
                key={index}
                item={item}
                style={{ ...STYLES.listItem }}
              />
            ))}
          </View>
          {/* People */}
          <View style={{ ...STYLES.listCon }}>
            <View style={{ ...STYLES.listTitleCon }}>
              <BodyText style={{ ...STYLES.listTitle }}>People</BodyText>
            </View>
            {peoplesListData.map((item, index) => (
              <NotificationsListItem
                key={index}
                item={item}
                style={{ ...STYLES.listItem }}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const STYLES = StyleSheet.create({
  main: {
    backgroundColor: CONFIG.WHITE,
    flex: 1,
  },
  content: {
    paddingTop: 20,
    flex: 1,
  },
  listCon: {
    backgroundColor: "red",
  },
  listTitleCon: {
    borderBottomColor: "rgba(141, 139, 139, .1)",
    borderBottomWidth: 6,
    zIndex: -1,
    marginBottom: 18,
    position: "relative",
    paddingTop: 20,
  },
  listTitle: {
    color: CONFIG.PRIMARY,
    fontSize: 22,
    fontFamily: CONFIG.FONT_RUBIK_BOLD,
    marginBottom: -10,
    zIndex: 11,
    position: "absolute",
    top: 4,
    left: 16,
  },
  listCon: {},
  list: {
    flex: 1,
    marginBottom: 20,
  },
  listItem: {
    paddingHorizontal: 14,
  },
});

export default Notifications;
