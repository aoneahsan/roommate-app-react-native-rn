// Core Imports
import React from "react";
import { StyleSheet, View, Text } from "react-native";

class LandingScreen extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <View style={STYLES.main}>
        <Text>working</Text>
      </View>
    );
  }
}

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default LandingScreen;
