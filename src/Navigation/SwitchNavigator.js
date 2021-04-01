// Core Imports
import { createAppContainer, createSwitchNavigator } from "react-navigation";

// Custom Imports
import LandingScreen from "./../screens/LandingScreen";
import Auth from "./../screens/Auth";

const AppSwitchContainer = createSwitchNavigator({
  Auth: Auth,
  LandingScreen: LandingScreen,
});

export default createAppContainer(AppSwitchContainer);
