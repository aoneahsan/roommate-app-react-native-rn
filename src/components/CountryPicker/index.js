// Core Imports
import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CountryPickerModal from "react-native-country-picker-modal";

// Custom Imports
import * as CONFIG from "./../../config";
import BodyText from "./../BodyText";

const CountryPicker = (props) => {
  const defaultCountry = {
    callingCode: ["1"],
    cca2: "US",
    currency: ["USD"],
    flag: "flag-us",
    name: "United States",
    region: "Americas",
    subregion: "North America",
  };
  const [showModal, setShowModal] = useState(false);
  const [country, setCountry] = useState(defaultCountry);
  const [countryCode, setCountryCode] = useState(country.cca2);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);

  useEffect(() => {
    if (props.onSelect) {
      props.onSelect(country.name, country.callingCode[0]);
    }
  }, [country]);

  const onCountrySelectHandler = (country) => {
    setCountry(country);
    setCountryCode(country.cca2);
    setShowModal(false);
  };

  const showCountrySelectHandler = () => {
    setShowModal(true);
  };

  const hideCountrySelectHandler = () => {
    setShowModal(false);
  };
  return (
    <TouchableOpacity style={STYLES.main} onPress={showCountrySelectHandler}>
      <View style={STYLES.textCon}>
        <BodyText style={STYLES.label}>Country/Region</BodyText>
        <View style={STYLES.input}>
          <CountryPickerModal
            {...{
              countryCode,
              withFilter,
              withFlag,
              withCountryNameButton,
              withAlphaFilter,
              withCallingCode,
              withEmoji,
              onSelect: onCountrySelectHandler,
            }}
            visible={showModal}
            onClose={hideCountrySelectHandler}
          />
          <BodyText style={STYLES.inputText}>
            {country.name} ({country.callingCode[0]})
          </BodyText>
        </View>
      </View>
      <View style={STYLES.iconCon}>
        <Ionicons
          style={STYLES.icon}
          name="chevron-down"
          size={26}
          color={CONFIG.BLACK}
        />
      </View>
    </TouchableOpacity>
  );
};

const STYLES = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: CONFIG.LIGHT_TEXT_COLOR,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  textCon: {},
  label: {
    color: CONFIG.LIGHT_TEXT_COLOR,
    fontSize: CONFIG.INPUT_LABEL_SIZE,
  },
  input: {
    flexDirection: "row",
    marginTop: 2,
  },
  inputText: {
    fontSize: CONFIG.INPUT_TEXT_SIZE,
    marginTop: 2,
    fontWeight: CONFIG.FONT_WEIGHT_SIME_BOLD.toString(),
  },
  iconCon: {},
  icon: {
    marginTop: 7,
  },
});

export default CountryPicker;
