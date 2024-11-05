// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { useNavigate } from "@tanstack/react-router";
import { Form, Formik, FormikErrors, FormikHelpers } from "formik";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  showErrorNotification,
  showSuccessNotification,
  ZAvatar,
  ZBox,
  ZButton,
  ZContainer,
  ZFileDropUploader,
  ZFlex,
  ZInput,
  ZPage,
  ZRCSelect,
  ZRUAlignE,
  ZRUDirectionE,
  ZText,
} from "zaions-react-ui-kit";
import {
  ApiPathEnum,
  FormFieldsEnum,
  ResponseCodeEnum,
  ResponseStatusEnum,
  zStringify,
} from "zaions-tool-kit";
import { ZodError } from "zod";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import ZAgesData from "@/data/ages";
import ZCitiesData from "@/data/cities";
import ZConstellationsData from "@/data/constellations";
import ZGenderData from "@/data/gender";
import ZLanguagesData from "@/data/languages";
import { AppRoutes } from "@/routes/appRoutes";
import {
  fileSettingRStateAtom,
  formValidationRStateAtom,
} from "@/state/formState";
import { fileValidation } from "@/utils/helpers";
import { profileFormValidationSchema } from "@/validationSchema";

// #endregion

// #region ---- Types Imports ----
import { fileErrorEnum } from "@/types/generic";
import type { IUser } from "zaions-tool-kit/dist/roommate";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZArrowRightLongIcon, ZAvatarImage } from "@/assets";
import { usePutRequest } from "@/hooks/reactQuery";
import { userDataRStateAtom } from "@/state/user";
import { MESSAGES } from "@/utils/messages";
import { IApiResponse } from "zaions-react-tool-kit";

// #endregion

