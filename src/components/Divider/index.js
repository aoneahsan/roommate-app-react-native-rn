import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as CONFIG from './../../config';
import BodyText from './../BodyText';

const Divider = (props) => {
	return (
		<View style={STYLES.main}>
			<View style={STYLES.line}></View>
			<View style={STYLES.textCon}>
				<BodyText style={STYLES.text}>{props.children}</BodyText>
			</View>
		</View>
	);
};

const STYLES = StyleSheet.create({
	main: {
		marginVertical: 10,
	},
	line: {
		width: '100%',
		height: 2,
		backgroundColor: CONFIG.DIVIDER_LINE_COLOR,
	},
	textCon: {
		alignItems: 'center',
	},
	text: {
		textAlign: 'center',
		marginTop: -12,
		width: 30,
		backgroundColor: CONFIG.WHITE,
	},
});

export default Divider;
