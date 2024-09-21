// #region ---- Core Imports ----
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { useNavigate } from "@tanstack/react-router";
import { Form, Formik } from "formik";
import {
  ZButton,
  ZCard,
  ZContainer,
  ZFlex,
  ZPage,
  ZRadioCardsGroup,
  ZRadioCardsItem,
  ZRCSelect,
  ZRUColorE,
  ZText,
  ZTextArea,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import FormActionButtons from "@/components/form/FormActionButtons";
import NavigationHeader from "@/components/private/NavigationHeader";
import { AppRoutes } from "@/routes/appRoutes";

// #endregion

// #region ---- Types Imports ----
import {
  EGenderType,
  EGuestsType,
  EPetsType,
  type IRoommatesPreference,
} from "@/types/preference";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZArrowLeftLongIcon, ZArrowRightLongIcon } from "@/assets";
import ZAgesData from "@/data/ages";
import ZCleanlinessData from "@/data/cleanliness";
import ZSmokeData from "@/data/smoke";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";

// #endregion

const RoommatesPreference: React.FC = () => {
  const navigate = useNavigate();
  const initialValues = useMemo<IRoommatesPreference>(
    () => ({
      [FormFieldsEnum.age]: undefined,
      [FormFieldsEnum.gender]: undefined,
      [FormFieldsEnum.smoke]: undefined,
      [FormFieldsEnum.pets]: undefined,
      [FormFieldsEnum.guests]: undefined,
      [FormFieldsEnum.cleanliness]: undefined,
      [FormFieldsEnum.others]: "",
    }),
    []
  );

  const roommatesPreference = useMemo(
    () =>
      [
        {
          label: "Gender",
          name: FormFieldsEnum.gender,
          items: [
            { label: "Male", value: EGenderType.male },
            { label: "Female", value: EGenderType.female },
            { label: "Non-Binary", value: EGenderType.nonBinary },
            { label: "All", value: EGenderType.all },
          ],
        },
        {
          label: "Smoke",
          name: FormFieldsEnum.smoke,
          items: ZSmokeData,
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
          label: "Cleanliness",
          name: FormFieldsEnum.cleanliness,
          items: ZCleanlinessData,
        },
      ] as const,
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
            to: AppRoutes.credit,
          });
        }}
      >
        {({
          setFieldValue,
          handleBlur,
          handleChange,
          values,
          errors,
          touched,
          dirty,
          setFieldTouched,
        }) => {
          return (
            <Form>
              <ZContainer size="3" className="my-6 maxLg:mx-3">
                <ZCard className="*:w-full space-y-3 sm:p-5 mb-4">
                  {/* <ZCard>
                    <ZText>Age</ZText>
                    <ZFlex className="w-full gap-3 maxSm:flex-col sm:items-center">
                      <ZText className="text-lg">18+</ZText>
                      <ZBox className="flex-1 maxSm:w-full">
                        <ZSlider
                          defaultValue={[0, 10]}
                          onValueChange={(value) => {}}
                        />
                      </ZBox>
                      <ZText className="text-lg maxSm:ms-auto">100</ZText>
                    </ZFlex>
                  </ZCard> */}

                  <ZRCSelect
                    label="Age"
                    name={FormFieldsEnum.age}
                    // required
                    // value={values?.[FormFieldsEnum.age]}
                    isTouched={touched?.[FormFieldsEnum.age]}
                    placeholder="Select Your Age"
                    isMulti={false}
                    options={ZAgesData}
                    errorMessage={errors?.[FormFieldsEnum.age]}
                    onBlur={() => {
                      if (!touched?.[FormFieldsEnum.age]) {
                        setFieldTouched(FormFieldsEnum.age, true);
                      }
                    }}
                    onChange={(value) => {
                      setFieldValue(FormFieldsEnum.age, value);
                    }}
                  />

                  {roommatesPreference?.map((el, index) => (
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
                  ))}

                  <ZTextArea
                    label="Others"
                    placeholder="Maximum 250 words"
                    rows={6}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name={FormFieldsEnum.others}
                    value={values?.[FormFieldsEnum.others]}
                    isTouched={touched?.[FormFieldsEnum.others]}
                    errorMessage={errors?.[FormFieldsEnum.others]}
                  />
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
                        to: AppRoutes.credit,
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

export default RoommatesPreference;
