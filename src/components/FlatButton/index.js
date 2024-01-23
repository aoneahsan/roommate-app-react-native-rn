import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback,
} from 'react-native';

import BodyText from '../BodyText';
import * as CONFIG from '../../config';

const FlatButton = (props) => {
	let BaseTouchable = TouchableOpacity;
	if (Platform.OS === 'android' && Platform.Version >= 21) {
		BaseTouchable = TouchableNativeFeedback;
	}

	let textStyles = STYLES.blackText;
	if (props.color == 'black') {
		textStyles = STYLES.blackText;
	} else if (props.color == 'primary') {
		textStyles = STYLES.primaryText;
	} else {
		textStyles = STYLES.blackText;
	}
	let disabledText = {};
	if (props.disabled) {
		disabledText = STYLES.disabledText;
	}
	let underlineStyles = {};
	if (props.underlined) {
		underlineStyles = STYLES.underlined;
	}

	const clickHandler = () => {
		props.disabled
			? () => {}
			: props.onPress
			? props.onPress()
			: () => alert('Pass a onPress function.');
	};

	return (
		<BaseTouchable
			opacity={props.touchableOpacity ? props.touchableOpacity : 0.1}
			onPress={clickHandler}
		>
			<View style={{ ...STYLES.wrapper, ...props.style }}>
				<BodyText
					textalign={props.textalign ? props.textalign : 'left'}
					fontfamily={props.fontfamily ? props.fontfamily : 'medium'}
					fontsize={props.fontsize ? props.fontsize : CONFIG.BTN_TEXT_SIZE}
					style={{
						...STYLES.text,
						...textStyles,
						...underlineStyles,
					}}
				>
					{props.children}
				</BodyText>
			</View>
		</BaseTouchable>
	);
};

const STYLES = StyleSheet.create({
	wrapper: {},
	blackText: {
		color: CONFIG.TEXT_COLOR,
	},
	primaryText: {
		color: CONFIG.PRIMARY,
	},
	disabledText: {
		color: CONFIG.GREY,
	},
	text: {
		letterSpacing: 0.4,
		fontFamily: CONFIG.FONT_RUBIK_BOLD,
		fontSize: 16,
	},
	underlined: {
		textDecorationLine: 'underline',
	},
});

export default FlatButton;
