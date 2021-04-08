// Core Imports
import { createAppContainer, createSwitchNavigator } from "react-navigation";

// Custom Imports
import LandingScreen from "../../screens/LandingScreen";
import * as StackNavigators from "../StackNavigators";
import * as DrawerNavigators from "../DrawerNavigators";

const AppSwitchContainer = createSwitchNavigator({
  app_stack_components: DrawerNavigators.AppDrawerComponents,
  landing_screen: LandingScreen,
  auth_stack_components: StackNavigators.AuthStackComponents,
});

export default createAppContainer(AppSwitchContainer);
