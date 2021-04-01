import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Drawer from "./DrawerNavigator";
import AuthScreen from "./../screens/Auth/Auth";
import StartUpScreen from "./../screens/StartUp/StartUp";

const AppSwitch = createSwitchNavigator({
  Auth: AuthScreen,
  Shop: Drawer,
  StartUp: StartUpScreen,
});

export default createAppContainer(AppSwitch);
