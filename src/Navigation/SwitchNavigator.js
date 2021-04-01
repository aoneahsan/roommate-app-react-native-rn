// Core Imports
import { createAppContainer, createSwitchNavigator } from "react-navigation";

// Custom Imports
import LandingScreen from "./../screens/LandingScreen";
import { AuthStackComponents } from "./StackNavigator";

const AppSwitchContainer = createSwitchNavigator({
  Auth: AuthStackComponents,
  LandingScreen: LandingScreen,
});

export default createAppContainer(AppSwitchContainer);
