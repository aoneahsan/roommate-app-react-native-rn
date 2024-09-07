// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { useNavigate } from "@tanstack/react-router";
import {
  ZBox,
  ZButton,
  ZCard,
  ZContainer,
  ZFlex,
  ZHeading,
  ZInput,
  ZPage,
  ZRadioCardList,
  ZRUAlignE,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUInputTypeE,
  ZRUJustifyE,
  ZSelect,
  ZText,
  ZTextArea,
} from "zaions-react-ui-kit";
import { useRecoilValue } from "recoil";
import { ZodError } from "zod";
import { Formik, Form } from "formik";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import { AppRoutes } from "@/routes/appRoutes";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import { agreementStatusEnum, frequencyEnum } from "@/types/generic";
import NumberAdjuster from "@/components/NumberAdjuster";
import FormActionButtons from "@/components/form/FormActionButtons";
import ZFrequenciesData from "@/data/frequencies";

// #endregion

// #region ---- Types Imports ----
import { IPLStepThree, termEnum } from "@/types/postingList";

// #endregion

// #region ---- Store Imports ----
import { formValidationRStateAtom } from "@/state/formState";

// #endregion

// #region ---- Images Imports ----
import { ZArrowLeftLongIcon, ZArrowRightLongIcon } from "@/assets";
import { postingListStepThreeValidationSchema } from "@/validationSchema";
import dayjs from "dayjs";

// #endregion

