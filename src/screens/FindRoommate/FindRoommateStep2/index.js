// Core Imports
import React, { useReducer } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

// Custom Imports
import * as CONFIG from "../../../config";
import BodyText from "../../../components/BodyText";
import CustomInput from "../../../components/CustomInput";
import SelectOptionsCard from "../../../components/SelectOptionsCard";
import GymIcon from "./../../../../assets/images/icons/gym.png";
import TravelIcon from "./../../../../assets/images/icons/travel.png";
import MovieIcon from "./../../../../assets/images/icons/movie.png";

// **************************************************************************
// Action Types
const FORM_INPUT_CHANGED = "FORM_INPUT_CHANGED";

// Form Reducer
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
    about_me: "",
  },
  inputValideties: {
    about_me: false,
  },
  formIsValid: false,
};

const FindRoommateStep2 = (props) => {
  const [formState, dispatcherFormState] = useReducer(
    FORM_STATE_REDUCER,
    INIT_FORM_STATE
  );

  const inputChangedHandler = (data) => {
    dispatcherFormState({
      type: FORM_INPUT_CHANGED,
      payload: data,
    });
  };

  const formSubmitHandler = async () => {
    if (!formState.formIsValid) {
      Alert.alert("Invalid Data", "Enter Valid Data!", [{ text: "OKAY" }]);
      return;
    }
    try {
      console.log("FindRoommateStep2 === formSubmitHandler == res = ", {
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

  // SelectOptionsCards Data
  const travelChips = [
    { id: "banff", value: "Banff", checked: true },
    { id: "soul", value: "Soul", checked: true },
    { id: "new_york", value: "New York", checked: true },
    { id: "la", value: "LA", checked: true },
    { id: "cuba", value: "Cuba", checked: true },
    { id: "santorini", value: "Santorini", checked: true },
    { id: "banff2", value: "Banff 2", checked: false },
    { id: "banff3", value: "Banff 3", checked: false },
    { id: "banff4", value: "Banff 4", checked: false },
    { id: "banff5", value: "Banff 5", checked: false },
    { id: "banff6", value: "Banff 6", checked: false },
  ];

  // SelectOptionsCards onPress Handlers
  const travelCardPressHandler = () => {
    console.log("FindRoommateStep2 === travelCardPressHandler");
  };

  return (
    <ScrollView contentContainerStyle={STYLES.bgWhite}>
      <View style={STYLES.main}>
        <BodyText style={{ ...STYLES.pageHeading, ...{ marginBottom: 10 } }}>
          About Me
        </BodyText>
        <CustomInput
          id="aboutme"
          placeholder="Maximum 250 words"
          multiline={true}
          numberOfLines={7}
          radius={10}
          required
          hidelabel={true}
          style={STYLES.textarea}
          onChange={inputChangedHandler}
        />
        <SelectOptionsCard
          icon={TravelIcon}
          label="Travel"
          labelbgcolor="#5DB1D5"
          chips={travelChips}
          chipbgcolor="rgba(93, 177, 213,.4)"
          chiptextcolor="#2E476E"
          onPress={travelCardPressHandler}
          style={STYLES.optionsCard}
        />
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
    padding: 20,
  },
  pageHeading: {
    fontFamily: CONFIG.FONT_HANSON_BOLD,
    fontSize: 24,
  },
  textarea: {
    // minHeight: 160,
  },
  optionsCard: {
    marginTop: 20
  }
});

export default FindRoommateStep2;
