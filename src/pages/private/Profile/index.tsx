// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { Form, Formik } from "formik";
import {
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
  ZRURadiusE,
  ZText,
} from "zaions-react-ui-kit";
import { useRecoilValue } from "recoil";
import { ZodError } from "zod";

// #endregion

// #region ---- Custom Imports ----
import ZAgesData from "@/data/ages";
import ZGenderData from "@/data/gender";
import ZConstellationsData from "@/data/constellations";
import NavigationHeader from "@/components/private/NavigationHeader";
import { formValidationRStateAtom } from "@/state/formState";
import { profileFormValidationSchema } from "@/validationSchema";

// #endregion

// #region ---- Types Imports ----
import { IUser } from "@/types/user/index.type";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZAddIcon, ZArrowRightLongIcon, ZAvatarImage } from "@/assets";

// #endregion

const Profile: React.FC = () => {
  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const initialValues = useMemo<IUser>(
    () => ({
      name: "",
      age: null,
      gender: null,
      constellations: null,
      hometown: null,
      language: null,
    }),
    []
  );

  // #region Functions
  const formikValidation = useCallback((values: IUser) => {
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
  // #endregion

  return (
    <ZPage>
      <NavigationHeader title="My Profile" />

      <Formik
        initialValues={initialValues}
        validate={formikValidation}
        onSubmit={() => {}}
      >
        {({
          values,
          errors,
          touched,
          isValid,
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
                      label="Name"
                      name="name"
                      required
                      value={values?.name}
                      isTouched={touched?.name}
                      errorMessage={errors?.name}
                      placeholder="Enter your Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <ZRCSelect
                      label="Age"
                      name="age"
                      required
                      value={values?.age}
                      isTouched={touched?.age}
                      placeholder="Select Your Age"
                      isMulti={false}
                      options={ZAgesData}
                      errorMessage={errors?.age}
                      onBlur={() => {
                        if (!touched?.age) {
                          setFieldTouched("age", true);
                        }
                      }}
                      onChange={(value) => {
                        setFieldValue("age", value);
                      }}
                    />

                    <ZRCSelect
                      label="Gender"
                      name="gender"
                      required
                      value={values?.gender}
                      isTouched={touched?.gender}
                      errorMessage={errors?.gender}
                      options={ZGenderData}
                      placeholder="Select Your Gender"
                      isMulti={false}
                      onBlur={() => {
                        if (!touched?.gender) {
                          setFieldTouched("gender", true);
                        }
                      }}
                      onChange={(value) => {
                        setFieldValue("gender", value);
                      }}
                    />

                    <ZRCSelect
                      label="Constellations"
                      name="constellations"
                      required
                      options={ZConstellationsData}
                      value={values?.constellations}
                      isTouched={touched?.constellations}
                      errorMessage={errors?.constellations}
                      placeholder="Select Your Constellations"
                      isMulti={false}
                      onBlur={() => {
                        if (!touched?.constellations) {
                          setFieldTouched("constellations", true);
                        }
                      }}
                      onChange={(value) => {
                        setFieldValue("constellations", value);
                      }}
                    />

                    <ZRCSelect
                      label="Hometown"
                      name="hometown"
                      required
                      options={ZConstellationsData}
                      value={values?.hometown}
                      isTouched={touched?.hometown}
                      errorMessage={errors?.hometown}
                      placeholder="Select Your Hometown"
                      isMulti={false}
                      onBlur={() => {
                        if (!touched?.hometown) {
                          setFieldTouched("hometown", true);
                        }
                      }}
                      onChange={(value) => {
                        setFieldValue("hometown", value);
                      }}
                    />

                    <ZRCSelect
                      label="Language"
                      name="language"
                      required
                      options={ZConstellationsData}
                      value={values?.language}
                      isTouched={touched?.language}
                      errorMessage={errors?.language}
                      placeholder="Select Your Language"
                      isMulti={false}
                      onBlur={() => {
                        if (!touched?.language) {
                          setFieldTouched("language", true);
                        }
                      }}
                      onChange={(value) => {
                        setFieldValue("language", value);
                      }}
                    />
                  </ZBox>

                  <ZFlex
                    align={ZRUAlignE.center}
                    direction={ZRUDirectionE.column}
                    className="maxLg:w-[40%] max900px:!w-full lg:w-1/2"
                  >
                    <ZFileDropUploader />
                    <ZFlex
                      align={ZRUAlignE.center}
                      direction={ZRUDirectionE.column}
                    >
                      <ZAvatar
                        className="*:items-end *:overflow-hidden text-center"
                        size="8"
                        fallback={
                          <img
                            src={ZAvatarImage}
                            className="object-cover h-full"
                          />
                        }
                      />
                      <ZButton className="mt-2">Upload profile picture</ZButton>
                    </ZFlex>

                    <ZBox className="mt-7">
                      <ZText className="block mb-3 lg:ms-10 max900px:text-center">
                        Upload Photo (1/9)
                      </ZText>

                      <ZFlex
                        className="flex-wrap justify-center w-auto gap-y-4 gap-x-2"
                        align={ZRUAlignE.center}
                      >
                        {[...Array(8)].map((el, index) => (
                          <ZBox className="lg:w-[20%]" key={index}>
                            <ZAvatar
                              size="6"
                              fallback={<ZAddIcon className="w-5 h-5" />}
                              radius={ZRURadiusE.medium}
                              className="cursor-pointer"
                            />
                          </ZBox>
                        ))}
                      </ZFlex>
                    </ZBox>
                  </ZFlex>
                </ZFlex>
                <ZButton
                  className="mt-6 max900px:w-full"
                  type="submit"
                  disabled={!isValid}
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
