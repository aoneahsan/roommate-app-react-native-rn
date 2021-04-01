import React from 'react';
import { Ionicons } from "@expo/vector-icons";

import * as COLORS from "./../../utils/colors";
import * as FONTS from "./../../utils/fonts";

export const commonStackScreenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? COLORS.PRIMARY : COLORS.WHITE,
    borderBottomColor:
      Platform.OS === "android" ? COLORS.PRIMARY : COLORS.PRIMARY,
  },
  headerTitleStyle: {
    color: Platform.OS === "android" ? COLORS.WHITE : COLORS.PRIMARY,
    fontFamily: FONTS.BOLD,
  },
  headerBackTitleStyle: {
    fontFamily: FONTS.REGULAR,
  },
  headerBackImage: () => (
    <Ionicons
      name="ios-arrow-round-back"
      size={29}
      style={{ fontFamily: FONTS.BOLD }}
      color={COLORS.WHITE}
    />
  ),
};
