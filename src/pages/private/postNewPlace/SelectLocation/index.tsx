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
  ZFlex,
  ZHeading,
  ZInput,
  ZPage,
  ZRadioCardList,
  ZRUAlignE,
  ZRUColorE,
  ZRUHeadingAsE,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";

// #endregion

// #region ---- Types Imports ----
import { ISearchLocation, locationOptionEnum } from "@/types/postingList";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZAddLocationOutlineIcon,
  ZLocationOutlineIcon,
  ZSearchLocationOutlineIcon,
} from "@/assets";
import { reportCustomError } from "zaions-tool-kit";
import { zGetCurrentPosition } from "zaions-react-tool-kit";

// #endregion

const SelectLocation: React.FC = () => {
  const [compState, setCompState] = useState<{
    processing: boolean;
  }>({
    processing: false,
  });
  const initialValues = useMemo<ISearchLocation>(() => ({}), []);

  // #region Functions
  const processing = useCallback(
    () => setCompState((oldValues) => ({ ...oldValues, processing: true })),
    []
  );

  const doneProcessing = useCallback(
    () => setCompState((oldValues) => ({ ...oldValues, processing: false })),
    []
  );

  const getCurrentLocationHandler = useCallback(async () => {
    try {
      processing();
      const coordinates = await zGetCurrentPosition();
      if (coordinates?.coords) {
        console.log({ c: coordinates?.coords });
        doneProcessing();
      }

      if (compState?.processing) {
        doneProcessing();
      }
    } catch (error) {
      doneProcessing();
      reportCustomError(error);
    }
  }, []);
  // #endregion

  return (
    <ZPage>
      <NavigationHeader title="Select Location" />

      <Formik
        initialValues={initialValues}
        validate={() => {}}
        onSubmit={() => {}}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          setFieldValue,
          handleChange,
          handleBlur,
        }) => {
          return (
            <Form>
              <ZContainer size="4" className="my-6 maxLg:mx-3">
                <ZBox className="space-y-4">
                  <ZCallout content="You can either search for a location or get your current location. Only one option can be enabled at a time." />
                  <ZRadioCardList
                    color={ZRUColorE.purple}
                    value={values?.locationOption}
                    onValueChange={(value) => {
                      setFieldValue("locationOption", value);
                    }}
                    items={[
                      {
                        value: "searchPlace",
                        label: "Search place",
                      },
                      {
                        value: "selectCurrentLocation",
                        label: "Select current location",
                      },
                    ]}
                  />
                  <ZCard className="space-y-4">
                    <ZHeading as={ZRUHeadingAsE.h5}>Search Place</ZHeading>
                    <ZFlex align={ZRUAlignE.center} className="gap-2">
                      <ZInput
                        className="w-full"
                        placeholder="Enter place name"
                        disabled={
                          values?.locationOption ===
                          locationOptionEnum.selectCurrentLocation
                        }
                      />
                      <ZButton
                        type="button"
                        disabled={
                          values?.locationOption ===
                            locationOptionEnum.selectCurrentLocation ||
                          compState?.processing
                        }
                      >
                        <ZSearchLocationOutlineIcon className="w-5 h-5" />
                        Search
                      </ZButton>
                    </ZFlex>
                  </ZCard>

                  <ZCard className="space-y-4">
                    <ZHeading as={ZRUHeadingAsE.h5}>
                      Select Current Location
                    </ZHeading>

                    <ZButton
                      type="button"
                      onClick={() => getCurrentLocationHandler()}
                      disabled={
                        values?.locationOption ===
                          locationOptionEnum.searchPlace ||
                        compState?.processing
                      }
                    >
                      <ZLocationOutlineIcon className="w-5 h-5" /> Get Current
                      Location
                    </ZButton>
                  </ZCard>

                  <ZCard className="space-y-4">
                    <ZHeading as={ZRUHeadingAsE.h5}>
                      Enter Location Manually
                    </ZHeading>

                    <ZInput
                      label="Country/Region"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="country"
                      value={values?.country}
                      isTouched={touched?.country}
                      errorMessage={errors?.country}
                    />

                    <ZInput
                      label="Street Address"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="city"
                      value={values?.streetAddress}
                      isTouched={touched?.streetAddress}
                      errorMessage={errors?.streetAddress}
                    />

                    <ZInput
                      label="Apt, Suit, etc (optional)"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="aptSuit"
                      value={values?.aptSuit}
                      isTouched={touched?.aptSuit}
                      errorMessage={errors?.aptSuit}
                    />

                    <ZInput
                      label="City"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="city"
                      value={values?.city}
                      isTouched={touched?.city}
                      errorMessage={errors?.city}
                    />

                    <ZInput
                      label="Province"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="province"
                      value={values?.province}
                      isTouched={touched?.province}
                      errorMessage={errors?.province}
                    />

                    <ZInput
                      label="Post Code"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="postCode"
                      value={values?.postCode}
                      isTouched={touched?.postCode}
                      errorMessage={errors?.postCode}
                    />

                    <ZButton disabled={compState?.processing} type="submit">
                      <ZAddLocationOutlineIcon className="w-5 h-5" />
                      Add
                    </ZButton>
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
