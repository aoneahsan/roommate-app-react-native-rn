// Core Imports
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

// Custom Imports
import * as CONFIG from "./../../config";
import MainHeading from "./../../components/MainHeading";
import BodyText from "./../../components/BodyText";
import MainButton from "./../../components/MainButton";
import CustomInput from "./../../components/CustomInput";
import Input from "./../../components/Input";
import Divider from "./../../components/Divider";
import CountryPicker from "./../../components/CountryPicker";

class Auth extends React.Component {
  state = {
    isLoginMode: true,
    form: {
      country: {
        name: "",
        code: "",
      },
      phone: "",
    },
  };

  countryChangedHandler = (name, code) => {
    if (!name || !code) {
      return;
    }
    this.setState((state) => {
      return {
        form: {
          country: {
            name,
            code,
          },
          phone: state.form.phone,
        },
      };
    });
  };

  phoneChangedHandler = (phone) => {
    if (!phone) {
      return;
    }
    this.setState((state) => {
      return {
        form: {
          country: state.form.country,
          phone: phone,
        },
      };
    });
  };

  formSubmitHandler = () => {
    const { form } = this.state;
    if (
      !form.phone ||
      !form.phone.length > 6 ||
      !form.country.name ||
      !form.country.code
    ) {
      alert("Enter valid data!");
      return;
    }
    // console.log("Auth === formSubmitHandler == res = ", { form });
    this.props.navigation.navigate({
      name: "verifyPhone_screen",
      params: {
        formData: form,
      },
    });
  };

  render() {
    const { isLoginMode, form } = this.state;
    return (
      <ScrollView contentContainerStyle={STYLES.bgWhite}>
        <View style={STYLES.main}>
          <View style={STYLES.contentCon}>
            <View style={STYLES.textCon}>
              <MainHeading>Welcome Back</MainHeading>
              <BodyText color={CONFIG.GREY} style={{ marginTop: 4 }}>
                Sign in to continue
              </BodyText>
            </View>
            <View style={STYLES.formCon}>
              <View style={STYLES.formInnerCon}>
                <View style={STYLES.inputCon}>
                  <CountryPicker
                    style={STYLES.input}
                    onSelect={(name, code) => {
                      console.log({ name, code });
                      this.countryChangedHandler(name, code);
                    }}
                  ></CountryPicker>
                </View>
                <View style={STYLES.inputCon}>
                  <CustomInput
                    placeholder="123-456-789"
                    keyboardType="phone-pad"
                    style={STYLES.input}
                    label="Country/Region"
                    labelStyle={{
                      color: CONFIG.LIGHT_TEXT_COLOR,
                      marginLeft: -6,
                      marginBottom: -1,
                      fontSize: 14
                    }}
                    onChange={this.phoneChangedHandler}
                    radius={16}
                  />
                </View>
                <View style={STYLES.btnCon}>
                  <MainButton
                    color="primary"
                    onPress={this.formSubmitHandler}
                    disabled={
                      !form.phone ||
                      !form.phone.length > 6 ||
                      !form.country.name ||
                      !form.country.code
                    }
                  >
                    {isLoginMode ? "Login" : "SignUp"}
                  </MainButton>
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
  }
}

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

export default Auth;
