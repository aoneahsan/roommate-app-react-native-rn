// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { Form, Formik } from "formik";
import { useNavigate } from "@tanstack/react-router";
import {
  ZBox,
  ZCard,
  ZFlex,
  ZHeading,
  ZInput,
  ZLink,
  ZRUAlignE,
  ZRUDirectionE,
  ZRUGeneralAlignE,
  ZRUJustifyE,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import { AppRoutes } from "@/routes/appRoutes";
import { ResetPasswordFormFieldsEnum } from "@/enums/formData";
import FormActionButtons from "@/components/form/FormActionButtons";

// #endregion

// #region ---- Types Imports ----
import { ZResetPasswordI } from "@/types/auth";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = useMemo<ZResetPasswordI>(
    () => ({
      [ResetPasswordFormFieldsEnum.phoneNumber]: "",
    }),
    []
  );

  // #region Functions
  const navigateToLoginPage = useCallback(() => {
    navigate({
      to: AppRoutes.login,
    });
  }, []);

  const formikOnSubmit = useCallback(() => {}, []);
  // #endregion

  return (
    <ZBox>
      <ZFlex
        justify={ZRUJustifyE.center}
        align={ZRUAlignE.center}
        minHeight="70vh"
        direction={ZRUDirectionE.column}
      >
        <ZCard>
          <ZBox minWidth="250px" width="80vw" maxWidth="500px">
            <ZHeading mb="4" align={ZRUGeneralAlignE.center}>
              Forget Password?
            </ZHeading>
            <ZText className="block mb-4 text-center">
              To reset your password, please enter the mobile number associated
              with your account. We will send you a verification code to
              securely update your credentials.
            </ZText>

            <Formik initialValues={initialValues} onSubmit={formikOnSubmit}>
              {({ values, errors, touched, handleChange, handleBlur }) => {
                return (
                  <Form>
                    <ZInput
                      className="mb-4"
                      name="phoneNumber"
                      required
                      label="Phone number"
                      value={values?.phoneNumber}
                      isTouched={touched?.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={errors?.phoneNumber}
                    />

                    <FormActionButtons />
                  </Form>
                );
              }}
            </Formik>
          </ZBox>
        </ZCard>

        <ZLink onClick={navigateToLoginPage} className="pointer" mt="3">
          Back to login page
        </ZLink>
      </ZFlex>
    </ZBox>
  );
};

export default ResetPassword;
