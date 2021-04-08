// Core Imports
import React, { useEffect, useReducer } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// Custom Imports
import * as CONFIG from "../../../config";
import BodyText from "../../../components/BodyText";
import CustomInput from "../../../components/CustomInput";
import Chip from "../../../components/Chip";
import StepFooter from "../../../components/StepFooter";

const FORM_INPUT_CHANGED = "FORM_INPUT_CHANGED";

const FORM_STATE_REDUCER = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_CHANGED:
      const updatedValues = {
        ...state.inputValues,
        [action.payload.id]: action.payload.value,
      };
      const updatedValideties = {
        ...state.inputValideties,
        [action.payload.id]: action.payload.isvalid,
      };
      let updatedIsFormValid = true;
      for (let key in updatedValideties) {
        updatedIsFormValid = updatedIsFormValid && updatedValideties[key];
      }
      return {
        inputValues: updatedValues,
        inputValideties: updatedValideties,
        formIsValid: updatedIsFormValid,
      };
    default:
      return state;
  }
};

const INIT_FORM_STATE = {
  inputValues: {
    age: "",
    other: "",
  },
  inputValideties: {
    age: false,
    other: false,
  },
  formIsValid: false,
};

const CHIPS_DATA_CHANGED = "CHIPS_DATA_CHANGED";

const chipsStateReducer = (state, action) => {
  switch (action.type) {
    case CHIPS_DATA_CHANGED:
      const dataClone = [...state[action.id]];
      dataClone[action.index].checked = !action.checked; // because here "action.checked" will store the last value, hence user clicked on this chip so we should update it with value opposite to last value
      return {
        ...state,
        [action.id]: dataClone,
      };
    default:
      return state;
  }
};

