// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { ZContainer, ZPage, ZTextArea } from "zaions-react-ui-kit";
import { ZodError } from "zod";
import { Form, Formik } from "formik";
import { useRecoilValue } from "recoil";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import { formValidationRStateAtom } from "@/state/formState";

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
        {() => {
          return (
            <Form>
              <ZContainer size="4" className="my-6 maxLg:mx-3">
                <ZTextArea
                  label="Title"
                  placeholder="Maximum 50 words"
                  rows={6}
                />
              </ZContainer>
            </Form>
          );
        }}
      </Formik>
    </ZPage>
  );
};

export default PostingList;
