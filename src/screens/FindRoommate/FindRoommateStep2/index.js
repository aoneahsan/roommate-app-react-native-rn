// Core Imports
import React, { useReducer, useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// Custom Imports
import * as CONFIG from "../../../config";
import BodyText from "../../../components/BodyText";
import CustomInput from "../../../components/CustomInput";
import SelectOptionsCard from "../../../components/SelectOptionsCard";
import StepFooter from "../../../components/StepFooter";
import SelectOptionsModal from "../../../components/SelectOptionsModal";

// Images
import FoodIcon from "./../../../../assets/images/icons/food.png";
import MusicIcon from "./../../../../assets/images/icons/music.png";
import GymIcon from "./../../../../assets/images/icons/gym.png";
import TravelIcon from "./../../../../assets/images/icons/travel.png";
import MovieIcon from "./../../../../assets/images/icons/movie.png";
import BookIcon from "./../../../../assets/images/icons/book.png";

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
    // SelectOptionsCards Data
    musicChips: [
      { id: "1", value: "Lady Gaga", checked: true },
      { id: "2", value: "Rihanna", checked: true },
      { id: "3", value: "Beyonce", checked: true },
      { id: "4", value: "Selena", checked: true },
      { id: "5", value: "Justin Bieber", checked: true },
      { id: "6", value: "DJ Snake", checked: true },
      { id: "7", value: "Ariana Grande", checked: false },
      { id: "8", value: "Dua Lipa", checked: false },
      { id: "9", value: "Billie Eilish", checked: false },
    ],
    movieChips: [
      { id: "1", value: "The Silence of the Lambs", checked: true },
      { id: "2", value: "Butterfly", checked: true },
      { id: "3", value: "Effect", checked: true },
      { id: "4", value: "Hannibal", checked: true },
      { id: "5", value: "Se7en", checked: true },
      { id: "6", value: "One", checked: true },
      { id: "7", value: "Flew Over the Cuckoo’s Nest", checked: false },
      { id: "8", value: "speed", checked: false },
      { id: "9", value: "now", checked: false },
      { id: "10", value: "dark", checked: false },
      { id: "11", value: "globe", checked: false },
    ],
    travelChips: [
      { id: "1", value: "Banff", checked: true },
      { id: "2", value: "Soul", checked: true },
      { id: "3", value: "New York", checked: true },
      { id: "4", value: "LA", checked: true },
      { id: "5", value: "Cuba", checked: true },
      { id: "6", value: "Santorini", checked: true },
      { id: "7", value: "Banff 2", checked: false },
      { id: "8", value: "Banff 3", checked: false },
      { id: "9", value: "Banff 4", checked: false },
      { id: "10", value: "Banff 5", checked: false },
      { id: "11", value: "Banff 6", checked: false },
    ],
    bookChips: [
      { id: "1", value: "kashful mahjoob", checked: false },
      { id: "2", value: "The Pale King", checked: true },
      { id: "3", value: "The Origins of Wealth", checked: true },
    ],
    gymChips: [
      { id: "1", value: "Walking", checked: true },
      { id: "2", value: "Runing", checked: false },
      { id: "3", value: "Football", checked: false },
      { id: "4", value: "Exercie", checked: false },
    ],
    foodChips: [
      { id: "1", value: "Sushi", checked: true },
      { id: "2", value: "Sashimi", checked: false },
      { id: "3", value: "Unagi", checked: false },
      { id: "4", value: "Yakitori", checked: false },
      { id: "2", value: "Hotpot", checked: false },
      { id: "3", value: "Braised Pork Balls", checked: false },
      { id: "4", value: "Chow Mein", checked: false },
    ],
  },
  inputValideties: {
    about_me: false,
    musicChips: true,
    movieChips: true,
    travelChips: true,
    bookChips: true,
    gymChips: true,
    foodChips: true,
  },
  formIsValid: false,
};

