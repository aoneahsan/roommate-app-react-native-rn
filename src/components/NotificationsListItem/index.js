import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import * as CONFIG from '../../config';
import BodyText from '../BodyText';
import Card from '../Card';
import MainButton from '../MainButton';

const NotificationsListItem = (props) => {
	const itemData = props.item;
	return (
		<TouchableOpacity>
			<View style={{ ...STYLES.main, ...props.style }}>
				<Card style={{ ...STYLES.imageCard }}>
					<Image
						style={{ ...STYLES.image }}
						source={itemData.image}
					/>
				</Card>
				<View style={{ ...STYLES.infoCon, ...STYLES.row }}>
					<View style={{ ...STYLES.row }}>
						<BodyText style={{ ...STYLES.name }}>{itemData.name}</BodyText>
					</View>
					<View style={{ ...STYLES.btnCon }}>
						{itemData.status == 'pending' && (
							<MainButton
								color='primary'
								style={{ ...STYLES.btn }}
								radius={10}
								fontsize={18}
							>
								Accept
							</MainButton>
						)}
						{itemData.status == 'accepted' && (
							<BodyText style={{ fontSize: 20, marginRight: 14 }}>
								Accepted
							</BodyText>
						)}
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const STYLES = StyleSheet.create({
	main: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		width: '100%',
	},
	imageCard: {
		flex: 0.2,
		height: 54,
		maxWidth: 58,
		marginLeft: 4,
	},
	image: {
		height: '100%',
		width: '100%',
		resizeMode: 'cover',
	},
	infoCon: {
		flex: 0.8,
		flexWrap: 'wrap',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 8,
	},
	name: {
		fontSize: 20,
	},
	time: {
		fontSize: 12,
		color: CONFIG.LIGHT_TEXT_COLOR,
	},
	btnCon: {},
	btn: {
		height: 36,
		minWidth: 120,
		paddingVertical: 4,
	},
});

export default NotificationsListItem;
