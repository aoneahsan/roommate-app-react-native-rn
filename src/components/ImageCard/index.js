// Core Imports
import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Custom Imports
import * as CONFIG from "../../config";
// import BodyText from "../BodyText";
import ImagePicker from "../ImagePicker";
// import Avatar from "./../../../assets/images/avatar.png";

const ImageCard = (props) => {
  const [pickedImage, setPickedImage] = useState(null);
  const [cardWidth, setCardWidth] = useState(40);

  // useEffect(() => {
  //   if (props.defaultImage) {
  //     setPickedImage(props.defaultImage);
  //   }
  // }, []);

  const onCardLayout = (event) => {
    const cardLayout = event.nativeEvent.layout;
    const { width } = cardLayout;
    // console.log("ImageCard === onCardLayout == ", { cardLayout });
    setCardWidth(width);
  };

  const imageSelectHandler = (image) => {
    // console.log("ImageCard === imageSelectHandler == res = ", { image });
    setPickedImage(image);
    if (props.onImageSelect) {
      props.onImageSelect(image);
    } else {
      alert("pass a 'onImageSelect' prop");
    }
  };

  return (
    <ImagePicker style={STYLES.wrapper} onImageSelect={imageSelectHandler}>
      <View style={STYLES.main} onLayout={onCardLayout}>
        <View
          style={{
            ...STYLES.innerCon,
            ...{
              borderRadius: cardWidth / 7,
            },
          }}
        >
          <View
            style={{
              ...STYLES.card,
              ...{
                borderRadius: cardWidth / 7,
              },
            }}
          >
            {!pickedImage && (
              <Ionicons
                name="add"
                color={CONFIG.LIGHT_TEXT_COLOR}
                style={STYLES.icon}
                size={cardWidth / 2}
              />
            )}
            {pickedImage && (
              <Image
                source={{ uri: pickedImage.uri }}
                style={{
                  ...STYLES.image,
                  ...{
                    borderRadius: cardWidth / 7,
                  },
                }}
              />
            )}
          </View>
        </View>
      </View>
    </ImagePicker>
  );
};

const STYLES = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
  },
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCon: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    height: "90%",
    elevation: 9,
    borderColor: CONFIG.WHITE,
    backgroundColor: CONFIG.WHITE,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  icon: {
    marginLeft: 6,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default ImageCard;
