// Core Imports
import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as YUP from "yup";

// Custom Imports
import * as CONFIG from "./../../config";
import MainHeading from "./../../components/MainHeading";
import BodyText from "./../../components/BodyText";
import MainButton from "./../../components/MainButton";
import Input from "./../../components/Input";
import Divider from "./../../components/Divider";
import CountryPicker from "./../../components/CountryPicker";

const formikValidationSchema = YUP.object().shape({
  country_name: YUP.string().required("Required"),
  country_code: YUP.string().required("Required"),
  phone: YUP.string().required("Required"),
});

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
            <MainHeading>Welcome Back</MainHeading>
            <BodyText color={CONFIG.GREY} style={{ marginTop: 4 }}>
              Sign in to continue
            </BodyText>
          </View>
          <View style={STYLES.formCon}>
            <Formik
              initialValues={{
                country_name: "",
                country_code: "",
                phone: "",
              }}
              validationSchema={formikValidationSchema}
              onSubmit={(values) =>
                console.log("formik form submit = ", { values })
              }
            >
              {({
                values,
                touched,
                isValid,
                setFieldTouched,
                setFieldValue,
                handleSubmit,
              }) => (
                <View style={STYLES.formInnerCon}>
                  <View style={STYLES.inputCon}>
                    <CountryPicker
                      style={STYLES.input}
                      onSelect={(name, code) => {
                        console.log({ name, code });
                        setFieldTouched("country_name", true, true);
                        setFieldValue("country_name", name, true);
                        setFieldTouched("country_code", true, true);
                        setFieldValue("country_code", code, true);
                      }}
                    ></CountryPicker>
                  </View>
                  <View style={STYLES.inputCon}>
                    <Input
                      style={STYLES.input}
                      onChange={(val) => {
                        setFieldTouched("phone", true, true);
                        setFieldValue("phone", val, true);
                      }}
                      onBlur={() => {
                        setFieldTouched("phone", true, true);
                      }}
                    />
                  </View>
                  <View style={STYLES.btnCon}>
                    <MainButton color="primary" onPress={handleSubmit}>
                      {isLoginMode ? "Login" : "SignUp"}
                    </MainButton>
                  </View>
                </View>
              )}
            </Formik>
          </View>
          <View style={STYLES.dividerCon}>
            <Divider />
          </View>
          <View style={STYLES.btnsCon}>
            <View style={STYLES.btnCon}>
              <MainButton fontsize={18}>Continue with WeChat</MainButton>
            </View>
            <View style={STYLES.btnCon}>
              <MainButton fontsize={18}>Continue with Facebook</MainButton>
            </View>
            <View style={STYLES.btnCon}>
              <MainButton fontsize={18}>Continue with Email</MainButton>
            </View>
          </View>
          <View style={STYLES.policyTextCon}>
            <BodyText color={CONFIG.GREY} style={{ marginTop: 4 }}>
              Terms of use & Privecy Policy
            </BodyText>
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
  formInnerCon: {
    width: "100%",
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
