// Core Imports
import { createAppContainer, createSwitchNavigator } from "react-navigation";

// Custom Imports
import LandingScreen from "../../screens/LandingScreen";
import * as StackNavigators from "../StackNavigators";
import * as DrawerNavigators from "../DrawerNavigators";

const AppSwitchContainer = createSwitchNavigator({
  auth_stack_components: StackNavigators.AuthStackComponents,
  landing_screen: LandingScreen,
  app_stack_components: DrawerNavigators.AppDrawerComponents,
});

export default createAppContainer(AppSwitchContainer);
