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
  ZHeading,
  ZPage,
  ZRUHeadingAsE,
  ZSelect,
} from "zaions-react-ui-kit";
import { ZodError } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { AppRoutes } from "@/routes/appRoutes";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----
import { formValidationRStateAtom } from "@/state/formState";

// #endregion

// #region ---- Images Imports ----
import { ZArrowLeftLongIcon } from "@/assets";
import { privateSharedRoomEnum } from "@/types/postingList";
import { privateShareEnum } from "@/types/generic";

// #endregion

const PLStepFour: React.FC = () => {
  const navigate = useNavigate();
  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const initialValues = useMemo(() => ({}), []);
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

  // #region Functions
  const formikValidation = useCallback((values) => {
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
                  to: AppRoutes.postingListSub.stepTwo,
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
        validate={formikValidation}
        enableReinitialize
        onSubmit={() => {}}
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
