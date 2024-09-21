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
  ZCheckboxGroup,
  ZCheckboxItem,
  ZFlex,
  ZHeading,
  ZInput,
  ZLink,
  ZRUAlignE,
  ZRUColorE,
  ZRUDirectionE,
  ZRUGeneralAlignE,
  ZRUInputTypeE,
  ZRUJustifyE,
  ZRUTextAsE,
  ZText,
} from "zaions-react-ui-kit";
import {
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

// #region ---- Types Imports ----
import { ApiPathEnum } from "@/enums/backendApi";
import { RegisterFormFieldsEnum } from "@/enums/formData";
import { ZRegisterI } from "@/types/auth";
import { ZWithdrawOptionE } from "@/types/user";

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
        <ZText mt="3" className="mb-7">
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

  // const initialValues = useMemo<ZRegisterI>(
  // 	() => ({
  // 		[RegisterFormFieldsEnum.name]: 'ahsan',
  // 		[RegisterFormFieldsEnum.email]: 'ahsan@gmail.com',
  // 		[RegisterFormFieldsEnum.phoneNumber]: '+923046619706',
  // 		[RegisterFormFieldsEnum.city]: 'lahore',
  // 		[RegisterFormFieldsEnum.country]: 'pakistan',
  // 		[RegisterFormFieldsEnum.referralCode]: '2842dsdf',
  // 		[RegisterFormFieldsEnum.withdrawOption]: [ZWithdrawOptionE.jazzCash],
  // 		[RegisterFormFieldsEnum.password]: 'asdasd',
  // 		[RegisterFormFieldsEnum.passwordConfirmation]: 'asdasd',
  // 	}),
  // 	[]
  // );
  const initialValues = useMemo<ZRegisterI>(
    () => ({
      [RegisterFormFieldsEnum.name]: "Talha bin Irshad",
      [RegisterFormFieldsEnum.email]: "ahsan@gmail.com",
      [RegisterFormFieldsEnum.phoneNumber]: "+923030033030",
      [RegisterFormFieldsEnum.city]: "Lahore",
      [RegisterFormFieldsEnum.country]: "Pakistan",
      [RegisterFormFieldsEnum.referralCode]: "123123",
      [RegisterFormFieldsEnum.withdrawOptions]: [ZWithdrawOptionE.jazzCash],
      [RegisterFormFieldsEnum.password]: "asdasd",
      [RegisterFormFieldsEnum.passwordConfirmation]: "asdasd",
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
        name: values.name,
        city: values.city,
        country: values.country,
        email: values.email,
        phoneNumber: values.phoneNumber,
        referralCode: values.referralCode ? values.referralCode : undefined,
        withdrawOptions: values.withdrawOptions?.length
          ? values.withdrawOptions
          : [ZWithdrawOptionE.jazzCash],
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
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
                to: AppRoutes.appSub.dashboard.completePath,
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
      onSubmit={(values, formikHelpers) => {
        if (!isRegisterUserPending) {
          formikOnSubmit(values, formikHelpers);
        }
      }}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => {
        return (
          <Form>
            <ZBox className="mb-6 space-y-4">
              <ZInput
                name="name"
                required
                label="Name"
                value={values?.name}
                isTouched={touched?.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors?.name}
              />

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
                name="city"
                label="City"
                value={values?.city}
                isTouched={touched?.city}
                errorMessage={errors?.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <ZInput
                name="country"
                label="Country"
                value={values?.country}
                isTouched={touched?.country}
                errorMessage={errors?.country}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <ZInput
                name="referralCode"
                label="Referral Code"
                value={values?.referralCode}
                errorMessage={errors?.referralCode}
                isTouched={touched?.referralCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <ZBox>
                <ZText as={ZRUTextAsE.label} className="block mb-1">
                  Withdraw Option
                  <ZText
                    as={ZRUTextAsE.span}
                    className="ms-1"
                    color={ZRUColorE.tomato}
                  >
                    *
                  </ZText>
                </ZText>
                <ZCheckboxGroup
                  name="withdrawOptions"
                  onValueChange={(value) => {
                    setFieldValue("withdrawOptions", value);
                  }}
                >
                  <ZFlex className="gap-5">
                    <ZCheckboxItem value={ZWithdrawOptionE.jazzCash}>
                      JazzCash
                    </ZCheckboxItem>
                    <ZCheckboxItem value={ZWithdrawOptionE.easyPaisa}>
                      EasyPaisa
                    </ZCheckboxItem>
                  </ZFlex>
                </ZCheckboxGroup>
                <ZText
                  size="1"
                  color={ZRUColorE.tomato}
                  className="font-medium"
                >
                  {errors?.withdrawOptions
                    ? Array.isArray(errors?.withdrawOptions)
                      ? errors?.withdrawOptions[0]
                      : errors?.withdrawOptions
                    : null}
                </ZText>
                {/* <ZBox className="flex gap-7">
                  <ZText as={ZRUTextAsE.label} size="2">
                    <ZFlex gap="2">
                      <ZCheckbox />
                      JazzCash
                    </ZFlex>
                  </ZText>

                  <ZText as={ZRUTextAsE.label} size="2">
                    <ZFlex gap="2">
                      <ZCheckbox />
                      EasyPaisa
                    </ZFlex>
                  </ZText>
                </ZBox> */}
              </ZBox>

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
