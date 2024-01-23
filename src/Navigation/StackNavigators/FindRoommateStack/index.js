import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as CONFIG from '../../../config';
import FindRoommateStep1 from '../../../screens/FindRoommate/FindRoommateStep1';
import FindRoommateStep2 from '../../../screens/FindRoommate/FindRoommateStep2';
import FindRoommateStep3 from '../../../screens/FindRoommate/FindRoommateStep3';
import FindRoommateStep4 from '../../../screens/FindRoommate/FindRoommateStep4';
import FindRoommateStep5 from '../../../screens/FindRoommate/FindRoommateStep5';

// Stacks Definations
const FindRoommateStack = createStackNavigator();

// Stack Creatings
export const FindRoommateStackComponents = (navData) => {
	return (
		<FindRoommateStack.Navigator
			initialRouteName='find_roommate_step1_screen'
			screenOptions={{
				headerTitleAlign: 'center',
				headerStyle: {
					backgroundColor: CONFIG.WHITE,
					elevation: 0,
				},
				headerTitleStyle: {
					fontSize: CONFIG.HEADER_TITLE_SIZE,
					fontFamily: CONFIG.FONT_RUBIK_BOLD,
				},
			}}
		>
			{/* Step 1 */}
			<FindRoommateStack.Screen
				name='find_roommate_step1_screen'
				component={FindRoommateStep1}
				options={{ title: 'Room Preference' }}
			></FindRoommateStack.Screen>
			{/* Step 2 */}
			<FindRoommateStack.Screen
				name='find_roommate_step2_screen'
				component={FindRoommateStep2}
				options={{ title: 'Hobbies' }}
			></FindRoommateStack.Screen>
			{/* Step 3 */}
			<FindRoommateStack.Screen
				name='find_roommate_step3_screen'
				component={FindRoommateStep3}
				options={{ title: 'My Life Style' }}
			></FindRoommateStack.Screen>
			{/* Step 4 */}
			<FindRoommateStack.Screen
				name='find_roommate_step4_screen'
				component={FindRoommateStep4}
				options={{ title: 'Roommates Preference' }}
			></FindRoommateStack.Screen>
			{/* Step 5 */}
			<FindRoommateStack.Screen
				name='find_roommate_step5_screen'
				component={FindRoommateStep5}
				options={{ title: 'PikyMe Credit' }}
			></FindRoommateStack.Screen>
		</FindRoommateStack.Navigator>
	);
};
