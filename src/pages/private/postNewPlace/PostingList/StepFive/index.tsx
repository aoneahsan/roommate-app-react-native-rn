// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBox,
  ZButton,
  ZCard,
  ZCheckboxCardsGroup,
  ZCheckboxCardsItem,
  ZContainer,
  ZHeading,
  ZPage,
  ZRUHeadingAsE,
  ZText,
  ZTextArea,
} from "zaions-react-ui-kit";
import { useNavigate } from "@tanstack/react-router";
import { useRecoilValue } from "recoil";
import { ZodError } from "zod";
import { Formik, Form } from "formik";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import { AppRoutes } from "@/routes/appRoutes";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import ZRentInclusionsData from "@/data/rentInclusions";
import FormActionButtons from "@/components/form/FormActionButtons";

// #endregion

// #region ---- Types Imports ----
import { IPLStepFive } from "@/types/postingList";

// #endregion

// #region ---- Store Imports ----
import { formValidationRStateAtom } from "@/state/formState";

// #endregion

// #region ---- Images Imports ----
import { ZArrowLeftLongIcon } from "@/assets";

// #endregion

const StepFive: React.FC = () => {
  const navigate = useNavigate();
  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const initialValues = useMemo<IPLStepFive>(
    () => ({
      [FormFieldsEnum.rentInclude]: [],
      [FormFieldsEnum.otherInclude]: "",
    }),
    []
  );

  // #region Functions
  const formikValidation = useCallback((values: IPLStepFive) => {
    if (formValidationRState.frontendFormValidationIsEnabled) {
      try {
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
                  to: AppRoutes.postingListSub.stepFour,
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
            to: AppRoutes.appSub.placesList.completePath,
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
        }) => {
          return (
            <Form>
              <ZContainer size="4" className="mx-3 my-3 md:my-6 maxLg:mx-3">
                <ZBox className="space-y-5">
                  <ZCard className="space-y-3">
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-xl font-normal"
                    >
                      Rent Include
                    </ZHeading>

                    <ZCheckboxCardsGroup
                      onValueChange={(value) => {
                        setFieldValue(FormFieldsEnum.rentInclude, value);
                      }}
                    >
                      {ZRentInclusionsData?.map((card, index) => {
                        return (
                          <ZCheckboxCardsItem
                            key={index}
                            value={card?.value}
                            className="flex-col"
                          >
                            <card.icon className="w-7 h-7" />
                            <ZText className="inline-block mt-2">
                              {card?.label}
                            </ZText>
                          </ZCheckboxCardsItem>
                        );
                      })}
                    </ZCheckboxCardsGroup>

                    <ZTextArea
                      rows={6}
                      label="Other Include"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={FormFieldsEnum.otherInclude}
                      placeholder="Maximum 50 words"
                      value={values?.[FormFieldsEnum.otherInclude]}
                      isTouched={touched?.[FormFieldsEnum.otherInclude]}
                      errorMessage={errors?.[FormFieldsEnum.otherInclude]}
                    />
                  </ZCard>

                  <FormActionButtons
                    showResetButton={false}
                    submitButtonContent="Done"
                  />
                </ZBox>
              </ZContainer>
            </Form>
          );
        }}
      </Formik>
    </ZPage>
  );
};

export default StepFive;
