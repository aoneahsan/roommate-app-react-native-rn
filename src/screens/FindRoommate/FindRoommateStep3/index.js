// Core Imports
import React, { useEffect, useReducer } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Custom Imports
import * as CONFIG from '../../../config';
import BodyText from '../../../components/BodyText';
import Chip from '../../../components/Chip';
import StepFooter from '../../../components/StepFooter';

const FORM_INPUT_CHANGED = 'FORM_INPUT_CHANGED';

const formStateReducer = (state, action) => {
	switch (action.type) {
		case FORM_INPUT_CHANGED:
			const updatedValues = {
				...state.inputValues,
				[action.payload.id]: action.payload.value,
			};
			const updatedValideties = {
				...state.inputValideties,
				[action.payload.id]: action.payload.isvalid,
			};
			let updatedIsFormValid = true;
			for (let key in updatedValideties) {
				updatedIsFormValid = updatedIsFormValid && updatedValideties[key];
			}
			return {
				inputValues: updatedValues,
				inputValideties: updatedValideties,
				formIsValid: updatedIsFormValid,
			};
		default:
			return state;
	}
};

const initFormState = {
	inputValues: {
		selected_date: new Date(),
		location: '',
		minvalue: '',
		maxvalue: '',
		place_preference: 'entire_place',
		building_Type: 'no_preference',
	},
	inputValideties: {
		selected_date: false,
		location: false,
		minvalue: false,
		maxvalue: false,
		place_preference: false,
		building_Type: false,
	},
	formIsValid: false,
};

const CHIPS_DATA_CHANGED = 'CHIPS_DATA_CHANGED';

const chipsStateReducer = (state, action) => {
	switch (action.type) {
		case CHIPS_DATA_CHANGED:
			const dataClone = [...state[action.id]];
			dataClone[action.index].checked = !action.checked; // because here "action.checked" will store the last value, hence user clicked on this chip so we should update it with value opposite to last value
			return {
				...state,
				[action.id]: dataClone,
			};
		default:
			return state;
	}
};

