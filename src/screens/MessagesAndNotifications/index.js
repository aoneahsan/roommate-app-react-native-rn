import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';

import * as CONFIG from '../../config';
import BodyText from '../../components/BodyText';
import Messages from '../Messages';
import Notifications from '../Notifications';

const MessagesAndNotifications = (props) => {
	const [activePage, setActivePage] = useState('messages');

	const changeActivePage = (page) => {
		setActivePage(page);
	};

	return (
		// <ScrollView contentContainerStyle={STYLES.bgWhite}>
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ ...STYLES.main }}>
				<View style={{ ...STYLES.header }}>
					<View style={{ ...STYLES.titleWrapper }}>
						<TouchableOpacity onPress={() => changeActivePage('messages')}>
							<BodyText
								style={{
									...STYLES.title,
									...{
										color:
											activePage == 'messages'
												? CONFIG.PRIMARY
												: CONFIG.LIGHT_TEXT_COLOR,
										fontFamily:
											activePage == 'messages'
												? CONFIG.FONT_RUBIK_BOLD
												: CONFIG.FONT_RUBIK_REGULAR,
									},
								}}
							>
								Messages
							</BodyText>
						</TouchableOpacity>
					</View>
					<View style={{ ...STYLES.titleWrapper }}>
						<TouchableOpacity onPress={() => changeActivePage('notifications')}>
							<BodyText
								style={{
									...STYLES.title,
									...{
										color:
											activePage == 'notifications'
												? CONFIG.PRIMARY
												: CONFIG.LIGHT_TEXT_COLOR,
										fontFamily:
											activePage == 'notifications'
												? CONFIG.FONT_RUBIK_BOLD
												: CONFIG.FONT_RUBIK_REGULAR,
									},
								}}
							>
								Notifications
							</BodyText>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ ...STYLES.content }}>
					{activePage == 'messages' && <Messages />}
					{activePage == 'notifications' && <Notifications />}
				</View>
			</View>
		</SafeAreaView>
		// </ScrollView>
	);
};

const STYLES = StyleSheet.create({
	bgWhite: {
		flexGrow: 1,
	},
	main: {
		backgroundColor: CONFIG.WHITE,
		flex: 1,
	},
	header: {
		flex: 0.1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 20,
	},
	titleWrapper: {
		flex: 1,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
	},
	content: {
		flex: 0.9,
		backgroundColor: 'blue',
	},
});

export default MessagesAndNotifications;
