import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import * as CONFIG from '../../../config';
import Auth from '../../../screens/Auth';
import VerifyPhone from '../../../screens/VerifyPhone';

// Stacks Definations
const AuthStack = createStackNavigator();

// Stack Creatings
export const AuthStackComponents = (navData) => {
	return (
		<AuthStack.Navigator
			initialRouteName='auth_screen'
			screenOptions={{
				headerTitleAlign: 'center',
				headerStyle: {
					backgroundColor: CONFIG.WHITE,
					elevation: 0,
				},
				headerTitleStyle: {
					fontSize: CONFIG.HEADER_TITLE_SIZE,
				},
			}}
		>
			<AuthStack.Screen
				name='auth_screen'
				component={Auth}
				options={{ title: 'Login or Sign up' }}
			></AuthStack.Screen>
			<AuthStack.Screen
				name='verifyPhone_screen'
				component={VerifyPhone}
				options={{ title: 'Confirm Your Number' }}
			></AuthStack.Screen>
		</AuthStack.Navigator>
	);
};
