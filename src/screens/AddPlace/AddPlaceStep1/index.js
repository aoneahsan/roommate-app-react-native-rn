import React, { useEffect, useReducer, useState } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Alert,
	TouchableOpacity,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import * as CONFIG from '../../../config';
import * as ACTIONS from './../../../store/actions';
import BodyText from '../../../components/BodyText';
import Input from '../../../components/Input';
import StepFooter from '../../../components/StepFooter';
import UserInfoRow from '../../../components/UserInfoRow';
import LocationPicker from '../../../components/LocationPicker';

// ******************************************************
const FORM_INPUT_CHANGED = 'FORM_INPUT_CHANGED';

const FORM_STATE_REDUCER = (state, action) => {
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

const INIT_FORM_STATE = {
	inputValues: {
		place_preference: 'entire_place',
		building_Type: 'no_preference',
	},
	inputValideties: {
		place_preference: false,
		building_Type: false,
	},
	formIsValid: false,
};

const AddPlaceStep1 = (props) => {
	const dispatch = useDispatch();
	const [showLocationPicker, setShowLocationPicker] = useState(false);
	const [formState, dispatcherFormState] = useReducer(
		FORM_STATE_REDUCER,
		INIT_FORM_STATE
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			(async function () {
				dispatch(ACTIONS.setIsLoadingFalse());
			})();

			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	const inputChangedHandler = (data) => {
		dispatcherFormState({
			type: FORM_INPUT_CHANGED,
			payload: data,
		});
	};

	const formSubmitHandler = async () => {
		if (!formState.formIsValid) {
			Alert.alert('Invalid Data', 'Enter Valid Data!', [{ text: 'OKAY' }]);
			return;
		}
		try {
			console.log('AddPlaceStep1 === formSubmitHandler == res = ', {
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

	const navigateToUserListScreen = () => {
		props.navigation.navigate('users_list_stack_screens', {
			screen: 'users_list_screen',
		});
	};

	useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => {
				return (
					<HeaderButtons>
						<Item
							title='cancel'
							color={CONFIG.BLACK}
							onPress={navigateToUserListScreen}
						/>
					</HeaderButtons>
				);
			},
		});
	}, []);

	const changeLocationPickerVisibilityStatus = (status) => {
		setShowLocationPicker(status);
	};

	return (
		<ScrollView contentContainerStyle={STYLES.bgWhite}>
			<View style={STYLES.main}>
				{/* Title */}
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
								Title
							</BodyText>
						</View>
						<View
							style={{
								...STYLES.userinfo_value,
							}}
						>
							<Input
								style={{ flex: 1 }}
								placeholder='Minimax 50 words'
								maxlength={50}
								hidelabel={true}
								multiline={true}
								numberOfLines={4}
								radius={6}
							></Input>
						</View>
					</View>
				</View>
				{/* Building Type */}
				<UserInfoRow
					label='Building Type'
					selectedValue='no_preference'
					onValueChange={(itemValue, itemIndex) =>
						console.log({ itemValue, itemIndex })
					}
					listitems={[
						{ id: '1', value: 'no_preference', label: 'No Preference' },
						{ id: '2', value: 'condo', label: 'Condo' },
						{ id: '3', value: 'apartment', label: 'Apartment' },
						{ id: '4', value: 'twon_house', label: 'TwonHouse' },
						{ id: '5', value: 'house', label: 'House' },
						{ id: '6', value: 'basement', label: 'Basement' },
					]}
				/>
				{/* Location */}
				<View style={STYLES.userinfoRowCon}>
					<View
						style={{
							...STYLES.userinfo_row,
							...{ flexDirection: 'row' },
						}}
					>
						<View style={{ ...STYLES.userinfo_key, ...{ flex: 0.4 } }}>
							<BodyText
								style={{
									...STYLES.userinfo_keyText,
									...{
										marginBottom: 10,
									},
								}}
							>
								Location
							</BodyText>
						</View>
						<TouchableOpacity
							style={{
								...{ flex: 0.6 },
							}}
							onPress={() => changeLocationPickerVisibilityStatus(true)}
						>
							<View
								style={{
									...STYLES.userinfo_value,
									...{ flex: 1 },
								}}
							>
								<BodyText
									style={{
										...STYLES.userinfo_valueText,
									}}
								>
									6 Huron St, Toronto ON, Caas
								</BodyText>
								<Ionicons
									style={{
										...STYLES.userinfo_valueIcon,
									}}
									name='chevron-forward'
									size={20}
									color={CONFIG.LIGHT_TEXT_COLOR}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				{/* Place */}
				<UserInfoRow
					label='Place'
					selectedValue='entire_place'
					onValueChange={(itemValue, itemIndex) =>
						console.log({ itemValue, itemIndex })
					}
					listitems={[
						{ id: '1', value: 'entire_place', label: 'Entire Place' },
						{ id: '2', value: 'shared_place', label: 'Shared Place' },
					]}
				/>
				{/* Rent Fee */}
				<UserInfoRow
					label='Rent Fee'
					selectedValue='CAD / Mon'
					onValueChange={(itemValue, itemIndex) =>
						console.log({ itemValue, itemIndex })
					}
					listitems={[
						{ id: '1', value: 'CAD / Mon', label: 'CAD / Mon' },
						{ id: '2', value: 'USD', label: 'USD' },
					]}
				/>
			</View>
			<StepFooter
				currentStep='1'
				totalSteps='5'
				onPress={navigateToUserListScreen}
			></StepFooter>
			{showLocationPicker && (
				<LocationPicker
					closemodal={() => changeLocationPickerVisibilityStatus(false)}
					visible={showLocationPicker}
					title='Pick Location'
				/>
			)}
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
		color: CONFIG.LIGHT_TEXT_COLOR,
		fontSize: 18,
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
	userinfo_valueText: {
		position: 'relative',
		paddingRight: 14,
	},
	userinfo_valueIcon: {
		fontSize: 18,
		position: 'absolute',
		color: CONFIG.LIGHT_TEXT_COLOR,
		right: 0,
	},
});

export default AddPlaceStep1;
