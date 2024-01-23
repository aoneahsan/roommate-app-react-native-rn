// Core Imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';

import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';

// Custom Imports
import * as CONFIG from './../../config';
import BodyText from './../BodyText';

const CELL_COUNT = 4;

const CodeInput = (props) => {
	const [value, setValue] = useState('');
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [fieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	const [deviceWidth, setDeviceWidth] = useState(
		Dimensions.get('window').width
	);
	const cellSize = deviceWidth / 4 - 20;

	useEffect(() => {
		const updateDeviceWidth = () => {
			setDeviceWidth(Dimensions.get('window').width);
		};

		Dimensions.addEventListener('change', updateDeviceWidth);

		return () => {
			Dimensions.removeEventListener('change', updateDeviceWidth);
		};
	});

	useEffect(() => {
		if (props.onChange) {
			props.onChange(value);
		}
	}, [value]);

	return (
		<SafeAreaView style={STYLES.main}>
			<CodeField
				ref={ref}
				{...fieldProps}
				// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
				value={value}
				onChangeText={setValue}
				cellCount={CELL_COUNT}
				rootStyle={STYLES.codeFieldRoot}
				keyboardType='number-pad'
				textContentType='oneTimeCode'
				renderCell={({ index, symbol, isFocused }) =>
					isFocused ? (
						<BodyText
							key={index}
							style={{
								...STYLES.cell,
								...STYLES.focusCell,
								...{
									width: cellSize,
									height: cellSize,
									lineHeight: cellSize - 4,
									fontSize: cellSize / 2,
									borderRadius: cellSize / 3,
								},
							}}
							onLayout={getCellOnLayoutHandler(index)}
						>
							{symbol || (isFocused ? <Cursor /> : null)}
						</BodyText>
					) : (
						<BodyText
							key={index}
							style={{
								...STYLES.cell,
								...{
									width: cellSize,
									height: cellSize,
									lineHeight: cellSize - 4,
									fontSize: cellSize / 2,
									borderRadius: cellSize / 3,
								},
							}}
							onLayout={getCellOnLayoutHandler(index)}
						>
							{symbol || (isFocused ? <Cursor /> : null)}
						</BodyText>
					)
				}
			/>
		</SafeAreaView>
	);
};

const STYLES = StyleSheet.create({
	main: {
		// flex: 1,
		padding: 10,
	},
	codeFieldRoot: { marginTop: 20 },
	cell: {
		textAlign: 'center',
		backgroundColor: CONFIG.WHITE,
		elevation: 8,
		boxShadowColor: CONFIG.BLACK,
		boxShadowOffset: { width: 0, height: 2 },
		boxShadowOpacity: 0.6,
		boxShadowRadius: 10,
	},
	focusCell: {
		borderColor: '#000',
	},
});

export default CodeInput;
