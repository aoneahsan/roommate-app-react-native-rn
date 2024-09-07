// #region ---- Core Imports ----
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBox,
  ZButton,
  ZCard,
  ZContainer,
  ZFlex,
  ZPage,
  ZRadioCardsGroup,
  ZRadioCardsItem,
  ZRUAlignE,
  ZRUColorE,
  ZSlider,
  ZText,
  ZTextArea,
} from "zaions-react-ui-kit";
import { Form, Formik } from "formik";
import { useNavigate } from "@tanstack/react-router";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import FormActionButtons from "@/components/form/FormActionButtons";
import { AppRoutes } from "@/routes/appRoutes";

// #endregion

// #region ---- Types Imports ----
import {
  ECleanlinessType,
  EGenderType,
  EGuestsType,
  EPetsType,
  ESmokeType,
  type IRoommatesPreference,
} from "@/types/preference";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZArrowLeftLongIcon, ZArrowRightLongIcon } from "@/assets";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";

// #endregion

const RoommatesPreference: React.FC = () => {
  const navigate = useNavigate();
  const initialValues = useMemo<IRoommatesPreference>(
    () => ({
      [FormFieldsEnum.gender]: undefined,
      [FormFieldsEnum.smoke]: undefined,
      [FormFieldsEnum.pets]: undefined,
      [FormFieldsEnum.guests]: undefined,
      [FormFieldsEnum.cleanliness]: undefined,
    }),
    []
  );

  const roommatesPreference = useMemo(
    () => [
      {
        label: "Gender",
        name: "gender",
        items: [
          { label: "Male", value: EGenderType.male },
          { label: "Female", value: EGenderType.female },
          { label: "Non-Binary", value: EGenderType.nonBinary },
          { label: "All", value: EGenderType.all },
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
    ],
    []
  );

  return (
    <ZPage>
      <NavigationHeader
        title="Roommates Preference"
        beforeBoxContent={
          <>
            <ZButton
              onClick={() => {
                navigate({
                  to: AppRoutes.myLifeStyle,
                });
              }}
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
            to: AppRoutes.credit,
          });
        }}
      >
        {() => {
          return (
            <Form>
              <ZContainer size="3" className="my-6 maxLg:mx-3">
                <ZCard className="*:w-full space-y-3 p-5 mb-4">
                  <ZCard>
                    <ZText>Age</ZText>
                    <ZFlex align={ZRUAlignE.center} className="w-full gap-3">
                      <ZText className="text-lg">18+</ZText>
                      <ZBox className="flex-1">
                        <ZSlider defaultValue={[0, 10]} />
                      </ZBox>
                      <ZText className="text-lg">100</ZText>
                    </ZFlex>
                  </ZCard>

                  {roommatesPreference?.map((el, index) => (
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
                  ))}

                  <ZTextArea
                    label="Others"
                    placeholder="Maximum 250 words"
                    rows={6}
                  />
                </ZCard>
                <FormActionButtons
                  showResetButton={false}
                  submitButtonContent={
                    <>
                      Save & Continue <ZArrowRightLongIcon className="mt-px" />
                    </>
                  }
                />
              </ZContainer>
            </Form>
          );
        }}
      </Formik>
    </ZPage>
  );
};

export default RoommatesPreference;
