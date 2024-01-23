import React from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import * as CONFIG from '../../../config';
import LandingScreen from './../../../screens/LandingScreen';
import * as StackNavigators from './../../StackNavigators';
import * as BottomTabNavigators from './../../BottomTabNavigators';

// Stacks Definations
const AppDrawer = createDrawerNavigator();

// Stack Creatings
export const AppDrawerComponents = (navData) => {
	return (
		<AppDrawer.Navigator
			initialRouteName='app_landing_screen'
			screenOptions={{ swipeEnabled: false }}
		>
			<AppDrawer.Screen
				name='app_landing_screen'
				component={LandingScreen}
			></AppDrawer.Screen>
			<AppDrawer.Screen
				name='auth_stack_screens'
				component={StackNavigators.AuthStackComponents}
			></AppDrawer.Screen>
			<AppDrawer.Screen
				name='profile_stack_screens'
				component={StackNavigators.ProfileStackComponents}
			></AppDrawer.Screen>
			<AppDrawer.Screen
				name='find_roommate_stack_screens'
				component={StackNavigators.FindRoommateStackComponents}
			></AppDrawer.Screen>
			<AppDrawer.Screen
				name='add_place_stack_screens'
				component={StackNavigators.AddPlaceStackComponents}
			></AppDrawer.Screen>
			<AppDrawer.Screen
				name='users_list_stack_screens'
				component={BottomTabNavigators.AppTabsNavigator}
			></AppDrawer.Screen>
		</AppDrawer.Navigator>
	);
};
