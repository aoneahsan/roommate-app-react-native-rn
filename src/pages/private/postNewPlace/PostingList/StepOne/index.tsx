// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBadge,
  ZBox,
  ZButton,
  ZCard,
  ZContainer,
  ZFlex,
  ZPage,
  ZPrizeInput,
  ZRCSelect,
  ZRUAlignE,
  ZRUColorE,
  ZText,
  ZTextArea,
} from "zaions-react-ui-kit";
import { ZodError } from "zod";
import { Form, Formik } from "formik";
import { isZNonEmptyString } from "zaions-tool-kit";
import { useNavigate } from "@tanstack/react-router";
import { useRecoilValue, useRecoilState } from "recoil";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import { AppRoutes } from "@/routes/appRoutes";
import constants from "@/utils/constants";
import { postingListStepOneValidationSchema } from "@/validationSchema";
import ZBuildingTypeData from "@/data/buildingType";
import ZPlacePreferenceData from "@/data/placePreference";

// #endregion

// #region ---- Types Imports ----
import type { IPLStepOne } from "@/types/postingList";

// #endregion

// #region ---- Store Imports ----
import { formValidationRStateAtom } from "@/state/formState";
import { plStepOneRStateAtom } from "@/state/postingList";

// #endregion

// #region ---- Images Imports ----
import { ZAddIcon, ZArrowRightLongIcon, ZEditOutlineIcon } from "@/assets";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import FormActionButtons from "@/components/form/FormActionButtons";

// #endregion

const PLStepOne: React.FC = () => {
  const navigate = useNavigate();
  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const [plStepOneRState, setPlStepOneRState] =
    useRecoilState(plStepOneRStateAtom);

  const initialValues = useMemo<IPLStepOne>(
    () => ({
      [FormFieldsEnum.title]: plStepOneRState?.[FormFieldsEnum.title] ?? "",
      [FormFieldsEnum.buildingType]:
        plStepOneRState?.[FormFieldsEnum.buildingType] ?? null,
      [FormFieldsEnum.location]:
        plStepOneRState?.[FormFieldsEnum.location] ?? null,
      [FormFieldsEnum.placePreference]:
        plStepOneRState?.[FormFieldsEnum.placePreference] ?? null,
      [FormFieldsEnum.rentFee]:
        plStepOneRState?.[FormFieldsEnum.rentFee] ?? null,
    }),
    [plStepOneRState]
  );

  // #region Functions
  const formikValidation = useCallback((values: IPLStepOne) => {
    if (formValidationRState.frontendFormValidationIsEnabled) {
      try {
        postingListStepOneValidationSchema.parse(values);
      } catch (error) {
        if (error instanceof ZodError) {
          return error.formErrors.fieldErrors;
        }
      }
    }
  }, []);
  // #endregion

  return (
    <ZPage>
      <NavigationHeader title="Posting List" />

      <Formik
        initialValues={initialValues}
        validate={formikValidation}
        enableReinitialize
        onSubmit={() => {}}
      >
        {({
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => {
          return (
            <Form>
              <ZContainer size="4" className="my-6 maxLg:mx-3">
                <ZBox className="space-y-4 mb-7">
                  <ZTextArea
                    required
                    rows={6}
                    label="Title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name={FormFieldsEnum.title}
                    placeholder="Maximum 50 words"
                    value={values?.[FormFieldsEnum.title]}
                    isTouched={touched?.[FormFieldsEnum.title]}
                    errorMessage={errors?.[FormFieldsEnum.title]}
                  />

                  <ZRCSelect
                    label="Building type"
                    onBlur={handleBlur}
                    options={ZBuildingTypeData}
                    name={FormFieldsEnum.buildingType}
                    placeholder="Select building type"
                    isTouched={touched?.[FormFieldsEnum.buildingType]}
                    errorMessage={errors?.[FormFieldsEnum.buildingType]}
                    value={ZBuildingTypeData?.find(
                      (el) =>
                        el?.value === values?.[FormFieldsEnum.buildingType]
                    )}
                    onChange={(selectedOption) => {
                      setFieldValue(
                        FormFieldsEnum.buildingType,
                        selectedOption?.value
                      );
                    }}
                  />

                  <ZCard>
                    <ZFlex className="gap-3 min900px:items-center max900px:flex-col">
                      <ZText>Location</ZText>
                      <ZBadge
                        size="3"
                        color={ZRUColorE.lime}
                        className="text-wrap"
                      >
                        {isZNonEmptyString(
                          plStepOneRState?.location?.formattedAddress
                        )
                          ? plStepOneRState?.location?.formattedAddress
                          : constants?.defaultValue?.fallbackValue}
                      </ZBadge>
                      <ZButton
                        className="min900px:ms-auto"
                        color={ZRUColorE.iris}
                        onClick={() => {
                          setPlStepOneRState((prev) => ({
                            ...prev,
                            [FormFieldsEnum.title]:
                              values?.[FormFieldsEnum.title],
                            [FormFieldsEnum.buildingType]:
                              values?.[FormFieldsEnum.buildingType],
                            [FormFieldsEnum.placePreference]:
                              values?.[FormFieldsEnum.placePreference],
                            [FormFieldsEnum.rentFee]:
                              values?.[FormFieldsEnum.rentFee],
                            [FormFieldsEnum.location]:
                              values?.[FormFieldsEnum.location],
                          }));
                          navigate({
                            to: AppRoutes.postingListSub.selectLocation,
                          });
                        }}
                      >
                        {isZNonEmptyString(
                          plStepOneRState?.location?.formattedAddress
                        ) ? (
                          <>
                            <ZEditOutlineIcon className="w-5 h-5" /> Edit
                          </>
                        ) : (
                          <>
                            <ZAddIcon className="w-5 h-5" /> Add
                          </>
                        )}
                      </ZButton>
                    </ZFlex>
                  </ZCard>

                  <ZRCSelect
                    label="Place"
                    onBlur={handleBlur}
                    placeholder="Select place"
                    options={ZPlacePreferenceData}
                    name={FormFieldsEnum.placePreference}
                    isTouched={touched?.[FormFieldsEnum.placePreference]}
                    errorMessage={errors?.[FormFieldsEnum.placePreference]}
                    value={ZPlacePreferenceData?.find(
                      (el) =>
                        el?.value === values?.[FormFieldsEnum.placePreference]
                    )}
                    onChange={(selectedOption) => {
                      setFieldValue(
                        FormFieldsEnum.placePreference,
                        selectedOption?.value
                      );
                    }}
                  />

                  <ZFlex align={ZRUAlignE.start} className="gap-3">
                    <ZPrizeInput
                      className="w-full"
                      label="Rent fee"
                      // onBlur={handleBlur}
                      errorMessage={errors?.[FormFieldsEnum.rentFee]}
                      value={values?.[FormFieldsEnum.rentFee] ?? undefined}
                      onChange={(selectedOption) => {
                        setFieldValue(FormFieldsEnum.rentFee, selectedOption);
                      }}
                    />
                    <ZBadge
                      size="3"
                      className="tracking-wide mt-7"
                      color={ZRUColorE.lime}
                    >
                      /Mon
                    </ZBadge>
                  </ZFlex>
                </ZBox>
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

export default PLStepOne;
