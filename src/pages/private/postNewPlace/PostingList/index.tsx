// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBadge,
  ZBox,
  ZButton,
  ZCard,
  ZContainer,
  ZFlex,
  ZPage,
  ZPrizeInput,
  ZRCSelect,
  ZRUAlignE,
  ZRUColorE,
  ZText,
  ZTextArea,
} from "zaions-react-ui-kit";
import { ZodError } from "zod";
import { Form, Formik } from "formik";
import { useRecoilValue } from "recoil";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import { formValidationRStateAtom } from "@/state/formState";
import ZBuildingTypeData from "@/data/buildingType";
import { ZAddIcon, ZArrowRightLongIcon } from "@/assets";
import ZPlacePreferenceData from "@/data/placePreference";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const PostingList: React.FC = () => {
  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const initialValues = useMemo(() => ({}), []);

  // #region Functions
  const formikValidation = useCallback(() => {
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
      <NavigationHeader title="Posting List" />

      <Formik
        initialValues={initialValues}
        validate={formikValidation}
        onSubmit={() => {}}
      >
        {({ isValid }) => {
          return (
            <Form>
              <ZContainer size="4" className="my-6 maxLg:mx-3">
                <ZBox className="space-y-4">
                  <ZTextArea
                    label="Title"
                    placeholder="Maximum 50 words"
                    rows={6}
                  />

                  <ZRCSelect
                    label="Building Type"
                    options={ZBuildingTypeData}
                    placeholder="Select building type"
                  />

                  <ZCard>
                    <ZFlex align={ZRUAlignE.center} className="gap-3">
                      <ZText>Location</ZText>
                      <ZBadge size="3" color={ZRUColorE.lime}>
                        6 Huron St, Toronto ON, Canada
                      </ZBadge>
                      <ZButton className="ms-auto">
                        <ZAddIcon /> Add
                      </ZButton>
                    </ZFlex>
                  </ZCard>

                  <ZRCSelect
                    label="Place"
                    options={ZPlacePreferenceData}
                    placeholder="Select place"
                  />

                  <ZFlex align={ZRUAlignE.end} className="gap-3">
                    <ZPrizeInput className="w-full" label="Rent fee" />
                    <ZBadge
                      size="3"
                      className="mb-1 tracking-wide"
                      color={ZRUColorE.lime}
                    >
                      /Mon
                    </ZBadge>
                  </ZFlex>
                </ZBox>
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

export default PostingList;
