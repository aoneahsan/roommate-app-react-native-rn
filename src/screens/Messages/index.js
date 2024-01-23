import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import * as CONFIG from '../../config';
import MessagesPageHeader from '../../components/MessagesPageHeader';
import MessagesListItem from '../../components/MessagesListItem';

// Imgaes
import Avatar from './../../../assets/images/avatar.png';

const Messages = (props) => {
	const listData = [
		{
			id: '1',
			image: Avatar,
			name: 'Ann',
			message:
				'it’s nice meeting you.you are awesome you are... you. you are awesome you are...',
			time: 'Yesterday,08:30pm',
		},
		{
			id: '2',
			image: Avatar,
			name: 'Nancy',
			message: 'it’s nice meeting you.you are awesome you are...',
			time: 'Yesterday,08:30pm',
		},
		{
			id: '3',
			image: Avatar,
			name: 'Luna',
			message: 'Hi Jack',
			time: '1 day ago',
		},
		{
			id: '4',
			image: Avatar,
			name: 'Ann',
			message:
				'it’s nice meeting you.you are awesome you are... you. you are awesome you are...',
			time: 'Yesterday,08:30pm',
		},
		{
			id: '5',
			image: Avatar,
			name: 'Nancy',
			message: 'it’s nice meeting you.you are awesome you are...',
			time: 'Yesterday,08:30pm',
		},
		{
			id: '6',
			image: Avatar,
			name: 'Luna',
			message: 'Hi Jack',
			time: '1 day ago',
		},
		{
			id: '7',
			image: Avatar,
			name: 'Ann',
			message:
				'it’s nice meeting you.you are awesome you are... you. you are awesome you are...',
			time: 'Yesterday,08:30pm',
		},
		{
			id: '8',
			image: Avatar,
			name: 'Nancy',
			message: 'it’s nice meeting you.you are awesome you are...',
			time: 'Yesterday,08:30pm',
		},
		{
			id: '9',
			image: Avatar,
			name: 'Luna',
			message: 'Hi Jack',
			time: '1 day ago',
		},
	];

	return (
		<View style={{ ...STYLES.main }}>
			<MessagesPageHeader />
			<View style={{ ...STYLES.content }}>
				<FlatList
					style={{ ...STYLES.list }}
					data={listData}
					renderItem={(data) => (
						<MessagesListItem
							key={data.index}
							item={data.item}
							style={{ ...STYLES.listItem }}
						/>
					)}
				/>
			</View>
		</View>
	);
};

const STYLES = StyleSheet.create({
	main: {
		backgroundColor: CONFIG.WHITE,
		flex: 1,
	},
	content: {
		paddingTop: 20,
	},
	list: {
		flexGrow: 1,
		width: '100%',
		paddingLeft: 12,
		paddingRight: 4,
		height: '88%',
	},
	listItem: {},
});

export default Messages;
