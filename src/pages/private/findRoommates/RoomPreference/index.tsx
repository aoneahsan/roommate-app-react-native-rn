// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { Form, Formik } from "formik";
import {
  ZBox,
  ZButton,
  ZCard,
  ZContainer,
  ZFlex,
  ZInput,
  ZPage,
  ZRadioCardList,
  ZRCSelect,
  ZRUAlignE,
  ZRUColorE,
  ZRUInputTypeE,
  ZText,
} from "zaions-react-ui-kit";
import { useRecoilValue } from "recoil";
import { ZodError } from "zod";
import { useNavigate } from "@tanstack/react-router";

// #endregion

// #region ---- Custom Imports ----
import ZCitiesData from "@/data/cities";
import NavigationHeader from "@/components/private/NavigationHeader";
import { formValidationRStateAtom } from "@/state/formState";
import { roomPreferenceFormValidationSchema } from "@/validationSchema";
import ZBuildingTypeData from "@/data/buildingType";
import ZPlacePreferenceData from "@/data/placePreference";
import FormActionButtons from "@/components/form/FormActionButtons";
import { AppRoutes } from "@/routes/appRoutes";

// #endregion

// #region ---- Types Imports ----
import {
  EBuildingType,
  EPlacePreference,
  IRoomPreference,
} from "@/types/roomPreference";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZArrowRightLongIcon } from "@/assets";

// #endregion

const RoomPreference: React.FC = () => {
  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const navigate = useNavigate();
  const initialValues = useMemo<IRoomPreference>(
    () => ({
      desiredPlace: null,
      moveInDate: "",
      placePreference: EPlacePreference.sharedPlace,
      buildingType: EBuildingType.apartment,
      minBudget: 0,
      maxBudget: 0,
    }),
    []
  );

  // #region Functions
  const formikValidation = useCallback((values: IRoomPreference) => {
    if (formValidationRState.frontendFormValidationIsEnabled) {
      try {
        roomPreferenceFormValidationSchema.parse(values);
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
        title="Room Preference"
        afterBoxContent={
          <ZButton
            onClick={() => {
              navigate({
                to: AppRoutes.appSub.placesList.completePath,
              });
            }}
          >
            Cancel
          </ZButton>
        }
      />

      <Formik
        initialValues={initialValues}
        validate={formikValidation}
        onSubmit={() => {
          navigate({
            to: AppRoutes.hobbies,
          });
        }}
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
              <ZContainer size="4" className="my-6 maxLg:mx-3">
                <ZCard className="*:w-full space-y-3 p-5 mb-4">
                  <ZRCSelect
                    name="desiredPlace"
                    required
                    label="Where you want to live?"
                    options={ZCitiesData}
                    isMulti={false}
                    placeholder="Select City"
                    value={values?.desiredPlace}
                    isTouched={touched?.desiredPlace}
                    errorMessage={errors?.desiredPlace}
                    onBlur={handleBlur}
                    onChange={(value) => {
                      setFieldValue("desiredPlace", value);
                    }}
                  />

                  <ZInput
                    required
                    name="moveInDate"
                    label="Move in date"
                    type={ZRUInputTypeE.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.moveInDate}
                    isTouched={touched?.moveInDate}
                    errorMessage={errors?.moveInDate}
                  />

                  <ZBox>
                    <ZText className="inline-block mb-1">Budget</ZText>
                    <ZFlex
                      align={ZRUAlignE.start}
                      gap="2"
                      className="sm:*:w-1/2 *:w-full maxSm:flex-col"
                    >
                      <ZInput
                        required
                        name="minBudget"
                        label="Min"
                        type={ZRUInputTypeE.number}
                        placeholder="min: $0"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.minBudget}
                        isTouched={touched?.minBudget}
                        errorMessage={errors?.minBudget}
                      />

                      <ZInput
                        required
                        name="maxBudget"
                        label="Max"
                        type={ZRUInputTypeE.number}
                        placeholder="max: $10,000"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.maxBudget}
                        isTouched={touched?.maxBudget}
                        errorMessage={errors?.maxBudget}
                      />
                    </ZFlex>
                  </ZBox>

                  <ZRadioCardList
                    label="Place Preference"
                    isTouched={touched.placePreference}
                    errorMessage={errors?.placePreference}
                    value={values.placePreference}
                    items={ZPlacePreferenceData}
                    color={ZRUColorE.purple}
                    onValueChange={(value) => {
                      setFieldValue("placePreference", value);
                    }}
                  />

                  <ZRadioCardList
                    label="Building Type"
                    isTouched={touched.buildingType}
                    errorMessage={errors?.buildingType}
                    value={values.buildingType}
                    items={ZBuildingTypeData}
                    color={ZRUColorE.purple}
                    onValueChange={(value) => {
                      setFieldValue("buildingType", value);
                    }}
                  />
                </ZCard>
                <FormActionButtons
                  showResetButton={false}
                  submitButtonContent={
                    <>
                      Save & Continue <ZArrowRightLongIcon className="mt-px" />
                    </>
                  }
                />
              </ZContainer>
            </Form>
          );
        }}
      </Formik>
    </ZPage>
  );
};

export default RoomPreference;
