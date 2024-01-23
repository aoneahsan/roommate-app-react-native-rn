// Core Imports
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Custom Imports
import * as CONFIG from "./../../../config";
import UsersList from "./../../../screens/UsersList";
import UserListItemView from "./../../../screens/UserListItemView";

// Stacks Definations
const UsersListStack = createStackNavigator();

// Stack Creatings
export const UsersListStackComponents = (navData) => {
  return (
    <UsersListStack.Navigator
      initialRouteName="users_list_screen"
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
      <UsersListStack.Screen
        name="users_list_screen"
        component={UsersList}
        options={{ title: "", headerStyle: { height: 0 } }}
      ></UsersListStack.Screen>
      <UsersListStack.Screen
        name="users_list_item_detail_screen"
        component={UserListItemView}
        options={{ title: "User Details" }}
      ></UsersListStack.Screen>
    </UsersListStack.Navigator>
  );
};
