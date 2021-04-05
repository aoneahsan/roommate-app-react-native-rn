// Core Imports
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Custom Imports
import SwitchNavigators from "./SwitchNavigators";

const Navigation = (props) => {
  return (
    <NavigationContainer>
      <SwitchNavigators />
    </NavigationContainer>
  );
};

export default Navigation;
