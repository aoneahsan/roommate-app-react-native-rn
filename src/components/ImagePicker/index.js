// Core Imports
import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import {
	launchCameraAsync,
	getCameraPermissionsAsync,
	getMediaLibraryPermissionsAsync,
} from 'expo-image-picker';

const ImagePicker = (props) => {
	const checkPermissions = async () => {
		try {
			const cameraPermission = await getCameraPermissionsAsync();
			const mediaLibraryPermission = await getMediaLibraryPermissionsAsync();

			if (cameraPermission.granted && mediaLibraryPermission.granted) {
				return true;
			} else {
				Alert.alert(
					'Insufficient Permissions',
					'Need sufficient permissions to open camera.',
					[{ text: 'OKAY!!!' }]
				);
				return false;
			}
		} catch (error) {
			Alert.alert(
				'Error Occured',
				'error occured while asking for camera permissions, try restarting app.',
				[{ text: 'OKAY!!!' }]
			);
			return false;
		}
	};

	const imagePickerHandler = async () => {
		const validPermissions = await checkPermissions();
		if (!validPermissions) {
			return false;
		} else {
			const imageData = await launchCameraAsync({
				// allowsEditing: true,
				aspect: [1, 1],
				quality: 0.5,
				base64: true,
			});
			console.log('ImagePicker === imagePickerHandler == res = ', {
				imageData,
			});
			if (imageData.cancelled) {
				return;
			}
			props.onImageSelect(imageData);
		}
	};
	return (
		<TouchableOpacity onPress={imagePickerHandler}>
			{props.children}
		</TouchableOpacity>
	);
};

export default ImagePicker;
