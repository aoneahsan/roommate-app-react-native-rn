// Core Imports
import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import RNPickerSelect from "react-native-picker-select";
// import { Picker } from "@react-native-picker/picker";
// import { NavigationActions } from "react-navigation";

// Custom Imports
import * as CONFIG from "./../../config";
import BodyText from "./../../components/BodyText";
import SmallButton from "./../../components/SmallButton";
import ImageCard from "./../../components/ImageCard";
import ImagePicker from "./../../components/ImagePicker";
import UserInfoRow from "./../../components/UserInfoRow";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    // this.localImagePickerRef = React.createRef();
  }

  state = {
    uploaded_photos_count: 0,
    profileImage: null,
  };

  componentDidMount() {
    // this.props.navigation.navigate({ name: "auth_screen" });
    const props = this.props;
    // console.log(props.route.params);
  }

  navigateToRoleSelectHandler = () => {
    this.props.navigation.navigate({ name: "role_select_screen" });
  };

  render() {
    const { uploaded_photos_count, profileImage } = this.state;
    const selectedItem = {
      title: "Selected item title",
      description: "Secondary long descriptive text ...",
    };

    return (
      <ScrollView contentContainerStyle={STYLES.bgWhite}>
        <View style={STYLES.main}>
          <View style={STYLES.section1}>
            <View style={STYLES.section1_leftside}>
              <BodyText
                style={STYLES.uploadPhotoText}
                fontsize={18}
                fontfamily="medium"
              >
                Upload photo ({uploaded_photos_count}/9)
              </BodyText>
              <View style={STYLES.smallBtnCon}>
                <ImagePicker>
                  <SmallButton style={STYLES.smallBtn}>
                    Local Pictures
                  </SmallButton>
                </ImagePicker>
              </View>
              <View style={STYLES.smallBtnCon}>
                <SmallButton style={STYLES.smallBtn} color="primary">
                  PikyMe Avatar
                </SmallButton>
              </View>
            </View>
            <View style={STYLES.section1_rightside}>
              <ImageCard
                onImageSelect={(image) => {
                  console.log("Profile === ImageCard/onImageSelect == res = ", {
                    image,
                  });
                }}
                defaultImage={profileImage}
              ></ImageCard>
            </View>
          </View>
        </View>
        <View style={STYLES.section2}>
          <View style={STYLES.section2_row}>
            <View style={STYLES.section2_imageCardCon}>
              <ImageCard></ImageCard>
            </View>
            <View style={STYLES.section2_imageCardCon}>
              <ImageCard></ImageCard>
            </View>
            <View style={STYLES.section2_imageCardCon}>
              <ImageCard></ImageCard>
            </View>
            <View style={STYLES.section2_imageCardCon}>
              <ImageCard></ImageCard>
            </View>
          </View>
          <View style={STYLES.section2_row}>
            <View style={STYLES.section2_imageCardCon}>
              <ImageCard></ImageCard>
            </View>
            <View style={STYLES.section2_imageCardCon}>
              <ImageCard></ImageCard>
            </View>
            <View style={STYLES.section2_imageCardCon}>
              <ImageCard></ImageCard>
            </View>
            <View style={STYLES.section2_imageCardCon}>
              <ImageCard></ImageCard>
            </View>
          </View>
        </View>
        <View style={STYLES.section3}>
          {/* Name */}
          <UserInfoRow
            label="Name"
            selectedValue="java"
            onValueChange={(itemValue, itemIndex) =>
              console.log({ itemValue, itemIndex })
            }
            listitems={[
              { label: "Java", value: "java" },
              { label: "JavaScript", value: "js" },
            ]}
          />
          {/* Age */}
          <UserInfoRow
            label="Age"
            onValueChange={(itemValue, itemIndex) =>
              console.log({ itemValue, itemIndex })
            }
            listitems={[
              { label: "25-30", value: "25-30" },
              { label: "30-35", value: "30-35" },
            ]}
          />
          {/* Gender */}
          <UserInfoRow
            label="Gender"
            onValueChange={(itemValue, itemIndex) =>
              console.log({ itemValue, itemIndex })
            }
            listitems={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Non Binary", value: "non-binary" },
            ]}
          />
          {/* Constellations */}
          <UserInfoRow
            label="Constellations"
            onValueChange={(itemValue, itemIndex) =>
              console.log({ itemValue, itemIndex })
            }
            listitems={[
              { label: "Aries", value: "Aries" },
              { label: "Taurus", value: "Taurus" },
            ]}
          />
          {/* Hometown */}
          <UserInfoRow
            label="Hometown"
            onValueChange={(itemValue, itemIndex) =>
              console.log({ itemValue, itemIndex })
            }
            listitems={[
              { label: "Ontario", value: "Ontario" },
              { label: "Ontario2", value: "Ontario2" },
            ]}
          />
          {/* Language */}
          <UserInfoRow
            label="Language"
            onValueChange={(itemValue, itemIndex) =>
              console.log({ itemValue, itemIndex })
            }
            listitems={[
              { label: "English", value: "English" },
              { label: "Franch", value: "Franch" },
            ]}
          />
        </View>
        <View style={STYLES.section4}>
          <TouchableOpacity
            onPress={this.navigateToRoleSelectHandler}
            style={STYLES.section4_innerCon}
          >
            <BodyText style={STYLES.nextText}>Next</BodyText>
            <Ionicons name="arrow-forward" size={38} style={STYLES.nextIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

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
    flexDirection: "row",
    justifyContent: "space-between",
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
    flexDirection: "row",
    justifyContent: "space-between",
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
    flexDirection: "row",
    alignItems: "center",
  },
  nextText: {
    fontSize: 18,
    marginRight: 10,
  },
  nextIcon: {},
});

export default Profile;
