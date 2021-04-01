// Core Imports
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationActions } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";

// Custom Imports
import SwitchNavigator from "./SwitchNavigator";

const Navigation = (props) => {
  return (
    <NavigationContainer>
      <SwitchNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
