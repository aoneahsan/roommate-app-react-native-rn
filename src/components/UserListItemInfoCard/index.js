import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as CONFIG from '../../config';
import Card from '../Card';
import BodyText from '../BodyText';

const UserListItemInfoCard = (props) => {
	const data = props.data;
	const items = data.data;
	return (
		<View style={{ ...STYLES.main }}>
			<Card style={{ ...STYLES.card }}>
				<BodyText style={{ ...STYLES.title }}>{data.title}</BodyText>
				<View style={{ ...STYLES.content }}>
					{items &&
						Object.keys(items).map((keyName, index) => {
							// console.log("UserListItemInfoCard === map == res = ", {
							//   keyName,
							//   index,
							// });
							return (
								<View
									style={{ ...STYLES.row }}
									key={index}
								>
									<BodyText style={{ ...STYLES.text, ...{ marginRight: 10 } }}>
										{keyName}:
									</BodyText>
									<BodyText style={{ ...STYLES.text }}>
										{items[keyName]}
									</BodyText>
								</View>
							);
						})}
				</View>
			</Card>
		</View>
	);
};

const STYLES = StyleSheet.create({
	main: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	card: {
		height: 'auto',
		width: '84%',
		paddingVertical: 20,
		paddingLeft: 30,
	},
	title: {
		fontFamily: CONFIG.FONT_RUBIK_BOLD,
		fontSize: 20,
		color: CONFIG.CHIP_TEXT,
		marginBottom: 16,
	},
	content: {},
	row: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		marginBottom: 8,
		flexWrap: 'wrap',
	},
	text: {
		fontSize: 18,
		color: CONFIG.CHIP_TEXT,
	},
});

export default UserListItemInfoCard;
