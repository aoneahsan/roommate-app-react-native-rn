import ZPubNavigation from "@/components/public/Navigation";
import FormActionButtons from "@/components/form/FormActionButtons";
import { LoginFormFieldsEnum } from "@/enums/formData";
import { usePostRequest } from "@/hooks/reactQuery";
import { formValidationRStateAtom } from "@/state/formState";
import { userDataRStateAtom } from "@/state/user";
import {
  IApiResponse,
  showErrorNotification,
  showSuccessNotification,
} from "zaions-react-tool-kit";

import { AppRoutes } from "@/routes/appRoutes";

import { MESSAGES } from "@/utils/messages";
import React, { useCallback, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  LoginI,
  loginFormValidationSchema,
  ZInput,
  loginFormFields,
  ZBox,
  ZFlex,
  ZCard,
  ZHeading,
  ZLink,
  ZText,
  ZRUColorE,
  ZRUJustifyE,
  ZRUAlignE,
  ZRUGeneralAlignE,
  ZRUDirectionE,
} from "zaions-react-ui-kit";
import { FormikHelpers, Form, Formik } from "formik";
import { useNavigate } from "@tanstack/react-router";
import { ZodError } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFrbAuthInstance } from "@/firebaseInstance";
import { isZNonEmptyString } from "zaions-tool-kit";
import { firebaseResponseCode } from "@/utils/constants/apis";

const frbAuth = getFrbAuthInstance();

const Login: React.FC = () => {
  const navigate = useNavigate();

  const navigateToRegisterPage = useCallback(() => {
    navigate({
      to: AppRoutes.register,
    });
  }, []);

  const navigateToResetPasswordPage = useCallback(() => {
    navigate({
      to: AppRoutes.register,
    });
  }, []);

  return (
    <ZBox>
      <ZPubNavigation />
      <ZFlex
        justify={ZRUJustifyE.center}
        align={ZRUAlignE.center}
        minHeight="70vh"
        direction={ZRUDirectionE.column}
      >
        <ZCard>
          <ZBox minWidth="250px" width="80vw" maxWidth="500px">
            <ZHeading mb="4" align={ZRUGeneralAlignE.center}>
              Login
            </ZHeading>
            <LoginForm />
            <ZFlex mt="2" justify={ZRUJustifyE.end}>
              <ZText
                className="mt-2 pointer"
                color={ZRUColorE.indigo}
                onClick={navigateToResetPasswordPage}
              >
                Forget Password?
              </ZText>
            </ZFlex>
          </ZBox>
        </ZCard>

        <ZText mt="3">
          Don't have a account yet?{" "}
          <ZLink onClick={navigateToRegisterPage} className="pointer">
            Create a Account
          </ZLink>
        </ZText>

        {/* <HandleFormValidationState /> */}
      </ZFlex>
    </ZBox>
  );
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [compState, setCompState] = useState<{
    processing: boolean;
  }>({
    processing: false,
  });

  const initialValues = useMemo<Partial<LoginI>>(
    () => ({
      [LoginFormFieldsEnum.email]: "",
      [LoginFormFieldsEnum.password]: "",
    }),
    []
  );

  const formValidationRState = useRecoilValue(formValidationRStateAtom);

  const formikSubmit = useCallback(
    async (
      values: Partial<LoginI>,
      { setErrors }: FormikHelpers<Partial<LoginI>>
    ) => {
      try {
        setCompState((oldValues) => ({
          ...oldValues,
          processing: true,
        }));

        const _response = await signInWithEmailAndPassword(
          frbAuth,
          values.email!,
          values.password!
        );

        const token = await _response?.user?.getIdToken();

        if (isZNonEmptyString(token)) {
          setCompState((oldValues) => ({
            ...oldValues,
            processing: false,
          }));

          await navigate({
            to: AppRoutes.appSub.dashboard.completePath,
          });

          showSuccessNotification(MESSAGES.generic.loginSuccessfully);
        }

        if (compState?.processing) {
          setCompState((oldValues) => ({
            ...oldValues,
            processing: false,
          }));
        }
      } catch (error) {
        setCompState((oldValues) => ({
          ...oldValues,
          processing: false,
        }));

        const _error = error as { code: firebaseResponseCode };
        if (
          _error?.code === firebaseResponseCode.invalidCredential ||
          _error?.code === firebaseResponseCode.invalidEmail
        )
          showErrorNotification(MESSAGES.errors.invalidCredential);
      }
    },
    []
  );

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        if (formValidationRState.frontendFormValidationIsEnabled) {
          try {
            loginFormValidationSchema.parse(values);
          } catch (error) {
            if (error instanceof ZodError) {
              return error.formErrors.fieldErrors;
            }
          }
        }
      }}
      onSubmit={async (values, helpers) => {
        if (!compState?.processing) {
          formikSubmit(values, helpers);
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        return (
          <Form className="space-y-4">
            {(Object.keys(loginFormFields) as LoginFormFieldsEnum[]).map(
              (_fieldKey) => {
                return (
                  <ZInput
                    key={_fieldKey}
                    name={_fieldKey}
                    placeholder={loginFormFields[_fieldKey].placeholder}
                    type={loginFormFields[_fieldKey].type}
                    value={values[_fieldKey]}
                    errorMessage={errors[_fieldKey]}
                    isTouched={touched[_fieldKey]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                );
              }
            )}

            <FormActionButtons processing={compState?.processing} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
