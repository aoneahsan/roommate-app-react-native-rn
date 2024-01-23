import React, { useReducer } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import * as CONFIG from '../../config';
import BodyText from '../BodyText';

const INPUT_CHANGED = 'INPUT_CHANGED';
const INPUT_BLUR = 'INPUT_BLUR';

const inputStateReducer = (state, action) => {
	switch (action.type) {
		case INPUT_CHANGED:
			return {
				...state,
				value: action.value,
				isvalid: action.isvalid,
			};
		case INPUT_BLUR:
			return {
				...state,
				touched: true,
			};
		default:
			return state;
	}
};

const Input = (props) => {
	const [inputState, inputStateDispatcher] = useReducer(inputStateReducer, {
		value: props.value ? props.value : '',
		isvalid: props.isvalid ? props.isvalid : false,
		touched: false,
	});

	const inputChangeHandler = (inputvalue) => {
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isvalid = true;
		if (props.required != null && inputvalue.trim().length == 0 && isvalid) {
			isvalid = false;
			alert(1);
		}
		if (props.email && !emailRegex.test(inputvalue.toLowercase()) && isvalid) {
			isvalid = false;
			alert(2);
		}
		if (
			isNaN(inputvalue) &&
			(props.max != null || props.min != null) &&
			isvalid
		) {
			alert(3);
			isvalid = false;
		}
		if (props.min && +inputvalue < props.min && isvalid) {
			alert(4);
			isvalid = false;
		}
		if (props.max && +inputvalue > props.max && isvalid) {
			alert(5);
			isvalid = false;
		}
		if (props.minlength && inputvalue.length < props.minlength && isvalid) {
			alert(6);
			isvalid = false;
		}
		if (props.maxlength && inputvalue.length > props.maxlength && isvalid) {
			alert(7);
			isvalid = false;
		}
		// parent event to store input value in parent
		if (props.onChange) {
			props.onChange({
				id: props.id,
				value: inputvalue,
				isvalid: isvalid,
			});
		}

		// local dispatch to update input value in UI
		inputStateDispatcher({
			type: INPUT_CHANGED,
			value: inputvalue,
			isvalid: isvalid,
		});
	};

	const onLostFoucs = () => {
		inputStateDispatcher({
			type: INPUT_BLUR,
		});
	};

	if (props.labeloutside) {
		return (
			<View style={{ ...props.style }}>
				{!props.hidelabel && (
					<BodyText
						style={{
							...STYLES.formInputTitle,
							...{
								marginLeft: 10,
								marginBottom: 4,
							},
							...props.labelStyle,
						}}
					>
						{props.label}
					</BodyText>
				)}
				<View
					style={{
						...STYLES.formInputGroup,
						...{
							borderRadius: props.radius ? props.radius : 50,
						},
						...props.inputGroupStyle,
					}}
				>
					<TextInput
						value={inputState.value}
						onChangeText={inputChangeHandler}
						style={STYLES.formInput}
						{...props}
						keyboardType={
							props.number
								? 'decimal-pad'
								: props.email
								? 'email-address'
								: props.phone
								? 'phone-pad'
								: props.url
								? 'url'
								: props.password
								? 'visible-password'
								: 'default'
						}
						placeholder={props.placeholder}
						onBlur={onLostFoucs}
					/>
				</View>
				{!inputState.isvalid && inputState.touched && (
					<View style={STYLES.errorTextCon}>
						<BodyText style={STYLES.errorText}>
							{props.errorMessage ? props.errorMessage : 'Required!'}
						</BodyText>
					</View>
				)}
			</View>
		);
	} else {
		return (
			<View style={{ ...STYLES.main, ...props.style }}>
				<View
					style={{
						...STYLES.formInputGroup,
						...{
							borderRadius: props.radius ? props.radius : 50,
							...props.inputGroupStyle,
						},
					}}
				>
					{!props.hidelabel && (
						<BodyText style={{ ...STYLES.formInputTitle, ...props.labelStyle }}>
							{props.label}
						</BodyText>
					)}
					<TextInput
						{...props}
						value={inputState.value}
						onChangeText={inputChangeHandler}
						style={{ ...STYLES.formInput, ...props.inputStyle }}
						keyboardType={
							props.number
								? 'decimal-pad'
								: props.email
								? 'email-address'
								: props.phone
								? 'phone-pad'
								: props.url
								? 'url'
								: props.password
								? 'visible-password'
								: 'default'
						}
						placeholder={props.placeholder}
						onBlur={onLostFoucs}
					/>
				</View>
				{!inputState.isvalid && inputState.touched && !props.hidevalidation && (
					<View style={STYLES.errorTextCon}>
						<BodyText style={STYLES.errorText}>
							{props.errorMessage ? props.errorMessage : 'Required!'}
						</BodyText>
					</View>
				)}
			</View>
		);
	}
};

const STYLES = StyleSheet.create({
	input: {
		fontFamily: CONFIG.FONT_RUBIK_REGULAR,
	},
	formInputGroup: {
		borderColor: CONFIG.LIGHT_TEXT_COLOR,
		borderWidth: 1,
		paddingLeft: 20,
		paddingVertical: 2,
	},
	formInputTitle: {
		fontSize: 14,
		color: CONFIG.BLACK,
		marginBottom: -6,
	},
	formInput: {
		padding: 0,
		margin: 0,
		fontSize: 14,
		fontFamily: CONFIG.FONT_RUBIK_BOLD,
	},
	errorTextCon: {
		width: '100%',
		paddingLeft: 10,
	},
	errorText: {
		width: '100%',
		color: CONFIG.RED,
		fontSize: 13,
	},
});

export default Input;
