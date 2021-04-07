// Core Imports
import React from "react";
import { Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Custom Imports
import * as CONFIG from "../../../config";
import { ProfileStackComponents } from "./ProfileStack";
import { AddPlaceStackComponents } from "./AddPlaceStack";
import { FindRoommateStackComponents } from "./FindRoommateStack";

// Stacks Definations
const AppDrawer = createDrawerNavigator();

// Stack Creatings
export const AppDrawerComponents = (navData) => {
  return (
    <AppDrawer.Navigator initialRouteName="find_roommate_stack_screens">
      <AppDrawer.Screen
        name="profile_stack_screens"
        component={ProfileStackComponents}
      ></AppDrawer.Screen>
      <AppDrawer.Screen
        name="find_roommate_stack_screens"
        component={FindRoommateStackComponents}
      ></AppDrawer.Screen>
      <AppDrawer.Screen
        name="add_place_stack_screens"
        component={AddPlaceStackComponents}
      ></AppDrawer.Screen>
    </AppDrawer.Navigator>
  );
};
