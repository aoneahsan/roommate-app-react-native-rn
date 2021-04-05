// Core Imports
import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Custom Imports
import * as CONFIG from "../../../config";
import Profile from "../../../screens/Profile";

// Stacks Definations
const ProfileStack = createStackNavigator();

// Stack Creatings
export const ProfileStackComponents = (navData) => {
  return (
    <ProfileStack.Navigator
      initialRouteName="profile_screen"
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
    </ProfileStack.Navigator>
  );
};
