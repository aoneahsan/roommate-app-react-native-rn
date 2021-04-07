// Core Imports
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

// Custom Imports
import * as CONFIG from "../../../config";
import BodyText from "../../../components/BodyText";

class FindRoommateStep5 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={STYLES.bgWhite}>
        <View style={STYLES.main}>
          <BodyText>FindRoommateStep5</BodyText>
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
  },
});

export default FindRoommateStep5;
