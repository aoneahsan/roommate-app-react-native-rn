// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBadge,
  ZCard,
  ZFlex,
  ZRUAlignE,
  ZRUColorE,
  ZRUJustifyE,
  ZRUOrientationE,
  ZSeparator,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZFilmOutlineIcon,
  ZMapAltOutlineIcon,
  ZMusicOutlineIcon,
} from "@/assets";

// #endregion

const ViewPersonHobbies: React.FC = () => {
  return (
    <>
      <ZFlex className="flex-wrap items-center gap-2">
        <ZCard className="space-y-3 w-96">
          <ZFlex align={ZRUAlignE.center} className="gap-4">
            <ZMusicOutlineIcon className="w-6 h-6" />
            <ZText className="text-base tracking-wide">Music</ZText>
          </ZFlex>

          <ZSeparator
            className="w-full"
            orientation={ZRUOrientationE.horizontal}
          />

          <ZFlex
            align={ZRUAlignE.center}
            justify={ZRUJustifyE.center}
            className="flex-wrap gap-3 *:font-normal *:text-sm"
          >
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
          </ZFlex>
        </ZCard>

        <ZCard className="space-y-3 w-96">
          <ZFlex align={ZRUAlignE.center} className="gap-4">
            <ZFilmOutlineIcon className="w-6 h-6" />
            <ZText className="text-base tracking-wide">Movie</ZText>
          </ZFlex>

          <ZSeparator
            className="w-full"
            orientation={ZRUOrientationE.horizontal}
          />

          <ZFlex
            align={ZRUAlignE.center}
            justify={ZRUJustifyE.center}
            className="flex-wrap gap-3 *:font-normal *:text-sm"
          >
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
          </ZFlex>
        </ZCard>

        <ZCard className="space-y-3 w-96">
          <ZFlex align={ZRUAlignE.center} className="gap-4">
            <ZMapAltOutlineIcon className="w-6 h-6" />
            <ZText className="text-base tracking-wide">Travel</ZText>
          </ZFlex>

          <ZSeparator
            className="w-full"
            orientation={ZRUOrientationE.horizontal}
          />

          <ZFlex
            align={ZRUAlignE.center}
            justify={ZRUJustifyE.center}
            className="flex-wrap gap-3 *:font-normal *:text-sm"
          >
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
            <ZBadge color={ZRUColorE.sky}>Some thing</ZBadge>
          </ZFlex>
        </ZCard>
      </ZFlex>
    </>
  );
};

export default ViewPersonHobbies;
