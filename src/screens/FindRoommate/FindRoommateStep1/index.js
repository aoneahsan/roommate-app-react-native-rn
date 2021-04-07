// Core Imports
import React, { useReducer, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

// Custom Imports
import * as CONFIG from "../../../config";
import BodyText from "../../../components/BodyText";
import CustomInput from "../../../components/CustomInput";
import Chip from "../../../components/Chip";
import StepFooter from "../../../components/StepFooter";

const FORM_INPUT_CHANGED = "FORM_INPUT_CHANGED";

const formStateReducer = (state, action) => {
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

const initFormState = {
  inputValues: {
    selected_date: new Date(),
    location: "",
    minvalue: "",
    maxvalue: "",
    place_preference: "entire_place",
    building_Type: "no_preference",
  },
  inputValideties: {
    selected_date: false,
    location: false,
    minvalue: false,
    maxvalue: false,
    place_preference: false,
    building_Type: false,
  },
  formIsValid: false,
};

const PLACE_PREFERENCE_CHANGED = "PLACE_PREFERENCE_CHANGED";
const BUILDING_TYPE_CHANGED = "BUILDING_TYPE_CHANGED";

const chipsStateReducer = (state, action) => {
  switch (action.type) {
    case PLACE_PREFERENCE_CHANGED:
      const updatedPlacePreferences = [...state.placePreferences];
      updatedPlacePreferences[action.index].checked = !action.checked; // because here "action.checked" will store the last value, hence user clicked on this chip so we should update it with value opposite to last value
      console.log("FindRoommateStep1 === chipsStateReducer == res = ", {
        updatedPlacePreferences,
      });
      return {
        ...state,
        placePreferences: updatedPlacePreferences,
      };
    case BUILDING_TYPE_CHANGED:
      const updatedbuildingTypes = [...state.buildingTypes];
      updatedbuildingTypes[action.index].checked = !action.checked; // because here "action.checked" will store the last value, hence user clicked on this chip so we should update it with value opposite to last value
      return {
        ...state,
        buildingTypes: updatedbuildingTypes,
      };
    default:
      return state;
  }
};

const FindRoommateStep1 = (props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formState, dispatcherFormState] = useReducer(
    formStateReducer,
    initFormState
  );

  const [chipsData, dispatchChipsData] = useReducer(chipsStateReducer, {
    placePreferences: [
      { id: "extire_place", value: "Entire Place", checked: false },
      { id: "shared_place", value: "Shared Place", checked: false },
    ],
    buildingTypes: [
      { id: "No Preference", value: "No Preference", checked: false },
      { id: "Condo", value: "Condo", checked: false },
      { id: "Apartment", value: "Apartment", checked: false },
      { id: "TwonHouse", value: "TwonHouse", checked: false },
      { id: "House", value: "House", checked: false },
      { id: "Basement", value: "Basement", checked: false },
    ],
  });

  const formatedSelectedDate = moment(
    formState.inputValues.selected_date
  ).format("MMMM D, YYYY");

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
      console.log("FindRoommateStep1 === formSubmitHandler == res = ", {
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

  return (
    <ScrollView contentContainerStyle={STYLES.bgWhite}>
      <View style={STYLES.main}>
        {/* place */}
        <View style={STYLES.userinfoRowCon}>
          <View style={STYLES.userinfo_row}>
            <View style={STYLES.userinfo_key}>
              <BodyText style={{ ...STYLES.userinfo_keyText }}>
                Where you want to live?
              </BodyText>
            </View>
            <View style={STYLES.userinfo_value}>{/* selector */}</View>
          </View>
        </View>
        {/* Date */}
        <View style={STYLES.userinfoRowCon}>
          <View style={STYLES.userinfo_row}>
            <View style={STYLES.userinfo_key}>
              <BodyText style={{ ...STYLES.userinfo_keyText }}>
                Move in Date
              </BodyText>
            </View>
            <View style={STYLES.userinfo_value}>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  setShowDatePicker(true);
                }}
              >
                <BodyText>{formatedSelectedDate}</BodyText>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode="datetime"
                  is24Hour={true}
                  display="default"
                  onChange={(event, value) => {
                    console.log(
                      "FindRoommateStep1 === DateTimePicker == res = ",
                      { event, value }
                    );
                    const data = {
                      id: "selected_date",
                      value: value,
                      isvalid: true,
                    };
                    setShowDatePicker(false);
                    inputChangedHandler(data);
                  }}
                />
              )}
            </View>
          </View>
        </View>
        {/* Budget */}
        <View style={STYLES.userinfoRowCon}>
          <View style={{ ...STYLES.userinfo_row }}>
            <View style={{ ...STYLES.userinfo_key, ...{ flex: 0.25 } }}>
              <BodyText
                style={{
                  ...STYLES.userinfo_keyText,
                  ...{
                    marginTop: 24,
                  },
                }}
              >
                Budget
              </BodyText>
            </View>
            <View style={{ ...STYLES.userinfo_value, ...{ flex: 0.75 } }}>
              <View style={STYLES.userinfo_valueInputCon}>
                <CustomInput
                  number
                  label="Min"
                  placeholder="$10"
                  min={10}
                  labeloutside
                  style={STYLES.userinfo_valueInput}
                  onChange={inputChangedHandler}
                />
              </View>
              <View style={STYLES.userinfo_valueInputCon}>
                <CustomInput
                  number
                  label="Max"
                  placeholder={"$10,000"}
                  labeloutside
                  max={100000}
                  style={STYLES.userinfo_valueInput}
                  onChange={inputChangedHandler}
                />
              </View>
            </View>
          </View>
        </View>
        {/* Place Preference */}
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
                Place Preference
              </BodyText>
            </View>
            <View
              style={{
                ...STYLES.userinfo_value,
                ...{ flex: 1, justifyContent: "flex-start", flexWrap: "wrap" },
              }}
            >
              {chipsData.placePreferences.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    checked={item.checked}
                    onPress={() =>
                      onChipSelectHandler({
                        index,
                        checked: item.checked,
                        type: PLACE_PREFERENCE_CHANGED,
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
        {/* Building Type */}
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
                Building Type
              </BodyText>
            </View>
            <View
              style={{
                ...STYLES.userinfo_value,
                ...{ flex: 1, justifyContent: "flex-start", flexWrap: "wrap" },
              }}
            >
              {chipsData.buildingTypes.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    checked={item.checked}
                    onPress={() =>
                      onChipSelectHandler({
                        index,
                        checked: item.checked,
                        type: BUILDING_TYPE_CHANGED,
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
      </View>
      <StepFooter currentStep="1" totalSteps="5"></StepFooter>
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
    borderBottomColor: "#C4C4C4",
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

export default FindRoommateStep1;
