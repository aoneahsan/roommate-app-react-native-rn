// #region ---- Core Imports ----
import React, { useCallback, useMemo, useState } from "react";

// #endregion

// #region ---- Packages Imports ----
import { Form, Formik } from "formik";
import {
  ZBox,
  ZButton,
  ZCallout,
  ZCard,
  ZContainer,
  ZHeading,
  ZInput,
  ZPage,
  ZRadioCardList,
  ZRUColorE,
  ZRUHeadingAsE,
} from "zaions-react-ui-kit";
import { useRecoilValue, useRecoilState } from "recoil";
import { ZodError } from "zod";
import { useNavigate } from "@tanstack/react-router";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import ZSearchPlace from "@/components/ZSearchPlace";
import ZGetCurrentLocation from "@/components/ZGetCurrentLocation";
import FormActionButtons from "@/components/form/FormActionButtons";
import { formValidationRStateAtom } from "@/state/formState";
import { locationValidationSchema } from "@/validationSchema";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import { AppRoutes } from "@/routes/appRoutes";
import {
  extractAddressDetails,
  extractAddressDetailsFromGeocoding,
} from "@/utils/helpers/apiHelpers";

// #endregion

// #region ---- Types Imports ----
import { ISearchLocation, locationOptionEnum } from "@/types/postingList";

// #endregion

// #region ---- Store Imports ----
import { plStepOneRStateAtom } from "@/state/postingList";

// #endregion

// #region ---- Images Imports ----
import { ZAddLocationOutlineIcon, ZArrowLeftLongIcon } from "@/assets";

// #endregion

