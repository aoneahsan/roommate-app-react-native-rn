// Core Imports
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
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
  const isLoggedIn = useSelector((state) => state.authR.isLoggedIn);

  // Define States Constants
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    dispatch(ACTIONS.setIsLoadingFalse());
    // props.navigation.navigate({
    //   name: "verifyPhone_screen",
    //   params: {
    //     phone,
    //     countryCode,
    //   },
    // });
    // navigateToVerifyPhoneScreen(); // just for development, comment/remove before moving to production
    setPageTitle();
    if (isLoggedIn) {
      navigateToProfileScreen();
    }
  }, []);

  const navigateToProfileScreen = () => {
    props.navigation.navigate("profile_stack_screens", {
      screen: "profile_screen",
    });
  };

  const setPageTitle = async () => {
    await props.navigation.setOptions({
      title: isLoginMode ? "Log In" : "Sign Up",
    });
  };

  const countryChangedHandler = async (name, code) => {
    if (!name || !code) {
      return;
    }
    await setCountryCode(code);
  };

  const phoneChangedHandler = async ({ id, value, isvalid }) => {
    const phone = value;
    if (!phone) {
      return;
    }
    setPhone(phone);
  };

  const formSubmitHandler = async () => {
    if (!phone || phone.length < 6 || !countryCode) {
      Alert.alert("Inavlid Data", "Enter valid data!", [{ text: "OKAY" }]);
      return;
    }
    dispatch(ACTIONS.setIsLoadingTrue());
    const result = await dispatch(
      ACTIONS.authAction({ phone, countryCode }, isLoginMode)
    );
    if (!result.success) {
      if (isLoginMode) {
        Alert.alert("Error", "Error Occured while Login, try again!", [
          { text: "OKAY" },
        ]);
      } else {
        Alert.alert("Error", "Error Occured while Sign Up, try again!", [
          { text: "OKAY" },
        ]);
      }
      dispatch(ACTIONS.setIsLoadingFalse());
      return;
    } else {
      dispatch(ACTIONS.setIsLoadingFalse());
      // redirect after signup, to verify screen
      navigateToVerifyPhoneScreen();
    }
  };

  const navigateToVerifyPhoneScreen = () => {
    props.navigation.navigate({
      name: "verifyPhone_screen",
      params: {
        phone,
        countryCode,
      },
    });
  };

  const switchAuthModeHandler = async () => {
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
                  const
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
    paddingBottom: 20,
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
