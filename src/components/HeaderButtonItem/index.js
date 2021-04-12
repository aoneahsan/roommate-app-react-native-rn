import React from "react";

import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import * as CONFIG from "./../../config";

const HeaderButtonItem = (props) => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={23}
      color={CONFIG.BLACK}
      {...props}
    />
  );
};

export default HeaderButtonItem;
