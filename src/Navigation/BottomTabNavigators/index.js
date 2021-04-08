import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";

import UsersList from "./../../screens/UsersList";
import Messages from "./../../screens/Messages";
import * as CONFIG from "../../config";
import BodyText from "../../components/BodyText";
import Card from "../../components/Card";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tabs = createBottomTabNavigator();

export const appTabsNavigator = (navData) => {
  return (
    <Tabs.Navigator
      initialRouteName="users_list_tab_screen"
      tabBarOptions={{
        labelStyle: {
          fontFamily: CONFIG.FONT_RUBIK_BOLD,
          fontSize: 18,
        },
        showLabel: false,
        inactiveTintColor: "#484848",
        activeTintColor: CONFIG.PRIMARY,
      }}
      sceneContainerStyle={{}}
      barStyle={{
        width: "90%",
        flex: 0.6,
      }}
      tabBar={() => (
        <Card style={{ height: "auto", marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() =>
              navData.navigation.navigate({ name: "messages_tab_screen" })
            }
          >
            <BodyText>wo</BodyText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navData.navigation.navigate({ name: "users_list_tab_screen" })
            }
          >
            <BodyText>wo2</BodyText>
          </TouchableOpacity>
        </Card>
      )}
      screenOptions={{
        tabBarVisible: true,
      }}
    >
      <Tabs.Screen
        name="users_list_tab_screen"
        component={UsersList}
        options={{
          title: "",
          tabBarIcon: (tabInfo) => {
            return <Feather name="user-plus" size={24} color={tabInfo.color} />;
          },
          tabBarColor: CONFIG.RED,
        }}
      />
      <Tabs.Screen
        name="messages_tab_screen"
        component={Messages}
        options={{
          title: "Messages",
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons name="ios-heart" size={25} color={tabInfo.color} />
            );
          },
          tabBarColor: CONFIG.SECONDARY,
        }}
      />
    </Tabs.Navigator>
  );
};
