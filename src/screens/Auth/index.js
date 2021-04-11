// Core Imports
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Custom Imports
import * as CONFIG from "./../../config";
import MainHeading from "./../../components/MainHeading";
import BodyText from "./../../components/BodyText";
import MainButton from "./../../components/MainButton";
import FlatButton from "./../../components/FlatButton";
import Input from "./../../components/Input";
import Divider from "./../../components/Divider";
import CountryPicker from "./../../components/CountryPicker";
import * as ACTIONS from "./../../store/actions";

const AuthScreen = (props) => {
  // Define Dispatch
  const dispatch = useDispatch();

  // Define States Constants
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setPageTitle();
  }, []);

  setPageTitle = async () => {
    await props.navigation.setOptions({
      title: isLoginMode ? "Log In" : "Sign Up",
    });
  };

  countryChangedHandler = async (name, code) => {
    if (!name || !code) {
      return;
    }
    await setCountryCode(code);
  };

  phoneChangedHandler = async ({ id, value, isvalid }) => {
    const phone = value;
    if (!phone) {
      return;
    }
    setPhone(phone);
  };

  formSubmitHandler = async () => {
    dispatch(ACTIONS.setIsLoadingTrue());
    if (isLoginMode) {
      await signInHandler();
    } else {
      await signUpHandler();
    }
  };

  signUpHandler = async () => {
    if (!phone || phone.length < 6 || !countryCode) {
      alert("Enter valid data!");
      return;
    }
    const phoneNumber = "+" + countryCode + phone;

    // redirect after signup, to verify screen
    // props.navigation.navigate({
    //   name: "verifyPhone_screen",
    //   params: {
    //     formData: form,
    //   },
    // });
  };

  signInHandler = async () => {
    await setTimeout(() => {
      if (!phone || !phone.length < 6 || !countryCode) {
      alert("Enter valid data!");
      return;
    }
    const phoneNumber = "+" + countryCode + phone;
    try {
      console.log("Auth === Auth.signIn == res = ");
    } catch (err) {
      alert("Error occured while signIn");
      console.log("Auth === Auth.signIn == err = ", { err });
    }
    }, 3000);
    dispatch(ACTIONS.setIsLoadingFalse());
    
  };

  switchAuthModeHandler = async () => {
    await setIsLoginMode(!isLoginMode);
    await setPageTitle();
  };

  return (
    <ScrollView contentContainerStyle={STYLES.bgWhite}>
      <View style={STYLES.main}>
        <View style={STYLES.contentCon}>
          <View style={STYLES.textCon}>
            <MainHeading>Welcome Back</MainHeading>
            <BodyText color={CONFIG.GREY} style={{ marginTop: 4 }}>
              {isLoginMode ? "Sign in" : "Sign Up"} to continue
            </BodyText>
          </View>
          <View style={STYLES.formCon}>
            <View style={STYLES.formInnerCon}>
              <View style={STYLES.inputCon}>
                <CountryPicker
                  style={STYLES.input}
                  onSelect={(name, code) => {
                    // console.log("Auth === CountryPicker/onSelect == res = ", {
                    //   name,
                    //   code,
                    // });
                    countryChangedHandler(name, code);
                  }}
                ></CountryPicker>
              </View>
              <View style={STYLES.inputCon}>
                <Input
                  placeholder="123-456-789"
                  keyboardType="phone-pad"
                  style={STYLES.input}
                  label="Country/Region"
                  number
                  labelStyle={{
                    color: CONFIG.LIGHT_TEXT_COLOR,
                    marginLeft: -6,
                    marginBottom: -1,
                    fontSize: 14,
                  }}
                  onChange={phoneChangedHandler}
                  radius={16}
                />
              </View>
              <View style={STYLES.btnCon}>
                <MainButton
                  color="primary"
                  onPress={formSubmitHandler}
                  disabled={!phone || !phone.length > 6 || !countryCode}
                >
                  {isLoginMode ? "Login" : "SignUp"}
                </MainButton>
                <FlatButton
                  style={{
                    alignItems: "center",
                    marginTop: 10,
                  }}
                  color="primary"
                  onPress={switchAuthModeHandler}
                >
                  Switch Mode
                </FlatButton>
              </View>
            </View>
          </View>
          <View style={STYLES.dividerCon}>
            <Divider>or</Divider>
          </View>
          <View style={STYLES.btnsCon}>
            <View style={STYLES.btnCon}>
              <MainButton fontsize={16}>Continue with WeChat</MainButton>
            </View>
            <View style={STYLES.btnCon}>
              <MainButton fontsize={16}>Continue with Facebook</MainButton>
            </View>
            <View style={STYLES.btnCon}>
              <MainButton fontsize={16}>Continue with Email</MainButton>
            </View>
          </View>
          <View style={STYLES.policyTextCon}>
            <BodyText color={CONFIG.GREY} style={{ marginTop: 4 }}>
              Terms of use & Privecy Policy
            </BodyText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const STYLES = StyleSheet.create({
  bgWhite: {
    backgroundColor: CONFIG.WHITE,
    flexGrow: 1,
  },
  main: {
    flex: 1,
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
  textCon: {
    paddingLeft: 24,
    marginBottom: 16,
  },
  formCon: {
    alignItems: "center",
  },
  formInnerCon: {
    width: "100%",
    alignItems: "center",
  },
  inputCon: {
    width: "85%",
    marginVertical: 8,
  },
  input: {},
  dividerCon: {
    marginTop: 14,
    marginBottom: 0,
  },
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
    marginTop: 20,
  },
  policyText: {},
});

export default AuthScreen;
