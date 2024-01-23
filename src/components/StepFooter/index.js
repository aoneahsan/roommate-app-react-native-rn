import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import * as CONFIG from '../../config';
import BodyText from '../BodyText';

const StepFooter = (props) => {
	return (
		<View style={STYLES.footer}>
			<View style={STYLES.leftside}>
				<TouchableOpacity
					onPress={
						props.onPress ? props.onPress : () => alert("pass 'onPress' props")
					}
					style={STYLES.leftside_innerCon}
				>
					<BodyText style={STYLES.nextText}>Next</BodyText>
					<Ionicons
						name='arrow-forward'
						size={38}
						style={STYLES.nextIcon}
					/>
				</TouchableOpacity>
			</View>
			<View style={STYLES.rightside}>
				<BodyText style={{ ...STYLES.current_steptext }}>
					{props.currentStep}
				</BodyText>
				<BodyText style={{ ...STYLES.steptext }}>
					of {props.totalSteps}
				</BodyText>
			</View>
		</View>
	);
};

const STYLES = StyleSheet.create({
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
	},
	leftside: {},
	leftside_innerCon: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	nextText: {
		fontSize: 18,
		marginRight: 10,
	},
	nextIcon: {},
	rightside: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	steptext: {
		fontSize: 24,
		fontFamily: CONFIG.FONT_HANSON_BOLD,
		color: CONFIG.LIGHT_TEXT_COLOR,
	},
	current_steptext: {
		fontSize: 36,
		fontFamily: CONFIG.FONT_HANSON_BOLD,
		marginRight: 10,
		marginTop: -8,
	},
});

export default StepFooter;
