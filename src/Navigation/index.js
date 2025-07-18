// Core Imports
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Custom Imports
import { AppDrawerComponents } from "./DrawerNavigators";

const Navigation = (props) => {
  return (
    <NavigationContainer>
      <AppDrawerComponents />
    </NavigationContainer>
  );
};

export default Navigation;
