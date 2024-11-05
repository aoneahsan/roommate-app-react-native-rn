// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { useNavigate } from "@tanstack/react-router";
import { Form, Formik, FormikHelpers } from "formik";
import { useRecoilValue } from "recoil";
import { IApiResponse, IUser } from "zaions-react-tool-kit";
import {
  showErrorNotification,
  showSuccessNotification,
  ZBox,
  ZCard,
  ZFlex,
  ZHeading,
  ZInput,
  ZLink,
  ZRUAlignE,
  ZRUDirectionE,
  ZRUGeneralAlignE,
  ZRUInputTypeE,
  ZRUJustifyE,
  ZText,
} from "zaions-react-ui-kit";
import {
  ApiPathEnum,
  FormFieldsEnum,
  isZNonEmptyString,
  ResponseCodeEnum,
  ResponseStatusEnum,
  zStringify,
} from "zaions-tool-kit";
import { ZodError } from "zod";

// #endregion

// #region ---- Custom Imports ----
import FormActionButtons from "@/components/form/FormActionButtons";
import ZPubNavigation from "@/components/public/Navigation";
import { getFrbAuthInstance } from "@/firebaseInstance";
import { usePostRequest } from "@/hooks/reactQuery";
import { AppRoutes } from "@/routes/appRoutes";
import { reactQueryKeys } from "@/utils/constants/reactQuery";
import { MESSAGES } from "@/utils/messages";
import { registerFormValidationSchema } from "@/validationSchema";
import { signInWithEmailAndPassword } from "firebase/auth";

// #endregion

// #region ---- Types Imports ----x
import { ZRegisterI } from "@/types/auth";

// #endregion

// #region ---- Store Imports ----
import { formValidationRStateAtom } from "@/state/formState";

// #endregion

// #region ---- Images Imports ----

// #endregion

const frbAuth = getFrbAuthInstance();

const Register: React.FC = () => {
  const navigate = useNavigate();

  const navigateToLoginPage = () => {
    navigate({
      to: AppRoutes.login,
    });
  };

  return (
    <ZBox>
      <ZPubNavigation />
      <ZFlex
        justify={ZRUJustifyE.center}
        align={ZRUAlignE.center}
        minHeight="80vh"
        direction={ZRUDirectionE.column}
      >
        <ZCard className="mt-7">
          <ZBox minWidth="250px" width="80vw" maxWidth="500px">
            <ZHeading mb="4" align={ZRUGeneralAlignE.center}>
              Register
            </ZHeading>
            <RegisterForm />
          </ZBox>
        </ZCard>
        <ZText className="mt-3 mb-7">
          Already have a account?{" "}
          <ZLink onClick={navigateToLoginPage} className="pointer">
            Login
          </ZLink>
        </ZText>
      </ZFlex>
    </ZBox>
  );
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = useMemo<ZRegisterI>(
    () => ({
      [FormFieldsEnum.email]: "",
      [FormFieldsEnum.phoneNumber]: "",
      [FormFieldsEnum.password]: "",
      [FormFieldsEnum.passwordConfirmation]: "",
    }),
    []
  );

  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const { mutateAsync: registerUser, isPending: isRegisterUserPending } =
    usePostRequest<IUser>({
      mutationKey: reactQueryKeys.register,
    });

  const formikValidation = useCallback((values: ZRegisterI) => {
    if (formValidationRState.frontendFormValidationIsEnabled) {
      try {
        registerFormValidationSchema.parse(values);
      } catch (error) {
        if (error instanceof ZodError) {
          return error.formErrors.fieldErrors;
        }
      }
    }
  }, []);

  const formikOnSubmit = useCallback(
    async (values: ZRegisterI, { setErrors }: FormikHelpers<ZRegisterI>) => {
      const reqData = zStringify({
        [FormFieldsEnum.email]: values?.[FormFieldsEnum.email],
        [FormFieldsEnum.phoneNumber]: values?.[FormFieldsEnum.phoneNumber],
        [FormFieldsEnum.password]: values?.[FormFieldsEnum.password],
        [FormFieldsEnum.passwordConfirmation]:
          values?.[FormFieldsEnum.passwordConfirmation],
      });

      try {
        const res = await registerUser({
          apiPath: ApiPathEnum.register,
          data: reqData,
        });

        if (res) {
          if (res?.status === ResponseStatusEnum.success) {
            const _response = await signInWithEmailAndPassword(
              frbAuth,
              values.email!,
              values.password!
            );
            const token = await _response?.user?.getIdToken();

            if (isZNonEmptyString(token)) {
              await navigate({
                to: AppRoutes.profile,
              });

              showSuccessNotification(MESSAGES.generic.registerSuccessfully);
            }
          }
        }
      } catch (error) {
        const _error = error as IApiResponse<IUser>;
        if (_error?.code === ResponseCodeEnum?.badRequest) {
          const _errors = _error?.errors as unknown as IUser;
          if (_errors) {
            setErrors(_errors);
          }
        }

        if (_error?.code === ResponseCodeEnum?.itemExists) {
          showErrorNotification(MESSAGES.errors.userAlreadyExists);
        }
      }
    },
    []
  );

  return (
    <Formik
      initialValues={initialValues}
      validate={formikValidation}
      enableReinitialize
      onSubmit={(values, formikHelpers) => {
        if (!isRegisterUserPending) {
          formikOnSubmit(values, formikHelpers);
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        return (
          <Form>
            <ZBox className="mb-6 space-y-4">
              <ZInput
                name="email"
                required
                label="Email"
                value={values?.email}
                isTouched={touched?.email}
                errorMessage={errors?.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <ZInput
                name="phoneNumber"
                required
                label="Phone Number"
                value={values?.phoneNumber}
                isTouched={touched?.phoneNumber}
                errorMessage={errors?.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <ZInput
                name="password"
                label="Password"
                type={ZRUInputTypeE.password}
                errorMessage={errors?.password}
                required
                value={values?.password}
                isTouched={touched?.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <ZInput
                name="passwordConfirmation"
                label="Confirm Password"
                type={ZRUInputTypeE.password}
                value={values?.passwordConfirmation}
                errorMessage={errors?.passwordConfirmation}
                isTouched={touched?.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </ZBox>

            <FormActionButtons processing={isRegisterUserPending} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Register;
