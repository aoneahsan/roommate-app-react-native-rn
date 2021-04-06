// Core Imports
import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Custom Imports
import * as CONFIG from "../../../config";
import Profile from "../../../screens/Profile";
import RoleSelect from "./../../../screens/RoleSelect";

// Stacks Definations
const ProfileStack = createStackNavigator();

// Stack Creatings
export const ProfileStackComponents = (navData) => {
  return (
    <ProfileStack.Navigator
      initialRouteName="role_select_screen"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: CONFIG.WHITE,
          elevation: 0,
        },
        headerTitleStyle: {
          fontSize: CONFIG.HEADER_TITLE_SIZE,
        },
      }}
    >
      <ProfileStack.Screen
        name="profile_screen"
        component={Profile}
        options={{ title: "My Profile" }}
      ></ProfileStack.Screen>
      <ProfileStack.Screen
        name="role_select_screen"
        component={RoleSelect}
        options={{ title: "" }}
      ></ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};
