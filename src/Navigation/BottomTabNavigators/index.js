import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  Feather,
  Foundation,
  FontAwesome5,
} from "@expo/vector-icons";

import UsersList from "./../../screens/UsersList";
import Messages from "./../../screens/Messages";
import * as CONFIG from "../../config";
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
      // sceneContainerStyle={{}}
      // barStyle={{
      //   width: "90%",
      //   flex: 0.6,
      // }}
      tabBar={(navItemData) => {
        const index = navItemData.state.index;
        const activeColor = navItemData.activeTintColor;
        const inactiveColor = navItemData.inactiveTintColor;
        console.log("BottomTabNavigators === appTabsNavigator == tabBar = ", {
          // navItemData,
          index,
          activeColor,
          inactiveColor,
        });
        return (
          <View style={STYLES.tabBarCon}>
            <Card style={STYLES.tabBar}>
              <TouchableOpacity
                onPress={() =>
                  navData.navigation.navigate({ name: "users_list_tab_screen" })
                }
              >
                <Feather
                  name="user-plus"
                  size={30}
                  style={{ color: index == 0 ? activeColor : inactiveColor }}
                />
                {/* <BodyText
                >
                  wo
                </BodyText> */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navData.navigation.navigate({ name: "home_tab_screen" })
                }
              >
                <Foundation
                  name="home"
                  size={30}
                  style={{ color: index == 1 ? activeColor : inactiveColor }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navData.navigation.navigate({ name: "messages_tab_screen" })
                }
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={30}
                  style={{ color: index == 2 ? activeColor : inactiveColor }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navData.navigation.navigate({ name: "globe_tab_screen" })
                }
              >
                <FontAwesome5
                  name="globe-americas"
                  size={30}
                  style={{ color: index == 3 ? activeColor : inactiveColor }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navData.navigation.navigate({ name: "user_tab_screen" })
                }
              >
                <Feather
                  name="user"
                  size={30}
                  style={{ color: index == 4 ? activeColor : inactiveColor }}
                />
              </TouchableOpacity>
            </Card>
          </View>
        );
      }}
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
      <Tabs.Screen name="home_tab_screen" component={Messages} />
      <Tabs.Screen name="messages_tab_screen" component={Messages} />
      <Tabs.Screen name="globe_tab_screen" component={Messages} />
      <Tabs.Screen name="user_tab_screen" component={Messages} />
    </Tabs.Navigator>
  );
};

const STYLES = StyleSheet.create({
  tabBarCon: {
    paddingHorizontal: 12,
    backgroundColor: CONFIG.WHITE,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  tabBar: {
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
  },
});
