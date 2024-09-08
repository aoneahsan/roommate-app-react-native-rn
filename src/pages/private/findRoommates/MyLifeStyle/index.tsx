// #region ---- Core Imports ----
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { Formik, Form } from "formik";
import {
  ZButton,
  ZCard,
  ZContainer,
  ZFlex,
  ZPage,
  ZRadioCardsGroup,
  ZRadioCardsItem,
  ZRUColorE,
  ZSeparator,
  ZText,
} from "zaions-react-ui-kit";
import { useNavigate } from "@tanstack/react-router";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import { AppRoutes } from "@/routes/appRoutes";

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
import { ZArrowLeftLongIcon, ZArrowRightLongIcon } from "@/assets";
import FormActionButtons from "@/components/form/FormActionButtons";
import { IMyLifeStyle } from "@/types/myLifeStyle";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";

// #endregion

const MyLifeStyle: React.FC = () => {
  const navigate = useNavigate();
  const initialValues = useMemo<IMyLifeStyle>(
    () => ({
      [FormFieldsEnum.cleanliness]: undefined,
      [FormFieldsEnum.smoke]: undefined,
      [FormFieldsEnum.pets]: undefined,
      [FormFieldsEnum.guests]: undefined,
      [FormFieldsEnum.occupation]: undefined,
      [FormFieldsEnum.foodPreference]: undefined,
      [FormFieldsEnum.workSchedule]: undefined,
    }),
    []
  );

  const myLifeStyle = useMemo(
    () =>
      [
        {
          label: "Cleanliness",
          name: FormFieldsEnum.cleanliness,
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
          name: FormFieldsEnum.smoke,
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
          name: FormFieldsEnum.pets,
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
          name: FormFieldsEnum.guests,
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
          name: FormFieldsEnum.occupation,
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
          name: FormFieldsEnum.foodPreference,
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
          name: FormFieldsEnum.workSchedule,
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
      ] as const,
    []
  );

  return (
    <ZPage>
      <NavigationHeader
        title="My Life Style"
        beforeBoxContent={
          <>
            <ZButton
              onClick={() => {
                navigate({
                  to: AppRoutes.hobbies,
                });
              }}
              className="maxMd:w-full"
            >
              <ZArrowLeftLongIcon /> Go Back
            </ZButton>
          </>
        }
      />

      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          navigate({
            to: AppRoutes.roommatesPreference,
          });
        }}
      >
        {({ dirty, values, setFieldValue }) => {
          return (
            <Form>
              <ZContainer size="3" className="my-6 maxLg:mx-3">
                <ZCard className="*:w-full space-y-3 p-5 mb-4">
                  {myLifeStyle?.map((el, index) => (
                    <>
                      <ZCard key={index}>
                        <ZText className="inline-block mb-1">{el?.label}</ZText>
                        <ZRadioCardsGroup
                          className="*:w-max justify-start flex *:h-8 flex-wrap"
                          color={ZRUColorE.purple}
                          value={values?.[el?.name]}
                          onValueChange={(value) => {
                            setFieldValue(el?.name, value);
                          }}
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
                      {/* Conditionally render the separator except for the last element */}
                      {index !== myLifeStyle.length - 1 && <ZSeparator />}
                    </>
                  ))}
                </ZCard>

                <ZFlex className="maxMd:flex-col md:justify-between md:items-center">
                  <FormActionButtons
                    showResetButton={false}
                    disabledSubmitBtn={!dirty}
                    submitButtonContent={
                      <>
                        Save & Continue{" "}
                        <ZArrowRightLongIcon className="mt-px" />
                      </>
                    }
                  />

                  <ZButton
                    color={ZRUColorE.iris}
                    type="button"
                    className="maxMd:w-full"
                    onClick={() => {
                      navigate({
                        to: AppRoutes.roommatesPreference,
                      });
                    }}
                  >
                    Skip
                  </ZButton>
                </ZFlex>
              </ZContainer>
            </Form>
          );
        }}
      </Formik>
    </ZPage>
  );
};

export default MyLifeStyle;
