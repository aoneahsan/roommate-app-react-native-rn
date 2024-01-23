// Core Imports
import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import * as EXPO_PERMISSIONS from "expo-permissions";
import * as EXPO_IMAGE_PICKER from "expo-image-picker";

// Custom Imports
import * as CONFIG from "../../config";

const ImagePicker = (props) => {
  const checkPermissions = async () => {
    try {
      const permissions = await EXPO_PERMISSIONS.askAsync(
        EXPO_PERMISSIONS.CAMERA,
        EXPO_PERMISSIONS.CAMERA_ROLL
      );
      if (permissions.status !== "granted") {
        Alert.alert(
          "Insufficient Permissions",
          "Need sufficient permissions to open camera.",
          [{ text: "OKAY!!!" }]
        );
        return false;
      } else {
        return true;
      }
    } catch (error) {
      Alert.alert(
        "Error Occured",
        "error occured while asking for camera permissions, try restarting app.",
        [{ text: "OKAY!!!" }]
      );
      return false;
    }
  };

  const imagePickerHandler = async () => {
    const validPermissions = await checkPermissions();
    if (!validPermissions) {
      return false;
    } else {
      const imageData = await EXPO_IMAGE_PICKER.launchCameraAsync({
        // allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });
      console.log("ImagePicker === imagePickerHandler == res = ", {
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
