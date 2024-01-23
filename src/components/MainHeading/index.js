import React from 'react';
import { StyleSheet } from 'react-native';

import * as CONFIG from '../../config';
import BodyText from '../BodyText';

const MainHeading = (props) => {
	return (
		<BodyText
			style={{ ...STYLES.heading, ...props.style }}
			fontfamily={props.fontfamily ? props.fontfamily : 'medium'}
			fontsize={props.fontsize ? props.fontsize : CONFIG.HEADING_SIZE}
			color={props.color}
			textalign={props.textalign}
		>
			{props.children}
		</BodyText>
	);
};

const STYLES = StyleSheet.create({
	heading: {},
});

export default MainHeading;
