// Core Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { NavigationActions } from "react-navigation";

// Custom Imports
import * as CONFIG from "./../../config";
import * as ACTIONS from "./../../store/actions";
import BodyText from "./../../components/BodyText";
import CodeInput from "./../../components/CodeInput";
import FlatButton from "./../../components/FlatButton";

const VerifyPhone = (props) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [canRequestNewCode, setCanRequestNewCode] = useState(true);

  useEffect(() => {
    // dispatch(ACTIONS.setIsLoadingFalse());
    // props.navigation.navigate({ name: "auth_screen" });
    // console.log("VerifyPhone === componentDidMount == res = ", props.route.params);
    if (
      props.route.params &&
      props.route.params.phone &&
      props.route.params.countryCode
    ) {
      setPhoneCountryCodeFromParams();
    }
  }, []);

  setPhoneCountryCodeFromParams = async () => {
    await setPhone(props.route.params.phone);
    await setCountryCode(props.route.params.countryCode);
  };

  codeInputChangeHandler = (val) => {
    if (!val) {
      return;
    }
    if (val.length == 4) {
      verifyPhoneCode(val);
    }
  };

  verifyPhoneCode = async (code) => {
    dispatch(ACTIONS.setIsLoadingTrue());
    const result = await dispatch(ACTIONS.verifyCode(phone, code));
    dispatch(ACTIONS.setIsLoadingFalse());
    if (!result.success && result.status_code != 422) {
      Alert.alert(
        "Error Occured",
        "Error Occured while verifing code, try again!",
        [{ text: "OKAY" }]
      );
      return;
    } else if (result.status_code == 422) {
      Alert.alert(
        "Invalid Code",
        "Invalid verification code entered, enter correct code, or request new one!",
        [{ text: "OKAY" }]
      );
      return;
    } else {
      props.navigation.dispatch(
        NavigationActions.navigate({ routeName: "app_stack_components" })
      );
    }
  };

  resendVerificationCode = async () => {
    dispatch(ACTIONS.setIsLoadingTrue());
    await setCanRequestNewCode(false);
    const result = await dispatch(ACTIONS.resendVerificationCode(phone));
    dispatch(ACTIONS.setIsLoadingFalse());
    if (!result.success) {
      alert("Error Occured while verifing code, try again!");
      return;
    } else {
      Alert.alert("Code Send", "verification code send successfully!", [
        { text: "OKAY" },
      ]);
      setTimeout(() => {
        setCountryCode(true);
      }, 10000);
    }
  };

  const goToAppStack = () => {
    props.navigation.navigate("profile_stack_screens", {
      screen: "profile_screen",
    });
  };

  return (
    <ScrollView contentContainerStyle={STYLES.bgWhite}>
      <View style={STYLES.main}>
        <View style={STYLES.textCon}>
          <BodyText fontsize={16} style={STYLES.text1}>
            Enter the code we send over SMS to
          </BodyText>
          <BodyText fontsize={16} color={CONFIG.PINK} style={STYLES.text2}>
            {phone ? "+" + countryCode + phone : "No Phone Number Passed"}
          </BodyText>
        </View>
        <View style={STYLES.codeInputCon}>
          <CodeInput
            style={STYLES.codeinput}
            onChange={codeInputChangeHandler}
          ></CodeInput>
        </View>
        <View style={STYLES.bottomSection}>
          <BodyText style={STYLES.text3}>Didn't get an SMS?</BodyText>
          <FlatButton disabled={!canRequestNewCode} style={STYLES.text4}>
            Send again
          </FlatButton>
        </View>
        <View style={STYLES.bottomSection2}>
          <FlatButton underlined style={STYLES.text5} onPress={goToAppStack}>
            More Option
          </FlatButton>
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
    padding: 10,
    backgroundColor: CONFIG.WHITE,
    borderBottomWidth: 1,
    paddingBottom: 30,
    borderBottomColor: CONFIG.LIGHT_TEXT_COLOR,
    borderBottomRightRadius: 60,
    borderRightWidth: 1,
    elevation: 5,
    marginLeft: 4,
    marginRight: 2,
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
