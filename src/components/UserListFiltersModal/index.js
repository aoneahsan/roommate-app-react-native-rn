// Core Imports
import React, { useReducer, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";

// Custom Imports
import * as CONFIG from "../../config";
import ModalCon from "../ModalCon";
import BodyText from "../BodyText";
import Input from "../Input";
import Chip from "../Chip";
import MainButton from "../MainButton";

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
    selected_date: new Date(),
    age: 18,
    other: "",
  },
  inputValideties: {
    selected_date: false,
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

const UserListFiltersModal = (props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formState, dispatcherFormState] = useReducer(
    FORM_STATE_REDUCER,
    INIT_FORM_STATE
  );

  const [chipsData, dispatchChipsData] = useReducer(chipsStateReducer, {
    buildingTypes: [
      { id: "1", value: "No Preference", checked: false },
      { id: "2", value: "Condo", checked: false },
      { id: "3", value: "Apartment", checked: false },
      { id: "4", value: "TwonHouse", checked: false },
      { id: "5", value: "House", checked: false },
      { id: "6", value: "Basement", checked: false },
    ],
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
      console.log("UserListFiltersModal === formSubmitHandler == res = ", {
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

  const closeModalHandler = () => {
    if (props.closemodal) {
      props.closemodal();
    } else {
      alert("pass 'closemodal' props");
    }
  };

  return (
    <ModalCon visible={props.visible}>
      <ScrollView contentContainerStyle={STYLES.bgWhite}>
        <View style={STYLES.header}>
          <View
            style={{ ...STYLES.row, ...{ marginTop: 10, marginBottom: 20 } }}
          >
            <TouchableOpacity onPress={closeModalHandler}>
              <Entypo name="cross" size={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <BodyText>clear</BodyText>
            </TouchableOpacity>
          </View>
          <View style={STYLES.row}>
            <View style={{ flexDirection: "row" }}>
              <BodyText style={{ color: CONFIG.LIGHT_TEXT_COLOR }}>
                You are searching in
              </BodyText>
              <BodyText
                style={{ fontFamily: CONFIG.FONT_RUBIK_MEDIUM, marginLeft: 4 }}
              >
                Toronto
              </BodyText>
            </View>
            <TouchableOpacity>
              <BodyText style={{ color: "#0DA3F8" }}>Change City</BodyText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={STYLES.main}>
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
                  ...{
                    flex: 1,
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  },
                }}
              >
                {chipsData.buildingTypes.map((item, index) => {
                  return (
                    <Chip
                      key={index}
                      checked={item.checked}
                      onPress={() =>
                        onChipSelectHandler({
                          id: "buildingTypes",
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
                  ...{
                    flex: 1,
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  },
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
                    console.log("UserListFiltersModal === Slider == res = ", {
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
          {/* Budget */}
          <View style={STYLES.userinfoRowCon}>
            <View
              style={{ ...STYLES.userinfo_row, ...{ flexDirection: "column" } }}
            >
              <View
                style={{
                  ...STYLES.userinfo_key,
                  ...{ flex: 1, marginBottom: 4 },
                }}
              >
                <BodyText
                  style={{
                    ...STYLES.userinfo_keyText,
                    ...{},
                  }}
                >
                  Budget
                </BodyText>
              </View>
              <View style={{ ...STYLES.userinfo_value, ...{ flex: 1 } }}>
                <View style={STYLES.userinfo_valueInputCon}>
                  <Input
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
                  <Input
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
          {/* Date */}
          <View style={STYLES.userinfoRowCon}>
            <View
              style={{
                ...STYLES.userinfo_row,
                ...{ flexDirection: "column", alignItems: "flex-start" },
              }}
            >
              <View style={STYLES.userinfo_key}>
                <BodyText style={{ ...STYLES.userinfo_keyText }}>
                  Move in Date
                </BodyText>
              </View>
              <View
                style={{
                  ...STYLES.userinfo_value,
                  ...{
                    marginTop: 6,
                    flexDirection: "column",
                    alignItems: "flex-start",
                  },
                }}
              >
                <BodyText style={{ marginLeft: 6 }}>From</BodyText>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: CONFIG.LIGHT_TEXT_COLOR,
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                    marginTop: 0,
                    borderRadius: 30,
                  }}
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
                  ...{
                    flex: 1,
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  },
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
                  ...{
                    flex: 1,
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  },
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
                  ...{
                    flex: 1,
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  },
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
          {/* Overnight Guests */}
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
                  Overnight Guests
                </BodyText>
              </View>
              <View
                style={{
                  ...STYLES.userinfo_value,
                  ...{
                    flex: 1,
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  },
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
          {/* Action Buttons */}
          <View style={STYLES.row}>
            <View style={STYLES.btnCon}>
              <MainButton fontsize={18} style={STYLES.btn} color="white" onPress={closeModalHandler}>
                Cancel
              </MainButton>
            </View>
            <View style={STYLES.btnCon}>
              <MainButton fontsize={18} style={STYLES.btn} color="primary" onPress={closeModalHandler}>
                Save
              </MainButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </ModalCon>
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
  // Header Part
  header: {},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    paddingHorizontal: 10,
  },
  // Filters
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
  btnCon: {
    minWidth: "40%",
  },
  btn: {
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default UserListFiltersModal;
