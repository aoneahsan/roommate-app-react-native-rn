// #region ---- Core Imports ----
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { Formik, Form } from "formik";
import {
  ZButton,
  ZCard,
  ZContainer,
  ZPage,
  ZRadioCardsGroup,
  ZRadioCardsItem,
  ZRUColorE,
  ZSeparator,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";

// #endregion

// #region ---- Types Imports ----
import {
  ECleanlinessType,
  EFoodPreferenceType,
  EGuestsType,
  EOccupationType,
  EPetsType,
  ESmokeType,
  EWorkScheduleType,
} from "@/types/preference";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZArrowRightLongIcon } from "@/assets";

// #endregion

const MyLifeStyle: React.FC = () => {
  const initialValues = useMemo(() => ({}), []);

  const myLifeStyle = useMemo(
    () => [
      {
        label: "Cleanliness",
        name: "cleanliness",
        items: [
          {
            value: ECleanlinessType.superClean,
            label: "Super Clean",
          },
          {
            value: ECleanlinessType.clean,
            label: "Clean",
          },
          {
            value: ECleanlinessType.lessClean,
            label: "Less Clean",
          },
          {
            value: ECleanlinessType.normalClean,
            label: "Normal Clean",
          },
        ],
      },
      {
        label: "Smoke",
        name: "smoke",
        items: [
          {
            value: ESmokeType.no,
            label: "No",
          },
          {
            value: ESmokeType.yes,
            label: "Yes",
          },
          {
            value: ESmokeType.other,
            label: "Other",
          },
        ],
      },
      {
        label: "Pets",
        name: "pets",
        items: [
          {
            value: EPetsType.no,
            label: "No",
          },
          {
            value: EPetsType.yes,
            label: "Yes",
          },
          {
            value: EPetsType.dependsOnThePet,
            label: "Depends on the pet",
          },
        ],
      },
      {
        label: "Guests",
        name: "guests",
        items: [
          {
            value: EGuestsType.no,
            label: "No",
          },
          {
            value: EGuestsType.yes,
            label: "Yes",
          },
          {
            value: EGuestsType.occasionally,
            label: "Occasionally",
          },
        ],
      },
      {
        label: "Occupation",
        name: "occupation",
        items: [
          {
            value: EOccupationType.student,
            label: "Student",
          },
          {
            value: EOccupationType.haveWork,
            label: "Have a work",
          },
          {
            value: EOccupationType.other,
            label: "Other",
          },
        ],
      },
      {
        label: "Food Preference",
        name: "foodPreference",
        items: [
          {
            value: EFoodPreferenceType.vegan,
            label: "Vegan",
          },
          {
            value: EFoodPreferenceType.vegetarian,
            label: "Vegetarian",
          },
          {
            value: EFoodPreferenceType.other,
            label: "Other",
          },
        ],
      },
      {
        label: "Work Schedule",
        name: "workSchedule",
        items: [
          {
            value: EWorkScheduleType.dayTime,
            label: "Day time",
          },
          {
            value: EWorkScheduleType.nightTime,
            label: "Night time",
          },
          {
            value: EWorkScheduleType.other,
            label: "Other",
          },
        ],
      },
    ],
    []
  );

  return (
    <ZPage>
      <NavigationHeader title="My Life Style" />

      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <ZContainer size="3" className="my-6 maxLg:mx-3">
                <ZCard className="*:w-full space-y-3 p-5">
                  {myLifeStyle?.map((el, index) => (
                    <>
                      <ZCard key={index}>
                        <ZText className="inline-block mb-1">{el?.label}</ZText>
                        <ZRadioCardsGroup
                          className="*:w-max justify-start flex *:h-8 flex-wrap"
                          color={ZRUColorE.purple}
                        >
                          {el?.items?.map((item, itemIndex) => (
                            <ZRadioCardsItem
                              value={item?.value}
                              key={itemIndex}
                              className="w-max"
                            >
                              {item?.label}
                            </ZRadioCardsItem>
                          ))}
                        </ZRadioCardsGroup>
                      </ZCard>
                      <ZSeparator />
                    </>
                  ))}
                </ZCard>
                <ZButton className="mt-6 max900px:w-full">
                  Save & Continue <ZArrowRightLongIcon className="mt-px" />
                </ZButton>
              </ZContainer>
            </Form>
          );
        }}
      </Formik>
    </ZPage>
  );
};

export default MyLifeStyle;
