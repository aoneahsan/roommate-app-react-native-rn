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

const SmallButton = (props) => {
	let BaseTouchable = TouchableOpacity;
	if (Platform.OS === 'android' && Platform.Version >= 21) {
		BaseTouchable = TouchableNativeFeedback;
	}

	let btnStyles = STYLES.whiteBtn;
	let textStyles = STYLES.whiteBtnText;
	if (props.color == 'white') {
		btnStyles = STYLES.whiteBtn;
		textStyles = STYLES.whiteBtnText;
	} else if (props.color == 'primary') {
		btnStyles = STYLES.primaryBtn;
		textStyles = STYLES.primaryBtnText;
	}
	let disabledStyles = {};
	if (props.disabled) {
		disabledStyles = STYLES.disabledStyles;
	}

	return (
		<View style={STYLES.wrapper}>
			<BaseTouchable
				style={{ ...STYLES.main }}
				opacity={props.touchableOpacity ? props.touchableOpacity : 0.1}
				onPress={
					props.onPress
						? props.onPress
						: () => alert('Pass a onPress function.')
				}
			>
				{/* onPress={props.onPress} */}
				<View
					style={{
						...STYLES.innerCon,
						...props.style,
						...btnStyles,
						...disabledStyles,
					}}
				>
					<BodyText
						textalign={props.textalign ? props.textalign : 'center'}
						fontfamily={props.fontfamily ? props.fontfamily : 'regular'}
						fontsize={
							props.fontsize ? props.fontsize : CONFIG.SMALL_BTN_TEXT_SIZE
						}
						style={{ ...STYLES.text, ...textStyles }}
					>
						{props.children}
					</BodyText>
				</View>
			</BaseTouchable>
		</View>
	);
};

const STYLES = StyleSheet.create({
	wrapper: {
		overflow:
			Platform.OS === 'android' && Platform.Version >= 21
				? 'hidden'
				: 'visible',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: CONFIG.GREY,
	},
	main: {
		width: '100%',
		height: '100%',
	},
	innerCon: {
		paddingVertical: 6,
		paddingHorizontal: 20,
	},
	whiteBtn: {
		backgroundColor: CONFIG.WHITE,
	},
	whiteBtnText: {
		color: CONFIG.TEXT_COLOR,
	},
	primaryBtn: {
		backgroundColor: CONFIG.PRIMARY,
	},
	primaryBtnText: {
		color: CONFIG.WHITE,
	},
	disabledStyles: {
		backgroundColor: CONFIG.GREY,
	},
	text: {
		textTransform: 'capitalize',
		letterSpacing: 0.4,
	},
});

export default SmallButton;
