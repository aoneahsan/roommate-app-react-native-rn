// Core Imports
import React from "react";
import { StyleSheet, View, ScrollView, Picker } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Custom Imports
import * as CONFIG from "./../../config";
import BodyText from "./../../components/BodyText";
import SmallButton from "./../../components/SmallButton";

class Profile extends React.Component {
  state = {
    uploaded_photos_count: 0,
  };

  componentDidMount() {
    // this.props.navigation.navigate({ name: "auth_screen" });
    const props = this.props;
    // console.log(props.route.params);
  }

  render() {
    const { uploaded_photos_count } = this.state;
    return (
      <ScrollView style={STYLES.bgWhite}>
        <View style={STYLES.main}>
          <View style={STYLES.section1}>
            <View style={STYLES.section1_leftside}>
              <BodyText style={STYLES.uploadPhotoText}>
                Upload photo ({uploaded_photos_count}/9)
              </BodyText>
              <SmallButton style={STYLES.smallBtn}>working</SmallButton>
              <SmallButton style={STYLES.smallBtn} color="primary">working</SmallButton>
            </View>
            <View style={STYLES.section1_rightside}>
              <BodyText>profile image</BodyText>
            </View>
          </View>
        </View>
        <View style={STYLES.section2}>
          <View style={STYLES.section2_row}></View>
          <View style={STYLES.section2_row}></View>
        </View>
        <View style={STYLES.section3}>
          <View style={STYLES.userinfo_row}>
            <View style={STYLES.userinfo_key}>
              <BodyText>name</BodyText>
            </View>
            <View style={STYLES.userinfo_value}>
              <Picker
                selectedValue="java"
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={STYLES.section4}>
          <BodyText style={STYLES.nextText}>Next</BodyText>
          <Ionicons name="arrow-forward" size={40} />
        </View>
      </ScrollView>
    );
  }
}

const STYLES = StyleSheet.create({
  bgWhite: {
    backgroundColor: CONFIG.WHITE,
  },
  main: {
    flex: 1,
    padding: 10,
  },
  section1: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  section1_leftside: {},
  uploadPhotoText: {},
  smallBtn: {
    // marginVertical: 10
  },
  section1_rightside: {},
  section2: {},
  section2_row: {},
  section3: {},
  userinfo_row: {},
  userinfo_key: {},
  userinfo_value: {},
  section4: {},
  nextText: {},
});

export default Profile;