const Profile: React.FC = () => {
  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const initialValues = useMemo<Partial<IUser>>(
    () => ({
      [FormFieldsEnum.firstName]: "",
      [FormFieldsEnum.lastName]: "",
      [FormFieldsEnum.age]: "",
      [FormFieldsEnum.gender]: null,
      [FormFieldsEnum.constellation]: null,
      [FormFieldsEnum.hometown]: "",
      [FormFieldsEnum.language]: "",
      [FormFieldsEnum.photoURL]: "",
      // [FormFieldsEnum.photos]: Array(8).fill(null),
    }),
    []
  );
  const fileSettingRState = useRecoilValue(fileSettingRStateAtom);
  const navigate = useNavigate();
  const { mutateAsync: updateUserData, isPending: isUpdateUserDataPending } =
    usePutRequest<IUser>({});
  const setUserDataRState = useSetRecoilState(userDataRStateAtom);

  // #region Functions
  const formikValidation = useCallback((values: Partial<IUser>) => {
    if (formValidationRState.frontendFormValidationIsEnabled) {
      try {
        profileFormValidationSchema.parse(values);
      } catch (error) {
        if (error instanceof ZodError) {
          return error.formErrors.fieldErrors;
        }
      }
    }
  }, []);

  const formikSubmitHandler = useCallback(
    async (
      values: Partial<IUser>,
      { setErrors }: FormikHelpers<Partial<IUser>>
    ) => {
      const reqData = zStringify({
        [FormFieldsEnum.firstName]: values?.[FormFieldsEnum.firstName],
        [FormFieldsEnum.lastName]: values?.[FormFieldsEnum.lastName],
        [FormFieldsEnum.age]: values?.[FormFieldsEnum.age],
        [FormFieldsEnum.gender]: values?.[FormFieldsEnum.gender],
        [FormFieldsEnum.constellation]: values?.[FormFieldsEnum.constellation],
        [FormFieldsEnum.hometown]: values?.[FormFieldsEnum.hometown],
        [FormFieldsEnum.language]: values?.[FormFieldsEnum.language],
      });
      try {
        const res = await updateUserData({
          apiPath: ApiPathEnum.updatePersonalAccountData,
          isAuthenticatedRequest: true,
          data: reqData,
        });

        if (res?.status === ResponseStatusEnum.success) {
          const data = res?.result?.data;
          setUserDataRState((oldValues) => ({
            ...oldValues,
            [FormFieldsEnum.firstName]: data?.[FormFieldsEnum.firstName],
            [FormFieldsEnum.lastName]: data?.[FormFieldsEnum.lastName],
            [FormFieldsEnum.age]: data?.[FormFieldsEnum.age],
            [FormFieldsEnum.gender]: data?.[FormFieldsEnum.gender],
            [FormFieldsEnum.constellation]:
              data?.[FormFieldsEnum.constellation],
            [FormFieldsEnum.hometown]: data?.[FormFieldsEnum.hometown],
            [FormFieldsEnum.language]: data?.[FormFieldsEnum.language],
          }));

          await navigate({
            to: AppRoutes.iWantTo,
          });

          showSuccessNotification(MESSAGES.profile.added);
        }
      } catch (error) {
        const _error = error as IApiResponse<IUser>;
        if (_error?.code === ResponseCodeEnum?.badRequest) {
          const _errors = _error?.errors as unknown as FormikErrors<
            Partial<IUser>
          >;
          if (_errors) {
            setErrors(_errors);
          }
        }
      }
    },
    []
  );
  // #endregion

  return (
    <ZPage>
      <NavigationHeader title="My Profile" />

      <Formik
        initialValues={initialValues}
        validate={formikValidation}
        onSubmit={formikSubmitHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <Form>
              <ZContainer size="4" className="my-6 maxLg:mx-3">
                <ZFlex
                  align={ZRUAlignE.start}
                  className="max900px:gap-5 min900px:gap-3 max900px:flex-col-reverse lg:gap-6"
                >
                  <ZBox className="*:w-full space-y-3 py-5 max900px:!w-full maxLg:w-[60%] lg:w-1/2">
                    <ZInput
                      name={FormFieldsEnum.firstName}
                      label="First Name"
                      required
                      value={values[FormFieldsEnum.firstName]}
                      isTouched={touched[FormFieldsEnum.firstName]}
                      errorMessage={errors[FormFieldsEnum.firstName]}
                      placeholder="Enter your first name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <ZInput
                      name={FormFieldsEnum.lastName}
                      label="Last Name"
                      required
                      value={values[FormFieldsEnum.lastName]}
                      isTouched={touched[FormFieldsEnum.lastName]}
                      errorMessage={errors[FormFieldsEnum.lastName]}
                      placeholder="Enter your last name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <ZRCSelect
                      label="Age"
                      name={FormFieldsEnum.age}
                      required
                      isTouched={touched[FormFieldsEnum.age]}
                      placeholder="Select Your Age"
                      isMulti={false}
                      options={ZAgesData}
                      errorMessage={errors[FormFieldsEnum.age]}
                      value={ZAgesData?.find(
                        (val) => values[FormFieldsEnum.age] === val?.value
                      )}
                      onBlur={() => {
                        if (!touched[FormFieldsEnum.age]) {
                          setFieldTouched(FormFieldsEnum.age, true);
                        }
                      }}
                      onChange={(item) => {
                        setFieldValue(FormFieldsEnum.age, item?.value);
                      }}
                    />

                    <ZRCSelect
                      label="Gender"
                      name={FormFieldsEnum.gender}
                      required
                      isTouched={touched[FormFieldsEnum.gender]}
                      errorMessage={errors[FormFieldsEnum.gender]}
                      options={ZGenderData}
                      placeholder="Select Your Gender"
                      isMulti={false}
                      value={ZGenderData?.find(
                        (val) => values[FormFieldsEnum.gender] === val?.value
                      )}
                      onBlur={() => {
                        if (!touched[FormFieldsEnum.gender]) {
                          setFieldTouched(FormFieldsEnum.gender, true);
                        }
                      }}
                      onChange={(item) => {
                        setFieldValue(FormFieldsEnum.gender, item?.value);
                      }}
                    />

                    <ZRCSelect
                      label="Constellation"
                      name={FormFieldsEnum.constellation}
                      required
                      options={ZConstellationsData}
                      isTouched={touched[FormFieldsEnum.constellation]}
                      errorMessage={errors[FormFieldsEnum.constellation]}
                      placeholder="Select Your Constellation"
                      isMulti={false}
                      value={ZConstellationsData?.find(
                        (val) =>
                          val?.value === values[FormFieldsEnum.constellation]
                      )}
                      onBlur={() => {
                        if (!touched[FormFieldsEnum.constellation]) {
                          setFieldTouched(FormFieldsEnum.constellation, true);
                        }
                      }}
                      onChange={(item) => {
                        setFieldValue(
                          FormFieldsEnum.constellation,
                          item?.value
                        );
                      }}
                    />

                    <ZRCSelect
                      label="Hometown"
                      name={FormFieldsEnum.hometown}
                      required
                      options={ZCitiesData}
                      isTouched={touched[FormFieldsEnum.hometown]}
                      errorMessage={errors[FormFieldsEnum.hometown]}
                      placeholder="Select Your Hometown"
                      isMulti={false}
                      value={ZCitiesData?.find(
                        (val) => val?.value === values[FormFieldsEnum.hometown]
                      )}
                      onBlur={() => {
                        if (!touched[FormFieldsEnum.hometown]) {
                          setFieldTouched(FormFieldsEnum.hometown, true);
                        }
                      }}
                      onChange={(item) => {
                        setFieldValue(FormFieldsEnum.hometown, item?.value);
                      }}
                    />

                    <ZRCSelect
                      label="Language"
                      name={FormFieldsEnum.language}
                      required
                      options={ZLanguagesData}
                      isTouched={touched[FormFieldsEnum.language]}
                      errorMessage={errors[FormFieldsEnum.language]}
                      placeholder="Select Your Language"
                      isMulti={false}
                      value={ZLanguagesData?.find(
                        (val) => val?.value === values[FormFieldsEnum.language]
                      )}
                      onBlur={() => {
                        if (!touched[FormFieldsEnum.language]) {
                          setFieldTouched(FormFieldsEnum.language, true);
                        }
                      }}
                      onChange={(item) => {
                        setFieldValue(FormFieldsEnum.language, item?.value);
                      }}
                    />
                  </ZBox>

                  <ZFlex
                    align={ZRUAlignE.center}
                    direction={ZRUDirectionE.column}
                    className="maxLg:w-[40%] max900px:!w-full lg:w-1/2"
                  >
                    <ZFlex
                      align={ZRUAlignE.center}
                      direction={ZRUDirectionE.column}
                    >
                      <ZAvatar
                        className="*:items-end *:overflow-hidden text-center"
                        size="8"
                        src={values?.[FormFieldsEnum.photoURL]}
                        fallback={
                          <img
                            src={ZAvatarImage}
                            className="object-cover h-full"
                          />
                        }
                      />

                      <ZFileDropUploader
                        validator={(file) =>
                          fileValidation({
                            file,
                            maxFileSize: fileSettingRState?.size,
                          })
                        }
                        onChange={async ({ fileRejections, localUrl }) => {
                          setFieldValue(FormFieldsEnum.photoURL, localUrl);

                          if (fileRejections?.length) {
                            const { message, code } =
                              fileRejections[0].errors[0];

                            if (code === fileErrorEnum.sizeTooLarge) {
                              showErrorNotification(message);
                            }
                          }
                        }}
                      >
                        <ZButton className="mt-2" type="button">
                          Upload profile picture
                        </ZButton>
                      </ZFileDropUploader>
                    </ZFlex>

                    <ZBox className="mt-7">
                      <ZText className="block mb-3 lg:ms-10 max900px:text-center">
                        Upload Photo (1/9)
                      </ZText>

                      {/* <ZFlex
                        className="flex-wrap justify-center w-auto gap-y-4 gap-x-2"
                        align={ZRUAlignE.center}
                      >
                        {values?.photos?.map((el, index) => (
                          <ZBox className="lg:w-[20%]" key={index}>
                            <ZFileDropUploader
                              validator={(file) =>
                                fileValidation({
                                  file,
                                  maxFileSize: fileSettingRState?.size,
                                })
                              }
                              onChange={async ({
                                fileRejections,
                                localUrl,
                              }) => {
                                setFieldValue(`photos[${index}]`, localUrl);
                                if (fileRejections?.length) {
                                  const { message, code } =
                                    fileRejections[0].errors[0];

                                  if (code === fileErrorEnum.sizeTooLarge) {
                                    showErrorNotification(message);
                                  }
                                }
                              }}
                            >
                              <ZAvatar
                                size="6"
                                fallback={<ZAddIcon className="w-5 h-5" />}
                                radius={ZRURadiusE.medium}
                                className="cursor-pointer"
                                src={el}
                              />
                            </ZFileDropUploader>
                          </ZBox>
                        ))}
                      </ZFlex> */}
                    </ZBox>
                  </ZFlex>
                </ZFlex>
                <ZButton
                  className="mt-6 max900px:w-full"
                  type="submit"
                  loading={isUpdateUserDataPending}
                  disabled={isUpdateUserDataPending}
                >
                  Save & Continue <ZArrowRightLongIcon className="mt-px" />
                </ZButton>
              </ZContainer>
            </Form>
          );
        }}
      </Formik>
    </ZPage>
  );
};

export default Profile;