const FindRoommateStep2 = (props) => {
  const [selectOptionsModalData, setSelectOptionsModalData] = useState({
    id: "",
    title: "",
    items: null,
    show: false,
  });

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons>
            <Item
              title="skip"
              color={CONFIG.BLACK}
              onPress={navigateToFindRoommateStep3Screen}
            />
          </HeaderButtons>
        );
      },
    });
  }, []);

  const [formState, dispatcherFormState] = useReducer(
    FORM_STATE_REDUCER,
    INIT_FORM_STATE
  );

  const inputChangedHandler = async (data) => {
    // data will be object of {id,value,isvalid}
    await dispatcherFormState({
      type: FORM_INPUT_CHANGED,
      payload: data,
    });

    await closeSelectOptionsModalHandler();
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

  // SelectOptionsCards onPress Handlers
  const showSelectOptionsModalHandler = (data) => {
    // data will be object of {id,title,items,show}
    setSelectOptionsModalData(data);
  };

  const closeSelectOptionsModalHandler = () => {
    setSelectOptionsModalData({
      id: "",
      title: "",
      items: null,
      show: false,
    });
  };

  const navigateToFindRoommateStep3Screen = () => {
    props.navigation.navigate({ name: "find_roommate_step3_screen" });
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
        {/* Music Card */}
        <SelectOptionsCard
          icon={MusicIcon}
          label="Music"
          labelbgcolor="rgba(0, 65, 112, 1)"
          chips={formState.inputValues.musicChips}
          chipbgcolor="rgba(0, 65, 112, .2)"
          chiptextcolor={CONFIG.CHIP_TEXT}
          onPress={() =>
            showSelectOptionsModalHandler({
              id: "musicChips",
              title: "Music",
              items: formState.inputValues.musicChips,
              show: true,
            })
          }
          style={STYLES.optionsCard}
        />
        {/* Movie Card */}
        <SelectOptionsCard
          icon={MovieIcon}
          label="Movie"
          labelbgcolor="#4E64BC"
          chips={formState.inputValues.movieChips}
          chipbgcolor="rgba(78, 100, 188,.3)"
          chiptextcolor={CONFIG.CHIP_TEXT}
          onPress={() =>
            showSelectOptionsModalHandler({
              id: "movieChips",
              title: "Movie",
              items: formState.inputValues.movieChips,
              show: true,
            })
          }
          style={STYLES.optionsCard}
        />
        {/* Travel Card */}
        <SelectOptionsCard
          icon={TravelIcon}
          label="Travel"
          labelbgcolor="#5DB1D5"
          chips={formState.inputValues.travelChips}
          chipbgcolor="rgba(93, 177, 213,.4)"
          chiptextcolor={CONFIG.CHIP_TEXT}
          onPress={() =>
            showSelectOptionsModalHandler({
              id: "travelChips",
              title: "Travel",
              items: formState.inputValues.travelChips,
              show: true,
            })
          }
          style={STYLES.optionsCard}
        />
        {/* Book Card */}
        <SelectOptionsCard
          icon={BookIcon}
          label="Book"
          labelbgcolor="rgba(255, 188, 66,1)"
          chips={formState.inputValues.bookChips}
          chipbgcolor="rgba(255, 188, 66,.2)"
          chiptextcolor={CONFIG.CHIP_TEXT}
          onPress={() =>
            showSelectOptionsModalHandler({
              id: "bookChips",
              title: "Book",
              items: formState.inputValues.bookChips,
              show: true,
            })
          }
          style={STYLES.optionsCard}
        />
        {/* Gym Card */}
        <SelectOptionsCard
          icon={GymIcon}
          label="Gym"
          labelbgcolor="rgb(219, 84, 97)"
          chips={formState.inputValues.gymChips}
          chipbgcolor="rgba(219, 84, 97, .2)"
          chiptextcolor={CONFIG.CHIP_TEXT}
          onPress={() =>
            showSelectOptionsModalHandler({
              id: "gymChips",
              title: "Gym",
              items: formState.inputValues.gymChips,
              show: true,
            })
          }
          style={STYLES.optionsCard}
        />
        {/* Food Card */}
        <SelectOptionsCard
          icon={FoodIcon}
          label="Food"
          labelbgcolor="rgba(143, 45, 86, 1)"
          chips={formState.inputValues.foodChips}
          chipbgcolor="rgba(143, 45, 86, .2)"
          chiptextcolor={CONFIG.CHIP_TEXT}
          onPress={() =>
            showSelectOptionsModalHandler({
              id: "foodChips",
              title: "Food",
              items: formState.inputValues.foodChips,
              show: true,
            })
          }
          style={STYLES.optionsCard}
        />
        <StepFooter
          currentStep="2"
          totalSteps="5"
          onPress={navigateToFindRoommateStep3Screen}
        ></StepFooter>
        {/* Select Options Modal - we will pass data and onSelect function dynamically */}
        {selectOptionsModalData.show && (
          <SelectOptionsModal
            id={selectOptionsModalData.id}
            visible={selectOptionsModalData.show}
            title={selectOptionsModalData.title}
            items={selectOptionsModalData.items}
            closeModal={closeSelectOptionsModalHandler}
            onFinish={inputChangedHandler}
          />
        )}
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
    marginTop: 20,
  },
});

export default FindRoommateStep2;
