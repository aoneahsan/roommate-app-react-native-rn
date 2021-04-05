// Core Imports
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

// Custom Imports
import * as CONFIG from "./../../config";
import CustomText from "./../../components/CustomText";
import CodeInput from "./../../components/CodeInput";
import CustomButton2 from "./../../components/CustomButton2";

class VerifyPhone extends React.Component {
  state = {
    formData: null,
  };

  componentDidMount() {
    // this.props.navigation.navigate({ name: "auth_screen" });
    const props = this.props;
    // console.log(props.route.params);
    if (props.route.params && props.route.params.formData) {
      this.setState({
        formData: props.route.params.formData,
      });
    }
  }

  codeInputChangeHandler = (val) => {
    if (!val) {
      return;
    }
    if (val.length == 4) {
      alert(val);
    }
  };

  render() {
    const { formData } = this.state;
    return (
      <ScrollView style={STYLES.bgWhite}>
        <View style={STYLES.main}>
          <View style={STYLES.textCon}>
            <CustomText fontsize={16} style={STYLES.text1}>
              Enter the code we send over SMS to
            </CustomText>
            <CustomText fontsize={16} color={CONFIG.PINK} style={STYLES.text2}>
              {formData ? formData.phone : "No Phone Number Passed"}
            </CustomText>
          </View>
          <View style={STYLES.codeInputCon}>
            <CodeInput style={STYLES.codeinput} onChange={this.codeInputChangeHandler}></CodeInput>
          </View>
          <View style={STYLES.bottomSection}>
            <CustomText style={STYLES.text3}>Didn't get an SMS?</CustomText>
            <CustomButton2 style={STYLES.text4}>Send again</CustomButton2>
          </View>
          <View style={STYLES.bottomSection2}>
            <CustomButton2 underlined style={STYLES.text5}>
              More Option
            </CustomButton2>
          </View>
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
    backgroundColor: CONFIG.WHITE,
    borderBottomWidth: 1,
    paddingBottom: 30,
    borderBottomColor: CONFIG.LIGHT_TEXT_COLOR,
    borderBottomRightRadius: 60,
    borderRightWidth: 1,
    elevation: 5,
    marginLeft: 4,
    marginRight: 2
  },
  textCon: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  text1: {
    marginBottom: 20,
  },
  text2: {},
  codeInputCon: {
    marginBottom: 40,
  },
  codeinput: {},
  bottomSection: {
    flexDirection: "row",
    marginBottom: 30,
  },
  text3: {
    marginRight: 16,
    color: CONFIG.LIGHT_TEXT_COLOR,
  },
  text4: {},
  bottomSection2: {
    flexDirection: "row",
  },
  text5: {},
});

export default VerifyPhone;
