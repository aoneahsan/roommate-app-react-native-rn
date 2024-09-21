// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBadge,
  ZBox,
  ZCard,
  ZDataList,
  ZFlex,
  ZHeading,
  ZRUAlignE,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUJustifyE,
  ZRUOrientationE,
  ZRUTextAsE,
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
import { ZFilmOutlineIcon, ZMusicOutlineIcon } from "@/assets";

// #endregion

const Gigi: React.FC = () => {
  return (
    <>
      <ZBox className="md:px-2 md:py-2">
        <ZFlex
          align={ZRUAlignE.center}
          justify={ZRUJustifyE.between}
          className="maxSm:flex-col maxSm:gap-3 maxSm:*:w-full"
        >
          <ZHeading className="text-2xl font-medium tracking-wider md:text-4xl maxSm:text-center">
            Gigi
          </ZHeading>
        </ZFlex>

        <ZFlex
          align={ZRUAlignE.stretch}
          className="gap-4 mt-3 *:flex-1 maxMd:flex-col"
        >
          <ZCard>
            <ZHeading
              as={ZRUHeadingAsE.h4}
              className="text-xl font-medium tracking-wide maxSm:text-center"
              color={ZRUColorE.cyan}
            >
              Personal Info
            </ZHeading>

            <ZDataList
              className="mt-4"
              dataList={[
                {
                  className: "text-base",
                  label: "Name:",
                  value: "Gigi",
                },
                {
                  className: "text-base",
                  label: "Gender:",
                  value: "Male",
                },
                {
                  className: "text-base",
                  label: "Occupation:",
                  value: "Student",
                },
              ]}
            />
          </ZCard>

          <ZFlex
            align={ZRUAlignE.stretch}
            className="gap-4 *:flex-1 *:space-y-3 maxMd:flex-col"
          >
            <ZCard>
              <ZFlex className="items-center justify-center">
                <ZMusicOutlineIcon className="w-11 h-11" />
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
            <ZCard>
              <ZFlex className="items-center justify-center">
                <ZFilmOutlineIcon className="w-11 h-11" />
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
        </ZFlex>

        <ZFlex
          align={ZRUAlignE.stretch}
          className="gap-4 mt-3 *:flex-1 maxMd:flex-col"
        >
          <ZCard>
            <ZHeading
              as={ZRUHeadingAsE.h4}
              className="text-xl font-medium tracking-wide maxSm:text-center"
              color={ZRUColorE.cyan}
            >
              Room Preference
            </ZHeading>

            <ZDataList
              className="mt-4"
              dataList={[
                {
                  className: "text-base",
                  label: "Budget:",
                  value: "700-1200",
                },
              ]}
            />

            <ZText className="mt-2" as={ZRUTextAsE.p}>
              Entered Room Condo
            </ZText>
          </ZCard>
          <ZCard>
            <ZHeading
              as={ZRUHeadingAsE.h4}
              className="text-xl font-medium tracking-wide maxSm:text-center"
              color={ZRUColorE.cyan}
            >
              Roommate Preference
            </ZHeading>
            <ZText className="mt-2" as={ZRUTextAsE.p}>
              Female only
            </ZText>
            <ZDataList
              className="mt-4"
              dataList={[
                {
                  className: "text-base",
                  label: "Age:",
                  value: "25-80",
                },
                {
                  className: "text-base",
                  label: "Smoke:",
                  value: "unlimited",
                },
              ]}
            />
          </ZCard>
        </ZFlex>
      </ZBox>
    </>
  );
};

export default Gigi;
