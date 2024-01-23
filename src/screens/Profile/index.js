import React, { useState, useEffect, useReducer } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as CONFIG from './../../config';
import * as ACTIONS from './../../store/actions';
import BodyText from './../../components/BodyText';
import SmallButton from './../../components/SmallButton';
import ImageCard from './../../components/ImageCard';
import ImagePicker from './../../components/ImagePicker';
import UserInfoRow from './../../components/UserInfoRow';
import HeaderButtonItem from './../../components/HeaderButtonItem';

// ************************************************************************

const FORM_INPUT_CHANGED = 'FORM_INPUT_CHANGED';
const IMAGE_CHANGED = 'IMAGE_CHANGED';
const SET_FORM_VALUES = 'SET_FORM_VALUES';

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
			// console.log("Profile === FORM_STATE_REDUCER == FORM_INPUT_CHANGED = ", {
			//   action,
			// });
			return {
				inputValues: updatedValues,
				inputValideties: updatedValideties,
				isvalid: updatedIsFormValid,
			};
		case IMAGE_CHANGED:
			let imagesClone = [];
			if (state.inputValues && state.inputValues.profileImages) {
				imagesClone = state.inputValues.profileImages.map((el) => {
					if (el.order == action.payload.order) {
						el.url = action.payload.url;
					}
					return el;
				});
			} else {
				let newItem = { url: action.payload.url, order: action.payload.order };
				imagesClone.push(newItem);
			}
			const updatedValues2 = {
				...state.inputValues,
				profileImages: imagesClone,
			};
			const updatedValideties2 = {
				...state.inputValideties,
				profileImages: true,
			};
			let updatedIsFormValid2 = true;
			for (let key in updatedValideties) {
				updatedIsFormValid = updatedIsFormValid && updatedValideties[key];
			}
			return {
				inputValues: updatedValues2,
				inputValideties: updatedValideties2,
				isvalid: updatedIsFormValid2,
			};
		case SET_FORM_VALUES:
			const updatedValues3 = {
				...action.payload.inputValues,
			};
			const updatedValideties3 = {
				...action.payload.inputValideties,
			};
			let updatedIsFormValid3 = true;
			for (let key in updatedValideties) {
				updatedIsFormValid = updatedIsFormValid && updatedValideties[key];
			}
			// console.log("Profile === FORM_STATE_REDUCER == SET_FORM_VALUES = ", {
			//   updatedValues3,
			//   updatedValideties3,
			// });
			return {
				inputValues: updatedValues3,
				inputValideties: updatedValideties3,
				isvalid: updatedIsFormValid3,
			};
		default:
			return state;
	}
};

