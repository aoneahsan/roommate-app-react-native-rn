import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as CONFIG from '../../config';
import Card from '../Card';
import BodyText from '../BodyText';

const ProgressBar = (props) => {
	return (
		<View style={STYLES.progressBarCon}>
			{!props.hideTopText && (
				<BodyText
					style={{
						...STYLES.progressBarScoreText,
						...{ marginBottom: 8, marginTop: 10 },
					}}
				>
					{props.topText}
				</BodyText>
			)}
			<Card
				style={{
					...STYLES.progressBarBg,
					height: props.height ? props.height : 40,
				}}
			>
				<View
					style={{
						...STYLES.progressBar,
						...{
							width: props.progress < 11 ? 10 + '%' : props.progress + '%',
						},
					}}
				>
					<BodyText
						style={{
							...STYLES.progressBarText,
							fontSize: props.progress < 11 ? 18 : 24,
						}}
					>
						{props.progress}%
					</BodyText>
				</View>
			</Card>
			{!props.hideBottomText && (
				<BodyText
					style={{ ...STYLES.progressBarScoreText, ...{ marginTop: 10 } }}
				>
					{props.bottomText}
				</BodyText>
			)}
		</View>
	);
};

const STYLES = StyleSheet.create({
	progressBarCon: {
		paddingHorizontal: 20,
	},
	progressBarBg: {},
	progressBar: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: CONFIG.PRIMARY,
		borderRadius: 50,
		height: '100%',
	},
	progressBarText: {
		color: CONFIG.WHITE,
	},
	progressBarScoreText: {
		color: CONFIG.LIGHT_TEXT_COLOR,
		fontSize: 14,
		marginLeft: 10,
	},
});

export default ProgressBar;