const SelectLocation: React.FC = () => {
  const navigate = useNavigate();
  const [compState, setCompState] = useState<{
    processing: boolean;
  }>({
    processing: false,
  });
  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const [plStepOneRState, setPlStepOneRState] =
    useRecoilState(plStepOneRStateAtom);

  const initialValues = useMemo<ISearchLocation>(
    () => ({
      searchPlace: plStepOneRState?.location?.searchPlace ?? "",
      locationOption:
        plStepOneRState?.location?.locationOption ??
        locationOptionEnum.selectCurrentLocation,
      [FormFieldsEnum.country]:
        plStepOneRState?.location?.[FormFieldsEnum.country] ?? "",
      [FormFieldsEnum.aptSuit]:
        plStepOneRState?.location?.[FormFieldsEnum.aptSuit] ?? "",
      [FormFieldsEnum.city]:
        plStepOneRState?.location?.[FormFieldsEnum.city] ?? "",
      [FormFieldsEnum.postCode]:
        plStepOneRState?.location?.[FormFieldsEnum.postCode] ?? "",
      [FormFieldsEnum.province]:
        plStepOneRState?.location?.[FormFieldsEnum.province] ?? "",
      [FormFieldsEnum.streetAddress]:
        plStepOneRState?.location?.[FormFieldsEnum.streetAddress] ?? "",
      [FormFieldsEnum.formattedAddress]:
        plStepOneRState?.location?.[FormFieldsEnum.formattedAddress] ?? "",
    }),
    [plStepOneRState]
  );
  const _locationOptions = useMemo(
    () => [
      {
        value: locationOptionEnum.searchPlace,
        label: "Search place",
      },
      {
        value: locationOptionEnum.selectCurrentLocation,
        label: "Select current location",
      },
    ],
    []
  );

  // #region Functions
  const processing = useCallback(
    () => setCompState((oldValues) => ({ ...oldValues, processing: true })),
    []
  );

  const doneProcessing = useCallback(
    () => setCompState((oldValues) => ({ ...oldValues, processing: false })),
    []
  );

  const validationHandler = useCallback((values: ISearchLocation) => {
    if (formValidationRState.frontendFormValidationIsEnabled) {
      try {
        locationValidationSchema.parse(values);
      } catch (error) {
        if (error instanceof ZodError) {
          return error.formErrors.fieldErrors;
        }
      }
    }
  }, []);

  const submitHandler = useCallback((values: ISearchLocation) => {
    try {
      processing();

      setPlStepOneRState((prev) => ({ ...prev, location: { ...values } }));

      doneProcessing();

      navigate({
        to: AppRoutes.postingListSub.stepOne,
      });
    } catch (error) {}
  }, []);
  // #endregion

  return (
    <ZPage>
      <NavigationHeader
        title="Select Location"
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
        validate={validationHandler}
        onSubmit={submitHandler}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
        }) => {
          return (
            <Form>
              <ZContainer size="4" className="my-6 maxLg:mx-3">
                <ZBox className="space-y-4">
                  <ZCallout
                    className="font-medium"
                    content="You can either search for a location or get your current location. Only one option can be enabled at a time."
                  />
                  <ZRadioCardList
                    color={ZRUColorE.purple}
                    value={values?.locationOption}
                    onValueChange={(value) => {
                      setFieldValue("locationOption", value);
                    }}
                    items={_locationOptions}
                  />
                  {values?.locationOption === locationOptionEnum.searchPlace ? (
                    <ZSearchPlace
                      disabled={compState?.processing}
                      loading={
                        values?.locationOption ===
                          locationOptionEnum.searchPlace &&
                        compState?.processing
                      }
                      onSelect={async (place) => {
                        const _place = extractAddressDetails(place);

                        await setFieldValue(
                          FormFieldsEnum.country,
                          _place?.[FormFieldsEnum.country] ?? "",
                          true
                        );
                        await setFieldValue(
                          FormFieldsEnum.aptSuit,
                          _place?.[FormFieldsEnum.aptSuit] ?? "",
                          true
                        );
                        await setFieldValue(
                          FormFieldsEnum.city,
                          _place?.[FormFieldsEnum.city] ?? "",
                          true
                        );
                        await setFieldValue(
                          FormFieldsEnum.postCode,
                          _place?.[FormFieldsEnum.postCode] ?? "",
                          true
                        );
                        await setFieldValue(
                          FormFieldsEnum.province,
                          _place?.[FormFieldsEnum.province] ?? "",
                          true
                        );
                        await setFieldValue(
                          FormFieldsEnum.streetAddress,
                          place?.[FormFieldsEnum.formattedAddress] ?? "",
                          true
                        );
                        await setFieldValue(
                          FormFieldsEnum.formattedAddress,
                          place?.[FormFieldsEnum.formattedAddress] ?? "",
                          true
                        );
                      }}
                    />
                  ) : null}

                  {values?.locationOption ===
                  locationOptionEnum.selectCurrentLocation ? (
                    <ZCard className="space-y-4">
                      <ZHeading
                        as={ZRUHeadingAsE.h5}
                        className="maxMd:text-center"
                      >
                        Select Current Location
                      </ZHeading>

                      <ZGetCurrentLocation
                        disabled={compState?.processing}
                        loading={
                          values?.locationOption ===
                            locationOptionEnum.selectCurrentLocation &&
                          compState?.processing
                        }
                        onClick={async (currentLocation) => {
                          const _place =
                            extractAddressDetailsFromGeocoding(currentLocation);

                          await setFieldValue(
                            FormFieldsEnum.country,
                            _place?.[FormFieldsEnum.country] ?? "",
                            true
                          );
                          await setFieldValue(
                            FormFieldsEnum.aptSuit,
                            _place?.[FormFieldsEnum.aptSuit] ?? "",
                            true
                          );
                          await setFieldValue(
                            FormFieldsEnum.city,
                            _place?.[FormFieldsEnum.city] ?? "",
                            true
                          );
                          await setFieldValue(
                            FormFieldsEnum.postCode,
                            _place?.[FormFieldsEnum.postCode] ?? "",
                            true
                          );
                          await setFieldValue(
                            FormFieldsEnum.province,
                            _place?.[FormFieldsEnum.province] ?? "",
                            true
                          );
                          await setFieldValue(
                            "streetAddress",
                            currentLocation?.formatted_address ?? "",
                            true
                          );
                          await setFieldValue(
                            FormFieldsEnum.formattedAddress,
                            currentLocation?.formatted_address ?? "",
                            true
                          );
                        }}
                      />
                    </ZCard>
                  ) : null}

                  <ZCard className="space-y-4">
                    <ZHeading
                      as={ZRUHeadingAsE.h5}
                      className="maxMd:text-center"
                    >
                      Enter Location Manually
                    </ZHeading>

                    <ZInput
                      label="Country/Region"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name={FormFieldsEnum.country}
                      value={values?.[FormFieldsEnum.country]}
                      isTouched={touched?.[FormFieldsEnum.country]}
                      errorMessage={errors?.[FormFieldsEnum.country]}
                    />

                    <ZInput
                      label="Street Address"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name={FormFieldsEnum.streetAddress}
                      value={values?.[FormFieldsEnum.streetAddress]}
                      isTouched={touched?.[FormFieldsEnum.streetAddress]}
                      errorMessage={errors?.[FormFieldsEnum.streetAddress]}
                    />

                    <ZInput
                      label="Apt, Suit, etc (optional)"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name={FormFieldsEnum.aptSuit}
                      value={values?.[FormFieldsEnum.aptSuit]}
                      isTouched={touched?.[FormFieldsEnum.aptSuit]}
                      errorMessage={errors?.[FormFieldsEnum.aptSuit]}
                    />

                    <ZInput
                      label="City"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name={FormFieldsEnum.city}
                      value={values?.[FormFieldsEnum.city]}
                      isTouched={touched?.[FormFieldsEnum.city]}
                      errorMessage={errors?.[FormFieldsEnum.city]}
                    />

                    <ZInput
                      label="Province"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name={FormFieldsEnum.province}
                      value={values?.[FormFieldsEnum.province]}
                      isTouched={touched?.[FormFieldsEnum.province]}
                      errorMessage={errors?.[FormFieldsEnum.province]}
                    />

                    <ZInput
                      label="Post Code"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name={FormFieldsEnum.postCode}
                      value={values?.[FormFieldsEnum.postCode]}
                      isTouched={touched?.[FormFieldsEnum.postCode]}
                      errorMessage={errors?.[FormFieldsEnum.postCode]}
                    />

                    <FormActionButtons
                      processing={compState?.processing}
                      submitButtonContent={
                        <>
                          <ZAddLocationOutlineIcon className="w-5 h-5" />
                          Add
                        </>
                      }
                    />
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

export default SelectLocation;
