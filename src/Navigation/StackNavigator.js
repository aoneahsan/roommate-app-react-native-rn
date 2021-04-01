// Core Imports
import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Custom Imports
import Auth from "./../screens/Auth";
import * as CONFIG from "./../config";

// Stacks Definations
const AuthStack = createStackNavigator();

// Stack Creatings
export const AuthStackComponents = (navData) => {
  return (
    <AuthStack.Navigator
      initialRouteName="auth_screen"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: CONFIG.WHITE,
          elevation: 0
        },
        headerTitleStyle: {
          fontSize: CONFIG.HEADER_TITLE_SIZE
        }
      }}
    >
      <AuthStack.Screen
        name="auth_screen"
        component={Auth}
        options={{ title: "Login or Sign up" }}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
