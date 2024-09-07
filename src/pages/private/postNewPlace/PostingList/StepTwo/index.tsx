// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { useRecoilValue } from "recoil";
import { Formik, Form } from "formik";
import {
  ZBox,
  ZButton,
  ZContainer,
  ZFlex,
  ZHeading,
  ZPage,
  ZRUAlignE,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUJustifyE,
} from "zaions-react-ui-kit";
import { ZodError } from "zod";
import { useNavigate } from "@tanstack/react-router";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import ImageUploadSection from "./ImageUploadSection";
import { AppRoutes } from "@/routes/appRoutes";
import FormActionButtons from "@/components/form/FormActionButtons";

// #endregion

// #region ---- Types Imports ----
import { IPLStepTwo } from "@/types/postingList";

// #endregion

// #region ---- Store Imports ----
import { formValidationRStateAtom } from "@/state/formState";

// #endregion

// #region ---- Images Imports ----
import { ZArrowLeftLongIcon, ZArrowRightLongIcon } from "@/assets";

// #endregion

const PLStepTwo: React.FC = () => {
  const navigate = useNavigate();
  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const initialValues = useMemo<IPLStepTwo>(
    () => ({
      [FormFieldsEnum.bedroomImages]: [],
      [FormFieldsEnum.washroomImages]: [],
      [FormFieldsEnum.kitchenImages]: [],
      [FormFieldsEnum.otherImages]: [],
    }),
    []
  );

  // #region Functions
  const formikValidation = useCallback((values: IPLStepTwo) => {
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
        title="Posting List"
        beforeBoxContent={
          <>
            <ZButton
              onClick={() => {
                navigate({
                  to: AppRoutes.postingListSub.stepOne,
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
            to: AppRoutes.postingListSub.stepThree,
          });
        }}
      >
        {({ dirty }) => {
          return (
            <Form>
              <ZContainer size="4" className="mx-3 my-3 md:my-6 maxLg:mx-3">
                <ZBox className="space-y-4 mb-7">
                  <ZBox className="space-y-4 maxMd:text-center">
                    <ZHeading
                      as={ZRUHeadingAsE.h3}
                      color={ZRUColorE.gold}
                      className="font-medium"
                    >
                      Liven up your listing with photos!
                    </ZHeading>
                  </ZBox>

                  <ImageUploadSection
                    sectionTitle="Bedroom"
                    fieldName={FormFieldsEnum.bedroomImages}
                  />

                  <ImageUploadSection
                    sectionTitle="Washroom"
                    fieldName={FormFieldsEnum.washroomImages}
                  />

                  <ImageUploadSection
                    sectionTitle="Kitchen"
                    fieldName={FormFieldsEnum.kitchenImages}
                  />

                  <ImageUploadSection
                    sectionTitle="Other"
                    fieldName={FormFieldsEnum.otherImages}
                  />
                </ZBox>
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
                        to: AppRoutes.postingListSub.stepThree,
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

export default PLStepTwo;
