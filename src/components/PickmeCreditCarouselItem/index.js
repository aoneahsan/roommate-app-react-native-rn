// Core Imports
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

// Custom Imports
import * as CONFIG from '../../config';
import BodyText from '../BodyText';
import Card from '../Card';
import PersonalInfo from './../../../assets/images/icons/personal-info.png';

const PickmeCreditCarouselItem = (props) => {
	const data = props.item;
	return (
		<TouchableOpacity
			onPress={
				props.onPress ? props.onPress : () => alert("pass 'onPress' props")
			}
		>
			<View style={STYLES.wrapper}>
				<Card style={{ ...STYLES.main, ...{ backgroundColor: data.bgColor } }}>
					<Image
						source={PersonalInfo}
						style={STYLES.image}
					/>
					<BodyText style={STYLES.title}>{data.title}</BodyText>
					<BodyText style={STYLES.text}>{data.percentage}%</BodyText>
				</Card>
			</View>
		</TouchableOpacity>
	);
};

const STYLES = StyleSheet.create({
	wrapper: {
		paddingTop: 40,
		marginBottom: 20,
		marginTop: 10,
	},
	main: {
		position: 'relative',
		height: 'auto',
		minHeight: 120,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 55,
		borderRadius: 30,
		paddingBottom: 20,
	},
	image: {
		position: 'absolute',
		top: -40,
		left: '37%',
		zIndex: 100,
		width: 80,
		height: 80,
		resizeMode: 'contain',
	},
	title: {
		fontSize: 24,
		marginBottom: 8,
	},
	text: {
		fontSize: 38,
		fontFamily: CONFIG.FONT_RUBIK_MEDIUM,
		color: CONFIG.WHITE,
	},
});

export default PickmeCreditCarouselItem;
