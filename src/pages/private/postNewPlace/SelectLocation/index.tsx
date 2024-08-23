// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import { Form, Formik } from "formik";
import { ZBox, ZContainer, ZPage } from "zaions-react-ui-kit";
import AsyncSelect from "react-select/async";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const SelectLocation: React.FC = () => {
  return (
    <ZPage>
      <NavigationHeader title="Select Location" />

      <Formik initialValues={{}} validate={() => {}} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <ZContainer size="4" className="my-6 maxLg:mx-3">
                <ZBox className="space-y-4">
                  {/* <AsyncSelect isLoading={} options={} /> */}
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
