import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

import * as CONFIG from '../../config';

const TouchableCard = (props) => {
	return (
		<TouchableWithoutFeedback
			style={STYLES.wrapper}
			opacity={!!props.opacity ? props.opacity : 11}
			onPress={
				props.onPress ? props.onPress : () => alert("pass 'onPress' props")
			}
		>
			<View style={{ ...STYLES.main, ...props.style }}>{props.children}</View>
		</TouchableWithoutFeedback>
	);
};

const STYLES = StyleSheet.create({
	wrapper: {
		width: '100%',
		height: '100%',
	},
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

export default TouchableCard;
