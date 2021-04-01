import React from "react";

import { View, Button } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";
import * as StackNavigators from "./StackNavigators";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";

import * as ACTIONS from "./../store/actions/index";

import * as FONTS from "./../../utils/fonts";
import * as COLORS from "./../../utils/colors";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName="shopScreensStack"
      drawerContentOptions={{
        activeTintColor: COLORS.PRIMARY,
        labelStyle: {
          fontFamily: FONTS.BOLD,
        },
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <View>
            <Button title="Logout" onPress={() => dispatch(ACTIONS.logout())} />
          </View>
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="shopScreensStack"
        component={StackNavigators.ShopComponentsStack}
        options={{
          title: "Shop",
          drawerIcon: () => {
            // return <Ionicons name="ios-shop" size={26} color={COLORS.PRIMARY} />
            return <Ionicons name="ios-cart" size={26} />;
          },
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="ordersScreenStack"
        component={StackNavigators.OrdersComponentsStack}
        options={{
          title: "Orders",
          drawerIcon: () => {
            // return <Ionicons name="ios-shop" size={26} color={COLORS.PRIMARY} />
            return <Ionicons name="ios-basket" size={26} />;
          },
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="manageProductScreensStack"
        component={StackNavigators.ManageProductsComponentsStack}
        options={{
          title: "Manage Products",
          drawerIcon: () => {
            // return <Ionicons name="ios-shop" size={26} color={COLORS.PRIMARY} />
            return <Ionicons name="ios-podium" size={26} />;
          },
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
