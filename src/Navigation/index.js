// Core Imports
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationActions } from "react-navigation";

// Custom Imports
import SwitchNavigator from "./SwitchNavigator";

const Navigation = (props) => {
  return <SwitchNavigator />;
};

export default Navigation;
