// Core Imports
import React from "react";
import { StyleSheet, View } from "react-native";

// Custom Imports
import * as CONFIG from "./../../config";
import CustomHeading from "./../../components/CustomHeading";
import CustomText from "./../../components/CustomText";
import CustomButton from "./../../components/CustomButton";
import Input from "./../../components/Input";
import Divider from "./../../components/Divider";

class Auth extends React.Component {
  state = {
    isLoginMode: true,
  };
  render() {
    const { isLoginMode } = this.state;
    return (
      <View style={STYLES.main}>
        <View style={STYLES.contentCon}>
          <View>
            <CustomHeading>Welcome Back</CustomHeading>
            <CustomText color={CONFIG.GREY} style={{ marginTop: 4 }}>
              Sign in to continue
            </CustomText>
          </View>
          <View style={STYLES.formCon}>
            <View style={STYLES.inputCon}>
              <Input style={STYLES.input} />
            </View>
            <View style={STYLES.inputCon}>
              <Input style={STYLES.input} />
            </View>
            <View style={STYLES.btnCon}>
              <CustomButton>{isLoginMode ? "Login" : "SignUp"}</CustomButton>
            </View>
          </View>
          <View style={STYLES.dividerCon}>
            <Divider />
          </View>
          <View style={STYLES.btnsCon}>
            <View style={STYLES.btnCon}>
              <CustomButton fontsize={18}>Continue with WeChat</CustomButton>
            </View>
            <View style={STYLES.btnCon}>
              <CustomButton fontsize={18}>Continue with Facebook</CustomButton>
            </View>
            <View style={STYLES.btnCon}>
              <CustomButton fontsize={18}>Continue with Email</CustomButton>
            </View>
          </View>
          <View style={STYLES.policyTextCon}>
            <CustomText color={CONFIG.GREY} style={{ marginTop: 4 }}>
              Terms of use & Privecy Policy
            </CustomText>
          </View>
        </View>
      </View>
    );
  }
}

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: CONFIG.WHITE,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  contentCon: {
    flex: 1,
  },
  contentInnerCon: {
    flex: 1,
    justifyContent: "center",
  },
  formCon: {
    alignItems: "center",
  },
  inputCon: {
    width: "85%",
    marginVertical: 8,
  },
  input: {},
  dividerCon: {},
  btnsCon: {
    alignItems: "center",
  },
  btnCon: {
    width: "85%",
    marginVertical: 8,
  },
  btn: {},
  policyTextCon: {
    alignItems: "center",
  },
  policyText: {},
});

export default Auth;