const FindRoommateStep4 = (props) => {
  const [formState, dispatcherFormState] = useReducer(
    FORM_STATE_REDUCER,
    INIT_FORM_STATE
  );

  const [chipsData, dispatchChipsData] = useReducer(chipsStateReducer, {
    gender: [
      { id: "1", value: "Male", checked: true },
      { id: "2", value: "Female", checked: false },
      { id: "3", value: "Non-Binary", checked: false },
      { id: "4", value: "All", checked: false },
    ],
    smoke: [
      { id: "1", value: "No", checked: true },
      { id: "2", value: "Yes", checked: false },
      { id: "3", value: "Other", checked: false },
    ],
    pets: [
      { id: "1", value: "No", checked: true },
      { id: "2", value: "Yes", checked: false },
      { id: "3", value: "Depends on the pet", checked: false },
    ],
    guests: [
      { id: "1", value: "No", checked: true },
      { id: "2", value: "Yes", checked: false },
      { id: "3", value: "Occasionally", checked: false },
    ],
    cleanliness: [
      { id: "1", value: "Super Clean", checked: true },
      { id: "2", value: "Clean", checked: false },
      { id: "3", value: "Less Clean", checked: false },
      { id: "4", value: "Normal Clean", checked: false },
    ],
  });

  const inputChangedHandler = (data) => {
    dispatcherFormState({
      type: FORM_INPUT_CHANGED,
      payload: data,
    });
  };

  const onChipSelectHandler = (data) => {
    dispatchChipsData(data);
  };

  const formSubmitHandler = async () => {
    if (!formState.formIsValid) {
      Alert.alert("Invalid Data", "Enter Valid Data!", [{ text: "OKAY" }]);
      return;
    }
    try {
      console.log("FindRoommateStep4 === formSubmitHandler == res = ", {
        formState,
      });
    } catch (error) {
      Alert.alert(
        "Error Occured",
        "Error occured while submitting form, try again!",
        [{ text: "OKAY" }]
      );
      return;
    }
  };

  const navigateToFindRoommateStep5Screen = () => {
    props.navigation.navigate({ name: "find_roommate_step5_screen" });
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons>
            <Item
              title="skip"
              color={CONFIG.BLACK}
              onPress={navigateToFindRoommateStep5Screen}
            />
          </HeaderButtons>
        );
      },
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={STYLES.bgWhite}>
      <View style={STYLES.main}>
        {/* Gender */}
        <View style={STYLES.userinfoRowCon}>
          <View
            style={{ ...STYLES.userinfo_row, ...{ flexDirection: "column" } }}
          >
            <View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
              <BodyText
                style={{
                  ...STYLES.userinfo_keyText,
                  ...{
                    marginBottom: 10,
                  },
                }}
              >
                Gender
              </BodyText>
            </View>
            <View
              style={{
                ...STYLES.userinfo_value,
                ...{ flex: 1, justifyContent: "flex-start", flexWrap: "wrap" },
              }}
            >
              {chipsData.gender.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    checked={item.checked}
                    onPress={() =>
                      onChipSelectHandler({
                        id: "gender",
                        index,
                        checked: item.checked,
                        type: CHIPS_DATA_CHANGED,
                      })
                    }
                  >
                    {item.value}
                  </Chip>
                );
              })}
            </View>
          </View>
        </View>
        {/* Age */}
        <View style={STYLES.userinfoRowCon}>
          <View
            style={{ ...STYLES.userinfo_row, ...{ flexDirection: "column" } }}
          >
            <View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
              <BodyText
                style={{
                  ...STYLES.userinfo_keyText,
                  ...{
                    marginBottom: 10,
                  },
                }}
              >
                Age ({formState.inputValues.age})
              </BodyText>
            </View>
            <View
              style={{
                ...STYLES.userinfo_value,
                ...{
                  flex: 1,
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                  flexDirection: "row",
                },
              }}
            >
              <BodyText>18+</BodyText>
              <Slider
                style={{ flex: 1 }}
                minimumValue={18}
                maximumValue={100}
                step={1}
                minimumTrackTintColor={CONFIG.PRIMARY}
                maximumTrackTintColor="#000"
                onValueChange={(val) => {
                  console.log("FindRoommateStep4 === Slider == res = ", {
                    val,
                  });
                  inputChangedHandler({
                    id: "age",
                    value: val,
                    isvalid: true,
                  });
                }}
                thumbTintColor={CONFIG.PRIMARY}
              />
              <BodyText>100</BodyText>
            </View>
          </View>
        </View>
        {/* Smoke */}
        <View style={STYLES.userinfoRowCon}>
          <View
            style={{ ...STYLES.userinfo_row, ...{ flexDirection: "column" } }}
          >
            <View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
              <BodyText
                style={{
                  ...STYLES.userinfo_keyText,
                  ...{
                    marginBottom: 10,
                  },
                }}
              >
                Smoke
              </BodyText>
            </View>
            <View
              style={{
                ...STYLES.userinfo_value,
                ...{ flex: 1, justifyContent: "flex-start", flexWrap: "wrap" },
              }}
            >
              {chipsData.smoke.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    checked={item.checked}
                    onPress={() =>
                      onChipSelectHandler({
                        id: "smoke",
                        index,
                        checked: item.checked,
                        type: CHIPS_DATA_CHANGED,
                      })
                    }
                  >
                    {item.value}
                  </Chip>
                );
              })}
            </View>
          </View>
        </View>
        {/* Pets */}
        <View style={STYLES.userinfoRowCon}>
          <View
            style={{ ...STYLES.userinfo_row, ...{ flexDirection: "column" } }}
          >
            <View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
              <BodyText
                style={{
                  ...STYLES.userinfo_keyText,
                  ...{
                    marginBottom: 10,
                  },
                }}
              >
                Pets
              </BodyText>
            </View>
            <View
              style={{
                ...STYLES.userinfo_value,
                ...{ flex: 1, justifyContent: "flex-start", flexWrap: "wrap" },
              }}
            >
              {chipsData.pets.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    checked={item.checked}
                    onPress={() =>
                      onChipSelectHandler({
                        id: "pets",
                        index,
                        checked: item.checked,
                        type: CHIPS_DATA_CHANGED,
                      })
                    }
                  >
                    {item.value}
                  </Chip>
                );
              })}
            </View>
          </View>
        </View>
        {/* Guests */}
        <View style={STYLES.userinfoRowCon}>
          <View
            style={{ ...STYLES.userinfo_row, ...{ flexDirection: "column" } }}
          >
            <View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
              <BodyText
                style={{
                  ...STYLES.userinfo_keyText,
                  ...{
                    marginBottom: 10,
                  },
                }}
              >
                Guests
              </BodyText>
            </View>
            <View
              style={{
                ...STYLES.userinfo_value,
                ...{ flex: 1, justifyContent: "flex-start", flexWrap: "wrap" },
              }}
            >
              {chipsData.guests.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    checked={item.checked}
                    onPress={() =>
                      onChipSelectHandler({
                        id: "guests",
                        index,
                        checked: item.checked,
                        type: CHIPS_DATA_CHANGED,
                      })
                    }
                  >
                    {item.value}
                  </Chip>
                );
              })}
            </View>
          </View>
        </View>
        {/* Cleanliness */}
        <View style={STYLES.userinfoRowCon}>
          <View
            style={{ ...STYLES.userinfo_row, ...{ flexDirection: "column" } }}
          >
            <View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
              <BodyText
                style={{
                  ...STYLES.userinfo_keyText,
                  ...{
                    marginBottom: 10,
                  },
                }}
              >
                Cleanliness
              </BodyText>
            </View>
            <View
              style={{
                ...STYLES.userinfo_value,
                ...{ flex: 1, justifyContent: "flex-start", flexWrap: "wrap" },
              }}
            >
              {chipsData.cleanliness.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    checked={item.checked}
                    onPress={() =>
                      onChipSelectHandler({
                        id: "cleanliness",
                        index,
                        checked: item.checked,
                        type: CHIPS_DATA_CHANGED,
                      })
                    }
                  >
                    {item.value}
                  </Chip>
                );
              })}
            </View>
          </View>
        </View>
        {/* Others */}
        <View style={STYLES.userinfoRowCon}>
          <View
            style={{ ...STYLES.userinfo_row, ...{ flexDirection: "column" } }}
          >
            <View style={{ ...STYLES.userinfo_key, ...{ flex: 1 } }}>
              <BodyText
                style={{
                  ...STYLES.userinfo_keyText,
                  ...{
                    marginBottom: 10,
                  },
                }}
              >
                Others
              </BodyText>
            </View>
            <View
              style={{
                ...STYLES.userinfo_value,
              }}
            >
              <CustomInput
                style={{ flex: 1 }}
                placeholder="Minimax 250 words"
                maxlength={250}
                hidelabel={true}
                multiline={true}
                numberOfLines={4}
                radius={6}
              ></CustomInput>
            </View>
          </View>
        </View>
      </View>
      <StepFooter
        currentStep="4"
        totalSteps="5"
        onPress={navigateToFindRoommateStep5Screen}
      ></StepFooter>
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
    padding: 20,
  },
  userinfoRowCon: {
    marginBottom: 4,
  },
  userinfo_row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: CONFIG.BORDER_COLOR_LIGHT,
    paddingBottom: 8,
    marginBottom: 12,
  },
  userinfo_key: {
    flex: 0.65,
  },
  userinfo_keyText: {
    color: CONFIG.BLACK,
    fontSize: 16,
    fontFamily: CONFIG.FONT_RUBIK_SEMI_BOLD,
  },
  userinfo_value: {
    flex: 0.35,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  userinfo_valueInputCon: {
    flex: 0.48,
  },
  userinfo_valueInput: {
    // backgroundColor: "red",
  },
});

export default FindRoommateStep4;