const FindRoommateStep3 = (props) => {
	const [formState, dispatcherFormState] = useReducer(
		formStateReducer,
		initFormState
	);

	const [chipsData, dispatchChipsData] = useReducer(chipsStateReducer, {
		cleanliness: [
			{ id: '1', value: 'Super Clean', checked: true },
			{ id: '2', value: 'Clean', checked: false },
			{ id: '3', value: 'Less Clean', checked: false },
			{ id: '4', value: 'Normal Clean', checked: false },
		],
		smoke: [
			{ id: '1', value: 'No', checked: true },
			{ id: '2', value: 'Yes', checked: false },
			{ id: '3', value: 'Other', checked: false },
		],
		pets: [
			{ id: '1', value: 'No', checked: true },
			{ id: '2', value: 'Yes', checked: false },
			{ id: '3', value: 'Depends on the pet', checked: false },
		],
		guests: [
			{ id: '1', value: 'No', checked: true },
			{ id: '2', value: 'Yes', checked: false },
			{ id: '3', value: 'Occasionally', checked: false },
		],
		occupation: [
			{ id: '1', value: 'Student', checked: true },
			{ id: '2', value: 'Have a work', checked: false },
			{ id: '3', value: 'Other', checked: false },
		],
		foodPreference: [
			{ id: '1', value: 'Vegan', checked: true },
			{ id: '2', value: 'Vegetarian', checked: false },
			{ id: '3', value: 'Other', checked: false },
		],
		workSchedule: [
			{ id: '1', value: 'Day Time', checked: true },
			{ id: '2', value: 'Night Time', checked: false },
			{ id: '3', value: 'Other', checked: false },
		],
	});

	const inputChangedHandler = (data) => {
		dispatcherFormState({
			type: FORM_INPUT_CHANGED,
			payload: data,
		});
	};

	const onChipSelectHandler = (data) => {
		dispatchChipsData(data);
	};

	const formSubmitHandler = async () => {
		if (!formState.formIsValid) {
			Alert.alert('Invalid Data', 'Enter Valid Data!', [{ text: 'OKAY' }]);
			return;
		}
		try {
			console.log('FindRoommateStep3 === formSubmitHandler == res = ', {
				formState,
			});
		} catch (error) {
			Alert.alert(
				'Error Occured',
				'Error occured while submitting form, try again!',
				[{ text: 'OKAY' }]
			);
			return;
		}
	};

	const navigateToFindRoommateStep4Screen = () => {
		props.navigation.navigate({ name: 'find_roommate_step4_screen' });
	};

	useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => {
				return (
					<HeaderButtons>
						<Item
							title='skip'
							color={CONFIG.BLACK}
							onPress={navigateToFindRoommateStep4Screen}
						/>
					</HeaderButtons>
				);
			},
		});
	}, []);

	return (
		<ScrollView contentContainerStyle={STYLES.bgWhite}>
			<View style={STYLES.main}>
				{/* Cleanliness */}
				<View style={STYLES.userinfoRowCon}>
					<View
						style={{ ...STYLES.userinfo_row, ...{ flexDirection: 'column' } }}
					>
						<View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
							<BodyText
								style={{
									...STYLES.userinfo_keyText,
									...{
										marginBottom: 10,
									},
								}}
							>
								Cleanliness
							</BodyText>
						</View>
						<View
							style={{
								...STYLES.userinfo_value,
								...{ flex: 1, justifyContent: 'flex-start', flexWrap: 'wrap' },
							}}
						>
							{chipsData.cleanliness.map((item, index) => {
								return (
									<Chip
										key={index}
										checked={item.checked}
										onPress={() =>
											onChipSelectHandler({
												id: 'cleanliness',
												index,
												checked: item.checked,
												type: CHIPS_DATA_CHANGED,
											})
										}
									>
										{item.value}
									</Chip>
								);
							})}
						</View>
					</View>
				</View>
				{/* Smoke */}
				<View style={STYLES.userinfoRowCon}>
					<View
						style={{ ...STYLES.userinfo_row, ...{ flexDirection: 'column' } }}
					>
						<View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
							<BodyText
								style={{
									...STYLES.userinfo_keyText,
									...{
										marginBottom: 10,
									},
								}}
							>
								Smoke
							</BodyText>
						</View>
						<View
							style={{
								...STYLES.userinfo_value,
								...{ flex: 1, justifyContent: 'flex-start', flexWrap: 'wrap' },
							}}
						>
							{chipsData.smoke.map((item, index) => {
								return (
									<Chip
										key={index}
										checked={item.checked}
										onPress={() =>
											onChipSelectHandler({
												id: 'smoke',
												index,
												checked: item.checked,
												type: CHIPS_DATA_CHANGED,
											})
										}
									>
										{item.value}
									</Chip>
								);
							})}
						</View>
					</View>
				</View>
				{/* Pets */}
				<View style={STYLES.userinfoRowCon}>
					<View
						style={{ ...STYLES.userinfo_row, ...{ flexDirection: 'column' } }}
					>
						<View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
							<BodyText
								style={{
									...STYLES.userinfo_keyText,
									...{
										marginBottom: 10,
									},
								}}
							>
								Pets
							</BodyText>
						</View>
						<View
							style={{
								...STYLES.userinfo_value,
								...{ flex: 1, justifyContent: 'flex-start', flexWrap: 'wrap' },
							}}
						>
							{chipsData.pets.map((item, index) => {
								return (
									<Chip
										key={index}
										checked={item.checked}
										onPress={() =>
											onChipSelectHandler({
												id: 'pets',
												index,
												checked: item.checked,
												type: CHIPS_DATA_CHANGED,
											})
										}
									>
										{item.value}
									</Chip>
								);
							})}
						</View>
					</View>
				</View>
				{/* Guests */}
				<View style={STYLES.userinfoRowCon}>
					<View
						style={{ ...STYLES.userinfo_row, ...{ flexDirection: 'column' } }}
					>
						<View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
							<BodyText
								style={{
									...STYLES.userinfo_keyText,
									...{
										marginBottom: 10,
									},
								}}
							>
								Guests
							</BodyText>
						</View>
						<View
							style={{
								...STYLES.userinfo_value,
								...{ flex: 1, justifyContent: 'flex-start', flexWrap: 'wrap' },
							}}
						>
							{chipsData.guests.map((item, index) => {
								return (
									<Chip
										key={index}
										checked={item.checked}
										onPress={() =>
											onChipSelectHandler({
												id: 'guests',
												index,
												checked: item.checked,
												type: CHIPS_DATA_CHANGED,
											})
										}
									>
										{item.value}
									</Chip>
								);
							})}
						</View>
					</View>
				</View>
				{/* Occupation */}
				<View style={STYLES.userinfoRowCon}>
					<View
						style={{ ...STYLES.userinfo_row, ...{ flexDirection: 'column' } }}
					>
						<View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
							<BodyText
								style={{
									...STYLES.userinfo_keyText,
									...{
										marginBottom: 10,
									},
								}}
							>
								Occupation
							</BodyText>
						</View>
						<View
							style={{
								...STYLES.userinfo_value,
								...{ flex: 1, justifyContent: 'flex-start', flexWrap: 'wrap' },
							}}
						>
							{chipsData.occupation.map((item, index) => {
								return (
									<Chip
										key={index}
										checked={item.checked}
										onPress={() =>
											onChipSelectHandler({
												id: 'occupation',
												index,
												checked: item.checked,
												type: CHIPS_DATA_CHANGED,
											})
										}
									>
										{item.value}
									</Chip>
								);
							})}
						</View>
					</View>
				</View>
				{/* Food Preference */}
				<View style={STYLES.userinfoRowCon}>
					<View
						style={{ ...STYLES.userinfo_row, ...{ flexDirection: 'column' } }}
					>
						<View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
							<BodyText
								style={{
									...STYLES.userinfo_keyText,
									...{
										marginBottom: 10,
									},
								}}
							>
								Food Preference
							</BodyText>
						</View>
						<View
							style={{
								...STYLES.userinfo_value,
								...{ flex: 1, justifyContent: 'flex-start', flexWrap: 'wrap' },
							}}
						>
							{chipsData.foodPreference.map((item, index) => {
								return (
									<Chip
										key={index}
										checked={item.checked}
										onPress={() =>
											onChipSelectHandler({
												id: 'foodPreference',
												index,
												checked: item.checked,
												type: CHIPS_DATA_CHANGED,
											})
										}
									>
										{item.value}
									</Chip>
								);
							})}
						</View>
					</View>
				</View>
				{/* Work Schedule */}
				<View style={STYLES.userinfoRowCon}>
					<View
						style={{ ...STYLES.userinfo_row, ...{ flexDirection: 'column' } }}
					>
						<View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
							<BodyText
								style={{
									...STYLES.userinfo_keyText,
									...{
										marginBottom: 10,
									},
								}}
							>
								Work Schedule
							</BodyText>
						</View>
						<View
							style={{
								...STYLES.userinfo_value,
								...{ flex: 1, justifyContent: 'flex-start', flexWrap: 'wrap' },
							}}
						>
							{chipsData.workSchedule.map((item, index) => {
								return (
									<Chip
										key={index}
										checked={item.checked}
										onPress={() =>
											onChipSelectHandler({
												id: 'workSchedule',
												index,
												checked: item.checked,
												type: CHIPS_DATA_CHANGED,
											})
										}
									>
										{item.value}
									</Chip>
								);
							})}
						</View>
					</View>
				</View>
			</View>
			<StepFooter
				currentStep='3'
				totalSteps='5'
				onPress={navigateToFindRoommateStep4Screen}
			></StepFooter>
		</ScrollView>
	);
};

const STYLES = StyleSheet.create({
	bgWhite: {
		backgroundColor: CONFIG.WHITE,
		flexGrow: 1,
	},
	main: {
		flex: 1,
		padding: 20,
	},
	userinfoRowCon: {
		marginBottom: 4,
	},
	userinfo_row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: CONFIG.BORDER_COLOR_LIGHT,
		paddingBottom: 8,
		marginBottom: 12,
	},
	userinfo_key: {
		flex: 0.65,
	},
	userinfo_keyText: {
		color: CONFIG.BLACK,
		fontSize: 16,
		fontFamily: CONFIG.FONT_RUBIK_SEMI_BOLD,
	},
	userinfo_value: {
		flex: 0.35,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	userinfo_valueInputCon: {
		flex: 0.48,
	},
	userinfo_valueInput: {
		// backgroundColor: "red",
	},
});

export default FindRoommateStep3;