const StepThree: React.FC = () => {
  const navigate = useNavigate();
  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const initialValues = useMemo<IPLStepThree>(
    () => ({
      [FormFieldsEnum.frequency]: frequencyEnum.monthly,
      [FormFieldsEnum.numOfBedroom]: 0,
      [FormFieldsEnum.numOfParking]: 0,
      [FormFieldsEnum.numOfWashroom]: 0,
      [FormFieldsEnum.minimumLease]: 0,
      [FormFieldsEnum.moveInDate]: "",
      [FormFieldsEnum.moveOutDate]: "",
      [FormFieldsEnum.description]: "",
      [FormFieldsEnum.pets]: undefined,
      [FormFieldsEnum.smoke]: undefined,
      [FormFieldsEnum.furnished]: undefined,
      term: termEnum.shortTerm,
    }),
    []
  );
  const _termOptions = useMemo(
    () => [
      {
        value: termEnum.shortTerm,
        label: "Short Term",
      },
      {
        value: termEnum.longTerm,
        label: "Long Term",
      },
    ],
    []
  );

  const agreementOptions = useMemo(
    () => [
      {
        value: agreementStatusEnum.yes,
        label: "Yes",
      },
      {
        value: agreementStatusEnum.no,
        label: "No",
      },
      {
        value: agreementStatusEnum.negotiated,
        label: "Negotiated",
      },
    ],
    []
  );

  const houseInformation = useMemo(
    () => [
      {
        label: "Bedroom",
        name: FormFieldsEnum.numOfBedroom,
      },
      {
        label: "Parking",
        name: FormFieldsEnum.numOfParking,
      },
      {
        label: "Washroom",
        name: FormFieldsEnum.numOfWashroom,
      },
    ],
    []
  );

  const otherRequirements = useMemo(
    () =>
      [
        {
          label: "Pets",
          name: FormFieldsEnum.pets,
        },
        {
          label: "Smoke",
          name: FormFieldsEnum.smoke,
        },
        {
          label: "Furnished",
          name: FormFieldsEnum.furnished,
        },
      ] as const,
    []
  );

  // #region Functions
  const formikValidation = useCallback((values: IPLStepThree) => {
    if (formValidationRState.frontendFormValidationIsEnabled) {
      try {
        postingListStepThreeValidationSchema.parse(values);
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
      <NavigationHeader
        beforeBoxContent={
          <>
            <ZButton
              onClick={() => {
                navigate({
                  to: AppRoutes.postingListSub.stepTwo,
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
        validate={formikValidation}
        enableReinitialize
        onSubmit={() => {
          navigate({
            to: AppRoutes.postingListSub.stepFour,
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          handleChange,
          handleBlur,
        }) => {
          return (
            <Form>
              <ZContainer size="4" className="mx-3 my-3 md:my-6 maxLg:mx-3">
                <ZBox className="space-y-5">
                  <ZCard className="space-y-3">
                    <ZRadioCardList
                      items={_termOptions}
                      color={ZRUColorE.purple}
                      value={values?.term}
                      onValueChange={(value) => {
                        setFieldValue("term", value);
                      }}
                    />

                    <ZFlex
                      align={ZRUAlignE.start}
                      className="md:space-x-3 *:flex-1 maxMd:flex-col maxMd:gap-y-3 maxMd:*:w-full"
                    >
                      <ZInput
                        required
                        label="Move In"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type={ZRUInputTypeE.date}
                        name={FormFieldsEnum.moveInDate}
                        value={values?.[FormFieldsEnum.moveInDate]}
                        isTouched={touched?.[FormFieldsEnum.moveInDate]}
                        errorMessage={errors?.[FormFieldsEnum.moveInDate]}
                      />

                      <ZInput
                        required
                        label="Move Out"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type={ZRUInputTypeE.date}
                        name={FormFieldsEnum.moveOutDate}
                        value={values?.[FormFieldsEnum.moveOutDate]}
                        isTouched={touched?.[FormFieldsEnum.moveOutDate]}
                        errorMessage={errors?.[FormFieldsEnum.moveOutDate]}
                      />
                    </ZFlex>

                    <ZFlex
                      align={ZRUAlignE.start}
                      className="md:space-x-3 maxMd:flex-col maxMd:space-y-2 maxMd:*:w-full"
                    >
                      <ZInput
                        required
                        className="flex-1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="The minimum lease"
                        type={ZRUInputTypeE.number}
                        name={FormFieldsEnum.minimumLease}
                        value={values?.[FormFieldsEnum.minimumLease]}
                        isTouched={touched?.[FormFieldsEnum.minimumLease]}
                        errorMessage={errors?.[FormFieldsEnum.minimumLease]}
                      />

                      <ZSelect
                        required
                        label="Frequency"
                        className="maxMd:*:w-full"
                        options={ZFrequenciesData}
                        name={FormFieldsEnum.frequency}
                        value={values?.[FormFieldsEnum.frequency]}
                        isTouched={touched?.[FormFieldsEnum.frequency]}
                        errorMessage={errors?.[FormFieldsEnum.frequency]}
                        onOpenChange={(val) => {
                          if (!touched[FormFieldsEnum.frequency]) {
                            setFieldTouched(FormFieldsEnum.frequency, val);
                          }
                        }}
                        onValueChange={(val) => {
                          setFieldValue(FormFieldsEnum.frequency, val);
                        }}
                      />
                    </ZFlex>
                  </ZCard>

                  <ZCard className="space-y-3">
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-xl font-normal"
                    >
                      House Information
                    </ZHeading>

                    <ZFlex className="pt-4 gap-3 md*:w-[49%] maxMd:flex-col flex-wrap">
                      {houseInformation?.map((el, index) => {
                        return (
                          <ZCard key={index}>
                            <ZFlex
                              align={ZRUAlignE.center}
                              justify={ZRUJustifyE.between}
                              className="gap-x-3"
                            >
                              <ZText className="text-lg">{el?.label}</ZText>

                              <NumberAdjuster
                                onChange={(value) => {
                                  setFieldValue(el?.name, value);
                                }}
                              />
                            </ZFlex>
                          </ZCard>
                        );
                      })}
                    </ZFlex>
                  </ZCard>

                  <ZCard className="space-y-3">
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-xl font-normal"
                    >
                      Other requirement
                    </ZHeading>

                    <ZBox className="gap-3 pt-4 space-y-3">
                      {otherRequirements?.map((el, index) => {
                        return (
                          <ZSelect
                            required
                            key={index}
                            name={el?.name}
                            label={el?.label}
                            className="*:w-full"
                            options={agreementOptions}
                            value={values?.[el?.name]}
                            isTouched={touched?.[el?.name]}
                            errorMessage={errors?.[el?.name]}
                            onOpenChange={(val) => {
                              if (!touched[el?.name]) {
                                setFieldTouched(el?.name, val);
                              }
                            }}
                            onValueChange={(val) => {
                              setFieldValue(el?.name, val);
                            }}
                          />
                        );
                      })}

                      <ZTextArea
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name={FormFieldsEnum.description}
                        value={values?.[FormFieldsEnum.description]}
                        isTouched={touched?.[FormFieldsEnum.description]}
                        errorMessage={errors?.[FormFieldsEnum.description]}
                      />
                    </ZBox>
                  </ZCard>

                  <ZFlex className="maxMd:flex-col md:justify-between md:items-center">
                    <FormActionButtons
                      showResetButton={false}
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
                          to: AppRoutes.postingListSub.stepFour,
                        });
                      }}
                    >
                      Skip
                    </ZButton>
                  </ZFlex>
                </ZBox>
              </ZContainer>
            </Form>
          );
        }}
      </Formik>
    </ZPage>
  );
};

export default StepThree;