const Profile = (props) => {
	const dispatch = useDispatch();

	const [profileInfochange, setProfileInfoChange] = useState(false);

	const [uploadedPhotosCount, setUploadedPhotosCount] = useState(0);
	const [profileImage, setProfileImage] = useState(null);

	const SCREEN_IS_FOUCED = useIsFocused();
	const isLoggedIn = useSelector((store) => store.authR.isLoggedIn);
	const profileData = useSelector((store) => store.userR.profileData);

	const [formState, dispatcherFormState] = useReducer(FORM_STATE_REDUCER, {
		inputValues: {
			...profileData,
		},
		inputValideties: {
			name: false,
			age: false,
			gender: false,
			constellations: false,
			hometown: false,
			language: false,
			profileImages: false,
		},
		isvalid: false,
	});

	useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => {
				return (
					<HeaderButtons HeaderButtonComponent={HeaderButtonItem}>
						<Item
							title='Submit'
							iconName='checkmark'
							color={CONFIG.PRIMARY}
							iconSize={23}
							onPress={formSubmitHandler}
						/>
					</HeaderButtons>
				);
			},
		});
	}, []);

	useEffect(() => {
		if (SCREEN_IS_FOUCED) {
			if (!isLoggedIn) {
				props.navigation.navigate({ name: 'app_landing_screen' });
			}
		}
	}, [isLoggedIn]);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			(async function () {
				dispatch(ACTIONS.setIsLoadingFalse());
				await getProfileData();
			})();

			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	const navigateToRoleSelectHandler = () => {
		if (profileInfochange) {
			Alert.alert(
				'Save Changes',
				'profile info changed, do you want to save changes?',
				[
					{ text: 'Cancel' },
					{
						text: 'No',
						onPress: () => {
							props.navigation.navigate({ name: 'role_select_screen' });
						},
					},
					{
						text: 'Yes',
						onPress: () => {
							formSubmitHandler();
						},
					},
				]
			);
		} else {
			props.navigation.navigate({ name: 'role_select_screen' });
		}
	};

	const getProfileData = async () => {
		dispatch(ACTIONS.setIsLoadingTrue());
		const result = await dispatch(ACTIONS.fetchProfile());
		console.log('Profile === getProfileData == result = ', { result });
		if (!result.success) {
			dispatch(ACTIONS.setIsLoadingFalse());
			Alert.alert(
				'Error',
				result.message
					? result.message
					: 'error occured while fetching profile data, try again!',
				[{ text: 'OKAY' }]
			);
			return;
		} else {
			await setProfileDataLocally(result.data);
			dispatch(ACTIONS.setIsLoadingFalse());
			return;
		}
	};

	const setProfileDataLocally = async (userProfileData) => {
		// Form Data
		let profileImages = userProfileData.profileImages.map((el) => {
			return { id: el.id, order: el.oder, url: el.url };
		});
		// Way 1
		// const inputValues = {
		//   name: userProfileData.name,
		//   age: userProfileData.age,
		//   gender: userProfileData.gender,
		//   constellations: userProfileData.constellations,
		//   hometown: userProfileData.hometown,
		//   language: userProfileData.language,
		//   profileImages: profileImages,
		// };
		// const inputValideties = {
		//   name: !!userProfileData.name,
		//   age: !!userProfileData.age,
		//   gender: !!userProfileData.gender,
		//   constellations: !!userProfileData.constellations,
		//   hometown: !!userProfileData.hometown,
		//   language: !!userProfileData.language,
		//   profileImages: profileImages.length > 0,
		// };
		// const dispatchData = {
		//   type: SET_FORM_VALUES,
		//   payload: {
		//     inputValues: inputValues,
		//     inputValideties: inputValideties,
		//   },
		// };
		// console.log("Profile === setProfileDataLocally == formState = ", {
		//   dispatchData,
		// });
		// await dispatcherFormState(dispatchData);
		// Way 2
		userProfileData.name
			? await inputChangedHandler({
					id: 'name',
					value: userProfileData.name,
					isvalid: true,
			  })
			: null;
		userProfileData.age
			? await inputChangedHandler({
					id: 'age',
					value: userProfileData.age,
					isvalid: true,
			  })
			: null;
		userProfileData.constellations
			? await inputChangedHandler({
					id: 'constellations',
					value: userProfileData.constellations,
					isvalid: true,
			  })
			: null;
		userProfileData.hometown
			? await inputChangedHandler({
					id: 'hometown',
					value: userProfileData.hometown,
					isvalid: true,
			  })
			: null;
		userProfileData.gender
			? await inputChangedHandler({
					id: 'gender',
					value: userProfileData.gender,
					isvalid: true,
			  })
			: null;
		userProfileData.hometown
			? await inputChangedHandler({
					id: 'hometown',
					value: userProfileData.hometown,
					isvalid: true,
			  })
			: null;
		userProfileData.language
			? await inputChangedHandler({
					id: 'language',
					value: userProfileData.language,
					isvalid: true,
			  })
			: null;

		for (let i = 0; i < userProfileData.profileImages.length; i++) {
			await dispatcherFormState({
				type: IMAGE_CHANGED,
				payload: {
					order: userProfileData.profileImages[i].order,
					url: userProfileData.profileImages[i].url,
				},
			});
		}

		// Set Photos Count
		await setUploadedPhotosCount(userProfileData.profileImages.length);
	};

	const inputChangedHandler = async (data) => {
		//data: {id, value, isvalid}
		// await setProfileInfoChange(true);
		// console.log("Profile === inputChangedHandler == data = ", { data });
		await dispatcherFormState({
			type: FORM_INPUT_CHANGED,
			payload: data,
		});
	};

	const imageChangedHandler = async (imageOrderNo, imageNewUrl) => {
		//data: {id, value, isvalid}
		dispatch(ACTIONS.setIsLoadingTrue());
		const imageOrderNoString = imageOrderNo.toString();
		const result = await dispatch(
			ACTIONS.uploadProfileImage(imageNewUrl.base64, imageOrderNoString)
		);
		dispatch(ACTIONS.setIsLoadingFalse());
		if (!result.success) {
			Alert.alert(
				'Error',
				result.message
					? result.message
					: 'Error occured while processing request!',
				[{ text: 'OKAY' }]
			);
		}
	};

	const formSubmitHandler = async () => {
		// if (!formState.isvalid) {
		//   Alert.alert("Invalid Data", "Enter Valid Data!", [{ text: "OKAY" }]);
		//   return;
		// }
		try {
			dispatch(ACTIONS.setIsLoadingTrue());
			const updatedProfileData = { ...formState.inputValues };
			console.log('Profile === formSubmitHandler == res = ', {
				updatedProfileData,
			});
			const result = await dispatch(ACTIONS.updateProfile(updatedProfileData));
			if (!result.success) {
				Alert.alert(
					'Error',
					result.message
						? result.message
						: 'Error occured while processing request, try again!',
					[{ text: 'OKAY' }]
				);
			} else {
			}
			dispatch(ACTIONS.setIsLoadingFalse());
		} catch (error) {
			dispatch(ACTIONS.setIsLoadingFalse());
			Alert.alert(
				'Error Occured',
				'Error occured while submitting form, try again!',
				[{ text: 'OKAY' }]
			);
			return;
		}
	};

	if (!profileData) {
		return null;
	} else {
		return (
			<ScrollView contentContainerStyle={STYLES.bgWhite}>
				<View style={STYLES.main}>
					<View style={STYLES.section1}>
						<View style={STYLES.section1_leftside}>
							<BodyText
								style={STYLES.uploadPhotoText}
								fontsize={18}
								fontfamily='medium'
							>
								Upload photo ({uploadedPhotosCount}/9)
							</BodyText>
							<View style={STYLES.smallBtnCon}>
								<ImagePicker
									onImageSelect={(image) => imageChangedHandler(0, image)}
								>
									{/* '0' means first/profile image of user, then 1-8 small box images */}
									<SmallButton style={STYLES.smallBtn}>
										Local Pictures
									</SmallButton>
								</ImagePicker>
							</View>
							<View style={STYLES.smallBtnCon}>
								<SmallButton
									style={STYLES.smallBtn}
									color='primary'
								>
									PikyMe Avatar
								</SmallButton>
							</View>
						</View>
						<View style={STYLES.section1_rightside}>
							<ImageCard
								onImageSelect={(image) => {
									// console.log("Profile === ImageCard/onImageSelect == res = ", {
									//   image,
									// });
									imageChangedHandler(0, image);
									/* '0' means first/profile image of user, then 1-8 small box images */
								}}
								imageOrderNumber='0'
								defaultImage={
									profileData.profileImages &&
									profileData.profileImages.length > 0
										? profileData.profileImages[0].url
										: null
								}
							></ImageCard>
						</View>
					</View>
				</View>
				<View style={STYLES.section2}>
					<View style={STYLES.section2_row}>
						{/* image order no - 1 */}
						<View style={STYLES.section2_imageCardCon}>
							<ImageCard
								defaultImage={
									profileData.profileImages &&
									profileData.profileImages.length > 1
										? profileData.profileImages[1].url
										: null
								}
								onImageSelect={(image) => {
									// console.log("Profile === ImageCard/onImageSelect == res = ", {
									//   image,
									// });
									imageChangedHandler(1, image);
									/* '0' means first/profile image of user, then 1-8 small box images */
								}}
							></ImageCard>
						</View>
						{/* image order no - 2 */}
						<View style={STYLES.section2_imageCardCon}>
							<ImageCard
								defaultImage={
									profileData.profileImages &&
									profileData.profileImages.length > 2
										? profileData.profileImages[2].url
										: null
								}
								onImageSelect={(image) => {
									// console.log("Profile === ImageCard/onImageSelect == res = ", {
									//   image,
									// });
									imageChangedHandler(2, image);
									/* '0' means first/profile image of user, then 1-8 small box images */
								}}
							></ImageCard>
						</View>
						{/* image order no - 3 */}
						<View style={STYLES.section2_imageCardCon}>
							<ImageCard
								defaultImage={
									profileData.profileImages &&
									profileData.profileImages.length > 3
										? profileData.profileImages[3].url
										: null
								}
								onImageSelect={(image) => {
									// console.log("Profile === ImageCard/onImageSelect == res = ", {
									//   image,
									// });
									imageChangedHandler(3, image);
									/* '0' means first/profile image of user, then 1-8 small box images */
								}}
							></ImageCard>
						</View>
						{/* image order no - 4 */}
						<View style={STYLES.section2_imageCardCon}>
							<ImageCard
								defaultImage={
									profileData.profileImages &&
									profileData.profileImages.length > 4
										? profileData.profileImages[4].url
										: null
								}
								onImageSelect={(image) => {
									// console.log("Profile === ImageCard/onImageSelect == res = ", {
									//   image,
									// });
									imageChangedHandler(4, image);
									/* '0' means first/profile image of user, then 1-8 small box images */
								}}
							></ImageCard>
						</View>
					</View>
					<View style={STYLES.section2_row}>
						{/* image order no - 5 */}
						<View style={STYLES.section2_imageCardCon}>
							<ImageCard
								defaultImage={
									profileData.profileImages &&
									profileData.profileImages.length > 5
										? profileData.profileImages[5].url
										: null
								}
								onImageSelect={(image) => {
									// console.log("Profile === ImageCard/onImageSelect == res = ", {
									//   image,
									// });
									imageChangedHandler(5, image);
									/* '0' means first/profile image of user, then 1-8 small box images */
								}}
							></ImageCard>
						</View>
						{/* image order no - 6 */}
						<View style={STYLES.section2_imageCardCon}>
							<ImageCard
								defaultImage={
									profileData.profileImages &&
									profileData.profileImages.length > 6
										? profileData.profileImages[6].url
										: null
								}
								onImageSelect={(image) => {
									// console.log("Profile === ImageCard/onImageSelect == res = ", {
									//   image,
									// });
									imageChangedHandler(6, image);
									/* '0' means first/profile image of user, then 1-8 small box images */
								}}
							></ImageCard>
						</View>
						{/* image order no - 7 */}
						<View style={STYLES.section2_imageCardCon}>
							<ImageCard
								defaultImage={
									profileData.profileImages &&
									profileData.profileImages.length > 7
										? profileData.profileImages[7].url
										: null
								}
								onImageSelect={(image) => {
									// console.log("Profile === ImageCard/onImageSelect == res = ", {
									//   image,
									// });
									imageChangedHandler(7, image);
									/* '0' means first/profile image of user, then 1-8 small box images */
								}}
							></ImageCard>
						</View>
						{/* image order no - 8 */}
						<View style={STYLES.section2_imageCardCon}>
							<ImageCard
								defaultImage={
									profileData.profileImages &&
									profileData.profileImages.length > 8
										? profileData.profileImages[8].url
										: null
								}
								onImageSelect={(image) => {
									// console.log("Profile === ImageCard/onImageSelect == res = ", {
									//   image,
									// });
									imageChangedHandler(8, image);
									/* '0' means first/profile image of user, then 1-8 small box images */
								}}
							></ImageCard>
						</View>
					</View>
				</View>
				<View style={STYLES.section3}>
					{/* Name */}
					<UserInfoRow
						id='name'
						label='Name'
						selectedValue={formState.inputValues.name}
						onValueChange={(itemValue, itemIndex) => {
							console.log({ itemValue, itemIndex });
							inputChangedHandler({
								id: 'name',
								value: itemValue,
								isvalid: true,
							});
						}}
						listitems={[
							{ label: 'Java', value: 'java' },
							{ label: 'JavaScript', value: 'js' },
						]}
					/>
					{/* Age */}
					<UserInfoRow
						id='age'
						label='Age'
						selectedValue={formState.inputValues.age}
						onValueChange={(itemValue, itemIndex) => {
							console.log({ itemValue, itemIndex });
							inputChangedHandler({
								id: 'age',
								value: itemValue,
								isvalid: true,
							});
						}}
						listitems={[
							{ label: '25-30', value: '25-30' },
							{ label: '30-35', value: '30-35' },
						]}
					/>
					{/* Gender */}
					<UserInfoRow
						id='gender'
						label='Gender'
						selectedValue={formState.inputValues.gender}
						onValueChange={(itemValue, itemIndex) => {
							console.log({ itemValue, itemIndex });
							inputChangedHandler({
								id: 'gender',
								value: itemValue,
								isvalid: true,
							});
						}}
						listitems={[
							{ label: 'Male', value: 'male' },
							{ label: 'Female', value: 'female' },
							{ label: 'Non Binary', value: 'non-binary' },
						]}
					/>
					{/* Constellations */}
					<UserInfoRow
						id='constellations'
						label='Constellations'
						selectedValue={formState.inputValues.constellations}
						onValueChange={(itemValue, itemIndex) => {
							console.log({ itemValue, itemIndex });
							inputChangedHandler({
								id: 'constellations',
								value: itemValue,
								isvalid: true,
							});
						}}
						listitems={[
							{ label: 'Aries', value: 'Aries' },
							{ label: 'Taurus', value: 'Taurus' },
						]}
					/>
					{/* Hometown */}
					<UserInfoRow
						id='hometown'
						selectedValue={formState.inputValues.hometown}
						label='Hometown'
						onValueChange={(itemValue, itemIndex) => {
							console.log({ itemValue, itemIndex });
							inputChangedHandler({
								id: 'hometown',
								value: itemValue,
								isvalid: true,
							});
						}}
						listitems={[
							{ label: 'Ontario', value: 'Ontario' },
							{ label: 'Ontario2', value: 'Ontario2' },
						]}
					/>
					{/* Language */}
					<UserInfoRow
						id='language'
						label='Language'
						selectedValue={formState.inputValues.language}
						onValueChange={(itemValue, itemIndex) => {
							console.log({ itemValue, itemIndex });
							inputChangedHandler({
								id: 'language',
								value: itemValue,
								isvalid: true,
							});
						}}
						listitems={[
							{ label: 'English', value: 'English' },
							{ label: 'Franch', value: 'Franch' },
						]}
					/>
				</View>
				<View style={STYLES.section4}>
					<TouchableOpacity
						onPress={navigateToRoleSelectHandler}
						style={STYLES.section4_innerCon}
					>
						<BodyText style={STYLES.nextText}>Next</BodyText>
						<Ionicons
							name='arrow-forward'
							size={38}
							style={STYLES.nextIcon}
						/>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
};

const STYLES = StyleSheet.create({
	bgWhite: {
		backgroundColor: CONFIG.WHITE,
		flexGrow: 1,
	},
	main: {
		flex: 1,
		padding: 10,
	},
	section1: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
	},
	section1_leftside: {
		flex: 0.5,
	},
	uploadPhotoText: {},
	smallBtnCon: {
		marginVertical: 6,
	},
	smallBtn: {},
	section1_rightside: {
		flex: 0.4,
	},
	section2: {
		height: 200,
		marginBottom: 20,
		marginTop: 16,
		padding: 12,
	},
	section2_row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 6,
	},
	section2_imageCardCon: {
		flex: 1,
	},
	section3: {
		paddingHorizontal: 20,
	},
	// userinfo_row: {
	//   flex: 1,
	//   flexDirection: "row",
	//   justifyContent: "space-between",
	//   borderBottomWidth: 1,
	//   borderBottomColor: "#C4C4C4",
	//   paddingBottom: 4,
	//   marginBottom: 12,
	// },
	// userinfo_key: {
	//   flex: 1,
	// },
	// userinfo_keyText: {
	//   color: CONFIG.LIGHT_TEXT_COLOR,
	//   fontSize: 18,
	// },
	// userinfo_value: {
	//   flex: 1,
	//   justifyContent: "flex-end",
	//   alignItems: "center",
	//   flexDirection: "row",
	// },
	// userinfo_valueSelect: {
	//   height: 20,
	//   width: "86%",
	//   position: "relative",
	//   fontFamily: CONFIG.FONT_RUBIK_BOLD,
	//   backgroundColor: CONFIG.WHITE,
	// },
	// userinfo_valueSelectIcon: {
	//   fontSize: 18,
	//   position: "absolute",
	//   color: CONFIG.LIGHT_TEXT_COLOR,
	// },
	// userinfo_valueSelectText: {},
	section4: {
		padding: 20,
	},
	section4_innerCon: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	nextText: {
		fontSize: 18,
		marginRight: 10,
	},
	nextIcon: {},
});

export default Profile;
