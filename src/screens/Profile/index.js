// Core Imports
import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";
import { NavigationActions } from "react-navigation";

// Custom Imports
import * as CONFIG from "./../../config";
import BodyText from "./../../components/BodyText";
import SmallButton from "./../../components/SmallButton";
import ImageCard from "./../../components/ImageCard";
import ImagePicker from "./../../components/ImagePicker";

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
              <ImageCard defaultImage={profileImage}></ImageCard>
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
          <View style={STYLES.userinfo_row}>
            <View style={STYLES.userinfo_key}>
              <BodyText style={STYLES.userinfo_keyText}>Name</BodyText>
            </View>
            <View style={STYLES.userinfo_value}>
              <Picker
                selectedValue="java"
                style={STYLES.userinfo_valueSelect}
                onValueChange={(itemValue, itemIndex) =>
                  console.log({ itemValue, itemIndex })
                }
                itemStyle={STYLES.userinfo_valueSelectText}
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
              <Ionicons
                name="chevron-forward"
                style={STYLES.userinfo_valueSelectIcon}
              />
            </View>
          </View>
          {/* Age */}
          <View style={STYLES.userinfo_row}>
            <View style={STYLES.userinfo_key}>
              <BodyText style={STYLES.userinfo_keyText}>Age</BodyText>
            </View>
            <View style={STYLES.userinfo_value}>
              <Picker
                selectedValue="25-30"
                style={STYLES.userinfo_valueSelect}
                onValueChange={(itemValue, itemIndex) =>
                  console.log({ itemValue, itemIndex })
                }
                itemStyle={STYLES.userinfo_valueSelectText}
              >
                <Picker.Item label="25-30" value="25-30" />
                <Picker.Item label="30-35" value="30-35" />
              </Picker>
              <Ionicons
                name="chevron-forward"
                style={STYLES.userinfo_valueSelectIcon}
              />
            </View>
          </View>
          {/* Gender */}
          <View style={STYLES.userinfo_row}>
            <View style={STYLES.userinfo_key}>
              <BodyText style={STYLES.userinfo_keyText}>Gender</BodyText>
            </View>
            <View style={STYLES.userinfo_value}>
              <Picker
                selectedValue="Male"
                style={STYLES.userinfo_valueSelect}
                onValueChange={(itemValue, itemIndex) =>
                  console.log({ itemValue, itemIndex })
                }
                itemStyle={STYLES.userinfo_valueSelectText}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Non Binary" value="non-binary" />
              </Picker>
              <Ionicons
                name="chevron-forward"
                style={STYLES.userinfo_valueSelectIcon}
              />
            </View>
          </View>
          {/* Constellations */}
          <View style={STYLES.userinfo_row}>
            <View style={STYLES.userinfo_key}>
              <BodyText style={STYLES.userinfo_keyText}>
                Constellations
              </BodyText>
            </View>
            <View style={STYLES.userinfo_value}>
              <Picker
                selectedValue="Aries"
                style={STYLES.userinfo_valueSelect}
                onValueChange={(itemValue, itemIndex) =>
                  console.log({ itemValue, itemIndex })
                }
                itemStyle={STYLES.userinfo_valueSelectText}
              >
                <Picker.Item label="Aries" value="Aries" />
                <Picker.Item label="Taurus" value="Taurus" />
              </Picker>
              <Ionicons
                name="chevron-forward"
                style={STYLES.userinfo_valueSelectIcon}
              />
            </View>
          </View>
          {/* Hometown */}
          <View style={STYLES.userinfo_row}>
            <View style={STYLES.userinfo_key}>
              <BodyText style={STYLES.userinfo_keyText}>Hometown</BodyText>
            </View>
            <View style={STYLES.userinfo_value}>
              <Picker
                selectedValue="Ontario"
                style={STYLES.userinfo_valueSelect}
                onValueChange={(itemValue, itemIndex) =>
                  console.log({ itemValue, itemIndex })
                }
                itemStyle={STYLES.userinfo_valueSelectText}
              >
                <Picker.Item label="Ontario" value="Ontario" />
                <Picker.Item label="Ontario2" value="Ontario2" />
              </Picker>
              <Ionicons
                name="chevron-forward"
                style={STYLES.userinfo_valueSelectIcon}
              />
            </View>
          </View>
          {/* Language */}
          <View style={STYLES.userinfo_row}>
            <View style={STYLES.userinfo_key}>
              <BodyText style={STYLES.userinfo_keyText}>Language</BodyText>
            </View>
            <View style={STYLES.userinfo_value}>
              <Picker
                selectedValue="English, Franch"
                style={STYLES.userinfo_valueSelect}
                onValueChange={(itemValue, itemIndex) =>
                  console.log({ itemValue, itemIndex })
                }
                itemStyle={STYLES.userinfo_valueSelectText}
              >
                <Picker.Item label="English, Franch" value="English, Franch" />
                <Picker.Item label="English" value="English" />
              </Picker>
              <Ionicons
                name="chevron-forward"
                style={STYLES.userinfo_valueSelectIcon}
              />
            </View>
          </View>
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
  userinfo_row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
    paddingBottom: 4,
    marginBottom: 12,
  },
  userinfo_key: {
    flex: 1,
  },
  userinfo_keyText: {
    color: CONFIG.LIGHT_TEXT_COLOR,
    fontSize: 18,
  },
  userinfo_value: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  userinfo_valueSelect: {
    height: 20,
    width: "86%",
    position: "relative",
    fontFamily: CONFIG.FONT_BOLD,
    backgroundColor: CONFIG.WHITE,
  },
  userinfo_valueSelectIcon: {
    fontSize: 18,
    position: "absolute",
    color: CONFIG.LIGHT_TEXT_COLOR,
  },
  userinfo_valueSelectText: {},
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
