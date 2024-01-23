// Core Imports
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Custom Imports
import * as CONFIG from '../../config';

const Card = (props) => {
	return (
		<View style={{ ...STYLES.main, ...props.style }}>{props.children}</View>
	);
};

const STYLES = StyleSheet.create({
	main: {
		width: '100%',
		height: '100%',
		elevation: 6,
		boxShadowColor: CONFIG.BLACK,
		boxShadowOffset: {
			width: 0,
			height: 2,
		},
		boxShadowOpacity: 0.6,
		boxShadowRadius: 6,
		backgroundColor: CONFIG.WHITE,
		borderRadius: 20,
	},
});

export default Card;
