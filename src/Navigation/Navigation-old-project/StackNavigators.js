import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonComponent from "./../../components/HeaderButtonComponent/HeaderButtonComponent";
import { commonStackScreenOptions } from "./NavigationHelperFunctions";

// screens imports
import Shop from "./../screens/Shop/Shop";
import Cart from "./../screens/Cart/Cart";
import Orders from "./../screens/Orders/Orders";
import EditProduct from "./../screens/EditProduct/EditProduct";
import ManageProducts from "./../screens/ManageProducts/ManageProducts";
import ProductDetail from "./../screens/ProductDetail/ProductDetail";
import AuthScreen from "./../screens/Auth/Auth";

import * as COLORS from "./../../utils/colors";

const ShopStack = createStackNavigator();
const OrdersStack = createStackNavigator();
const ManageProductsStack = createStackNavigator();
const AuthStack = createStackNavigator();

export const ShopComponentsStack = (navData) => {
  return (
    <ShopStack.Navigator
      screenOptions={{
        ...commonStackScreenOptions,
      }}
      initialRouteName="shopScreen"
    >
      <ShopStack.Screen
        name="shopScreen"
        component={Shop}
        options={{
          title: "Shop",
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  color={
                    Platform.OS === "android" ? COLORS.WHITE : COLORS.PRIMARY
                  }
                  iconSize={23}
                  onPress={() => navData.navigation.toggleDrawer()}
                />
              </HeaderButtons>
            );
          },
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
                <Item
                  title="Menu"
                  iconName="ios-cart"
                  color={
                    Platform.OS === "android" ? COLORS.WHITE : COLORS.PRIMARY
                  }
                  iconSize={23}
                  onPress={() => navData.navigation.navigate("cartScreen")}
                />
              </HeaderButtons>
            );
          },
        }}
      ></ShopStack.Screen>
      <ShopStack.Screen
        name="productDetailScreen"
        component={ProductDetail}
        options={{
          title: "Product Detail",
        }}
      ></ShopStack.Screen>
      <ShopStack.Screen
        name="cartScreen"
        component={Cart}
        options={{
          title: "Cart",
        }}
      ></ShopStack.Screen>
    </ShopStack.Navigator>
  );
};

export const OrdersComponentsStack = (navData) => {
  return (
    <OrdersStack.Navigator
      screenOptions={{
        ...commonStackScreenOptions,
      }}
      initialRouteName="ordersScreen"
    >
      <OrdersStack.Screen
        name="ordersScreen"
        component={Orders}
        options={{
          title: "Orders",
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  color={
                    Platform.OS === "android" ? COLORS.WHITE : COLORS.PRIMARY
                  }
                  iconSize={23}
                  onPress={() => navData.navigation.toggleDrawer()}
                />
              </HeaderButtons>
            );
          },
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
                <Item
                  title="Menu"
                  iconName="ios-cart"
                  color={
                    Platform.OS === "android" ? COLORS.WHITE : COLORS.PRIMARY
                  }
                  iconSize={23}
                  onPress={() => navData.navigation.navigate("cartScreen2")}
                />
              </HeaderButtons>
            );
          },
        }}
      ></OrdersStack.Screen>
      <OrdersStack.Screen
        name="cartScreen2"
        component={Cart}
        options={{
          title: "Cart",
        }}
      ></OrdersStack.Screen>
    </OrdersStack.Navigator>
  );
};

export const ManageProductsComponentsStack = (navData) => {
  // console.log("Project3 == navData = ", navData);
  return (
    <ManageProductsStack.Navigator
      screenOptions={{
        ...commonStackScreenOptions,
      }}
      initialRouteName="manageProductsScreen"
    >
      <ManageProductsStack.Screen
        name="manageProductsScreen"
        component={ManageProducts}
        options={{
          title: "Manage Products",
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  color={
                    Platform.OS === "android" ? COLORS.WHITE : COLORS.PRIMARY
                  }
                  iconSize={23}
                  onPress={() => navData.navigation.toggleDrawer()}
                />
              </HeaderButtons>
            );
          },
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
                <Item
                  title="Menu"
                  iconName="ios-add"
                  color={
                    Platform.OS === "android" ? COLORS.WHITE : COLORS.PRIMARY
                  }
                  iconSize={23}
                  onPress={() =>
                    navData.navigation.navigate("editProductScreen")
                  }
                />
              </HeaderButtons>
            );
          },
        }}
      ></ManageProductsStack.Screen>
      <ManageProductsStack.Screen
        name="editProductScreen"
        component={EditProduct}
        options={{
          title: "Edit Product",
        }}
      ></ManageProductsStack.Screen>
      <ManageProductsStack.Screen
        name="productDetailScreen"
        component={ProductDetail}
        options={{
          title: "Product Detail",
        }}
      ></ManageProductsStack.Screen>
    </ManageProductsStack.Navigator>
  );
};

export const AuthComponentsStack = (navData) => {
  return (
    <AuthStack.Navigator
      initialRouteName="auth"
      screenOptions={{
        ...commonStackScreenOptions,
      }}
    >
      <AuthStack.Screen
        name="auth"
        component={AuthScreen}
        options={{ title: "Auth" }}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
