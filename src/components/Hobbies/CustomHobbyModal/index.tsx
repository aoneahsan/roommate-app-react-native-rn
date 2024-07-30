// #region ---- Core Imports ----
import { EHobbyType } from "@/types/hobbies";
import { Form } from "formik";
import React, { useMemo } from "react";
import { ZFormik } from "zaions-react-tool-kit";
import {
  ZBox,
  ZButton,
  ZFlex,
  ZInput,
  ZModal,
  ZRUAlignE,
  ZRUColorE,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const CustomHobbyModal: React.FC<{
  open: boolean;
  closeModalHandler: () => void;
  type?: EHobbyType;
}> = ({ type, open, closeModalHandler }) => {
  const initialValues = useMemo(() => ({}), []);
  return (
    <ZModal
      title={`Add custom ${type}`}
      open={open}
      crossOnClick={closeModalHandler}
    >
      <ZBox className="mt-5">
        <ZFormik initialValues={initialValues} onSubmit={() => {}}>
          {() => {
            return (
              <Form className="space-y-5">
                <ZInput placeholder="Enter something short" />

                <ZFlex align={ZRUAlignE.center} className="gap-3">
                  <ZButton>Add</ZButton>
                  <ZButton onClick={closeModalHandler} color={ZRUColorE.iris}>
                    Cancel
                  </ZButton>
                </ZFlex>
              </Form>
            );
          }}
        </ZFormik>
      </ZBox>
    </ZModal>
  );
};

export default CustomHobbyModal;
