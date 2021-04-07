// Core Imports
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Custom Imports
import * as CONFIG from "../../../../config";
import AddPlaceStep1 from "../../../../screens/AddPlace/AddPlaceStep1";
import AddPlaceStep2 from "../../../../screens/AddPlace/AddPlaceStep2";

// Stacks Definations
const AddPlaceStack = createStackNavigator();

// Stack Creatings
export const AddPlaceStackComponents = (navData) => {
  return (
    <AddPlaceStack.Navigator
      initialRouteName="add_place_step1_screen"
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
      {/* Step 1 */}
      <AddPlaceStack.Screen
        name="add_place_step1_screen"
        component={AddPlaceStep1}
        options={{ title: "Posting List" }}
      ></AddPlaceStack.Screen>
      {/* Step 2 */}
      <AddPlaceStack.Screen
        name="add_place_step2_screen"
        component={AddPlaceStep2}
        options={{ title: "Posting List" }}
      ></AddPlaceStack.Screen>
    </AddPlaceStack.Navigator>
  );
};
