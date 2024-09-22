// #region ---- Core Imports ----
import { ZMessageOutlineIcon } from "@/assets";
import { EViewPersonSegment } from "@/types/ViewPerson";
import React, { useState } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZAvatar,
  ZBox,
  ZButton,
  ZCard,
  ZDataList,
  ZFlex,
  ZHeading,
  ZRUAlignE,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUJustifyE,
  ZRURadiusE,
  ZSegmentedControl,
  ZSegmentedControlItem,
  ZText,
} from "zaions-react-ui-kit";
import ViewPersonHobbies from "./Hobbies";
import ViewPersonMyLifeStyle from "./MyLifeStyle";
import ViewPersonRoomPreference from "./RoomPreference";
import ViewPersonRoommatePreference from "./RoommatePreference";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ViewPerson: React.FC = () => {
  const [type, setType] = useState(EViewPersonSegment.roomPreference);
  return (
    <>
      <ZCard>
        <ZFlex align={ZRUAlignE.center} justify={ZRUJustifyE.between}>
          <ZFlex align={ZRUAlignE.center} className="gap-3">
            <ZAvatar fallback="a" size="5" radius={ZRURadiusE.medium} />
            <ZBox>
              <ZHeading
                as={ZRUHeadingAsE.h5}
                className="text-base font-medium md:text-xl"
              >
                Kelly
              </ZHeading>
              <ZText className="block text-xs" color={ZRUColorE.gray}>
                User ID: 12345678
              </ZText>
              <ZText className="block text-xs" color={ZRUColorE.gray}>
                Location: Toronto
              </ZText>
            </ZBox>
          </ZFlex>
          <ZBox className="md:me-3">
            <ZButton className="tracking-wide">
              <ZMessageOutlineIcon className="w-5 h-5" /> Message
            </ZButton>
          </ZBox>
        </ZFlex>
      </ZCard>

      <ZFlex align={ZRUAlignE.start} className="flex-wrap gap-5 mt-5">
        <ZCard className="w-96">
          <ZDataList
            dataList={[
              {
                className: "text-base",
                label: "Age:",
                value: "25-30",
                valueProps: {
                  className: "justify-end",
                },
              },
              {
                className: "text-base",
                label: "Constellations:",
                value: "Leo",
                valueProps: {
                  className: "justify-end",
                },
              },
              {
                className: "text-base",
                label: "Hometown:",
                value: "Ontario",
                valueProps: {
                  className: "justify-end",
                },
              },
              {
                className: "text-base",
                label: "Language:",
                value: "English, Franch",
                valueProps: {
                  className: "justify-end",
                },
              },
            ]}
          />
        </ZCard>
        <ZCard className="flex flex-wrap gap-3 w-96">
          {[...Array(8)]?.map((el) => (
            <ZAvatar
              size="6"
              fallback="R"
              radius={ZRURadiusE.medium}
              className="cursor-pointer"
              key={el}
            />
          ))}
        </ZCard>
      </ZFlex>

      <ZSegmentedControl
        className="w-full mt-5"
        onValueChange={(val) => setType(() => val as EViewPersonSegment)}
      >
        <ZSegmentedControlItem
          value={EViewPersonSegment.roomPreference}
          className="maxSm:*:px-0"
        >
          <ZText
            className="text-base tracking-wide maxSm:text-xs"
            color={ZRUColorE.sky}
          >
            Room Preference
          </ZText>
        </ZSegmentedControlItem>
        <ZSegmentedControlItem
          value={EViewPersonSegment.hobbies}
          className="maxSm:*:px-0"
        >
          <ZText
            className="text-base tracking-wide maxSm:text-xs"
            color={ZRUColorE.sky}
          >
            Hobbies
          </ZText>
        </ZSegmentedControlItem>
        <ZSegmentedControlItem
          value={EViewPersonSegment.myLifeStyle}
          className="maxSm:*:px-0"
        >
          <ZText
            className="text-base tracking-wide maxSm:text-xs"
            color={ZRUColorE.sky}
          >
            My Life Style
          </ZText>
        </ZSegmentedControlItem>
        <ZSegmentedControlItem
          value={EViewPersonSegment.roommatePreference}
          className="maxSm:*:px-0"
        >
          <ZText
            className="text-base tracking-wide maxSm:text-xs"
            color={ZRUColorE.sky}
          >
            Roommate Preference
          </ZText>
        </ZSegmentedControlItem>
      </ZSegmentedControl>

      <ZBox className="mt-6">
        {
          {
            [EViewPersonSegment.roomPreference]: <ViewPersonRoomPreference />,
            [EViewPersonSegment.hobbies]: <ViewPersonHobbies />,
            [EViewPersonSegment.myLifeStyle]: <ViewPersonMyLifeStyle />,
            [EViewPersonSegment.roommatePreference]: (
              <ViewPersonRoommatePreference />
            ),
          }[type]
        }
      </ZBox>
    </>
  );
};

export default ViewPerson;
