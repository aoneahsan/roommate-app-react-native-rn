// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { Formik, Form } from "formik";
import { useRecoilValue } from "recoil";
import {
  ZBox,
  ZButton,
  ZCard,
  ZContainer,
  ZFlex,
  ZHeading,
  ZPage,
  ZRadioCardList,
  ZRUAlignE,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUJustifyE,
  ZSelect,
  ZText,
} from "zaions-react-ui-kit";
import { ZodError } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { AppRoutes } from "@/routes/appRoutes";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import FormActionButtons from "@/components/form/FormActionButtons";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import { postingListStepFourValidationSchema } from "@/validationSchema";

// #endregion

// #region ---- Types Imports ----
import { IPLStepFour, privateSharedRoomEnum } from "@/types/postingList";
import { agreementStatusEnum, privateShareEnum } from "@/types/generic";

// #endregion

// #region ---- Store Imports ----
import { formValidationRStateAtom } from "@/state/formState";

// #endregion

// #region ---- Images Imports ----
import { ZArrowLeftLongIcon, ZArrowRightLongIcon } from "@/assets";

// #endregion

const PLStepFour: React.FC = () => {
  const navigate = useNavigate();
  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const initialValues = useMemo<IPLStepFour>(
    () => ({
      [FormFieldsEnum.bedroom]: "",
      [FormFieldsEnum.livingRoom]: "",
      [FormFieldsEnum.kitchen]: "",
      [FormFieldsEnum.washroom]: "",
      [FormFieldsEnum.livingWithLandlord]: agreementStatusEnum.no,
    }),
    []
  );
  const privateShareRoom = useMemo(
    () => [
      {
        label: "Pets",
        name: privateSharedRoomEnum.bedroom,
      },
      {
        label: "Living room",
        name: privateSharedRoomEnum.livingRoom,
      },
      {
        label: "Kitchen",
        name: privateSharedRoomEnum.kitchen,
      },
      {
        label: "Washroom",
        name: privateSharedRoomEnum.washroom,
      },
    ],
    []
  );
  const privateShareOptions = useMemo(
    () => [
      {
        label: privateShareEnum.private,
        value: "Private",
      },
      {
        label: privateShareEnum.share,
        value: "Share",
      },
    ],
    []
  );

  const agreementOptions = useMemo(
    () => [
      {
        label: "Yes",
        value: agreementStatusEnum.yes,
      },
      {
        label: "No",
        value: agreementStatusEnum.no,
      },
    ],
    []
  );

  // #region Functions
  const formikValidation = useCallback((values: IPLStepFour) => {
    if (formValidationRState.frontendFormValidationIsEnabled) {
      try {
        postingListStepFourValidationSchema.parse(values);
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
                  to: AppRoutes.postingListSub.stepThree,
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
            to: AppRoutes.postingListSub.stepFive,
          });
        }}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
          return (
            <Form>
              <ZContainer size="4" className="mx-3 my-3 md:my-6 maxLg:mx-3">
                <ZBox className="space-y-5">
                  <ZCard className="space-y-3 maxMd:text-center">
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-xl font-normal"
                    >
                      Private/ Shared Room
                    </ZHeading>

                    {privateShareRoom?.map((el, index) => {
                      return (
                        <ZSelect
                          required
                          key={index}
                          name={el?.name}
                          label={el?.label}
                          className="*:w-full"
                          options={privateShareOptions}
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
                  </ZCard>

                  <ZCard>
                    <ZFlex
                      align={ZRUAlignE.center}
                      className="gap-3 sm:justify-between maxSm:flex-col"
                    >
                      <ZText className="text-lg">
                        Living With Landlord
                        <ZText className="ms-1" color={ZRUColorE.tomato}>
                          *
                        </ZText>
                      </ZText>

                      <ZRadioCardList
                        items={agreementOptions}
                        color={ZRUColorE.purple}
                        isTouched={touched?.[FormFieldsEnum.livingWithLandlord]}
                        value={values?.[FormFieldsEnum.livingWithLandlord]}
                        errorMessage={
                          errors?.[FormFieldsEnum.livingWithLandlord]
                        }
                        onValueChange={(value) => {
                          setFieldValue(
                            FormFieldsEnum.livingWithLandlord,
                            value
                          );
                        }}
                      />
                    </ZFlex>
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
                          to: AppRoutes.postingListSub.stepFive,
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

export default PLStepFour;
