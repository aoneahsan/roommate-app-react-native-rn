// Core Imports
import { createAppContainer, createSwitchNavigator } from "react-navigation";

// Custom Imports
import LandingScreen from "../../screens/LandingScreen";
import * as StackNavigators from "../StackNavigators";

const AppSwitchContainer = createSwitchNavigator({
  landing_screen: LandingScreen,
  auth_stack_components: StackNavigators.AuthStackComponents,
  profile_stack_components: StackNavigators.ProfileStackComponents,
});

export default createAppContainer(AppSwitchContainer);
