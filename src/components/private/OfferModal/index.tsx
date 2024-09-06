// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBox,
  ZButton,
  ZCard,
  ZFlex,
  ZFormActionButtons,
  ZInput,
  ZModal,
  ZPrizeInput,
  ZRUAlignE,
  ZRUColorE,
  ZRUInputTypeE,
  ZRUJustifyE,
  ZRUSelectValueI,
  ZSelect,
  ZSeparator,
  ZText,
  ZTextArea,
} from "zaions-react-ui-kit";
import { Formik, Form } from "formik";
import { ZodError } from "zod";
import { useRecoilValue } from "recoil";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import type { IOfferMe } from "@/types/OfferMe";

// #endregion

// #region ---- Store Imports ----
import { formValidationRStateAtom } from "@/state/formState";
import { isZNonEmptyString } from "zaions-tool-kit";
import { ZEditOutlineIcon, ZImageOutlineIcon } from "@/assets";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import ZFrequenciesData from "@/data/frequencies";
import { frequencyEnum } from "@/types/generic";
import ZPlacesData from "@/data/places";

// #endregion

// #region ---- Images Imports ----

// #endregion

const OfferModal: React.FC<{
  open: boolean;
  closeModal: () => void;
}> = ({ open, closeModal }) => {
  const initialValues = useMemo<IOfferMe>(
    () => ({
      [FormFieldsEnum.frequency]: frequencyEnum.monthly,
      selectedPlace: null,
      editRate: false,
    }),
    []
  );
  const formValidationRState = useRecoilValue(formValidationRStateAtom);

  // #region functions
  const validationHandler = useCallback((values: IOfferMe) => {
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
    <ZModal
      open={open}
      title="Your offer"
      crossOnClick={() => {
        closeModal();
      }}
    >
      <ZSeparator className="w-full" />
      <ZBox className="mt-5">
        <Formik
          initialValues={initialValues}
          validate={validationHandler}
          enableReinitialize
          onSubmit={() => {}}
        >
          {({
            values,
            touched,
            errors,
            setFieldTouched,
            setFieldValue,
            handleBlur,
            handleChange,
          }) => {
            return (
              <Form className="space-y-3">
                <ZSelect
                  required
                  name="selectedPlace"
                  label="Select Place"
                  className="*:w-full"
                  options={
                    ZPlacesData?.map((el) => ({
                      label: el?.title ?? "",
                      value: el?.id ?? "",
                    })) as ZRUSelectValueI[]
                  }
                  value={values?.selectedPlace?.id}
                  isTouched={touched?.selectedPlace}
                  errorMessage={errors?.selectedPlace}
                  trigger={{
                    placeholder: "Select place",
                  }}
                  onOpenChange={(val) => {
                    if (!touched?.selectedPlace) {
                      setFieldTouched("selectedPlace", val);
                    }
                  }}
                  onValueChange={(val) => {
                    const item = ZPlacesData?.find(
                      (place) => place?.id === val
                    );
                    setFieldValue("selectedPlace", item);
                    setFieldValue(
                      FormFieldsEnum.rate,
                      item?.[FormFieldsEnum.rentFee]
                    );
                    setFieldValue(
                      FormFieldsEnum.frequency,
                      item?.[FormFieldsEnum.frequency]
                    );
                  }}
                />

                <ZBox
                  show={isZNonEmptyString(values?.selectedPlace?.id)}
                  className="space-y-3"
                >
                  <ZCard className="w-full h-full p-0">
                    <ZBox className="px-4 py-1">
                      <ZText className="inline-block text-lg font-medium leading-1">
                        No.1
                      </ZText>
                    </ZBox>
                    <ZBox className="w-full h-36">
                      {isZNonEmptyString("") ? (
                        <img
                          src={""}
                          alt="place image"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <ZCard className="flex flex-col items-center justify-center w-full h-full gap-3">
                          <ZImageOutlineIcon className="w-8 h-8" />
                          <ZText>No image provided.</ZText>
                        </ZCard>
                      )}
                    </ZBox>
                    <ZBox className="px-3 py-2">
                      <ZText
                        className="inline-block text-sm leading-1"
                        color={ZRUColorE.iris}
                      >
                        {values?.selectedPlace?.title}
                      </ZText>
                    </ZBox>
                  </ZCard>
                  <ZSeparator className="w-full" />
                </ZBox>

                <ZFlex
                  align={ZRUAlignE.center}
                  justify={ZRUJustifyE.between}
                  show={
                    !values?.editRate &&
                    isZNonEmptyString(values?.selectedPlace?.id)
                  }
                >
                  <ZFlex className="gap-2 *:text-base">
                    <ZText color={ZRUColorE.gray}>Rate:</ZText>
                    <ZText className="font-medium" color={ZRUColorE.tomato}>
                      {values?.rate?.currency?.symbol}
                      {values?.rate?.prize}
                      <ZSeparator className="w-full" />
                    </ZText>
                    <ZText>/ {values?.frequency}</ZText>
                  </ZFlex>

                  <ZButton
                    size="1"
                    className="font-normal"
                    type="button"
                    onClick={() => setFieldValue("editRate", true)}
                  >
                    <ZEditOutlineIcon /> Edit
                  </ZButton>
                </ZFlex>

                <ZBox
                  className="space-y-3"
                  show={
                    values?.editRate &&
                    isZNonEmptyString(values?.selectedPlace?.id)
                  }
                >
                  <ZPrizeInput
                    inputContainerClassName="flex-col"
                    selectClassName="*:w-full w-full"
                    inputClassName="w-full"
                    className="w-full"
                    label="Rate"
                    value={values?.[FormFieldsEnum.rate]}
                    isTouched={touched?.[FormFieldsEnum.rate]}
                    errorMessage={errors?.[FormFieldsEnum.rate]}
                    onChange={(val) => setFieldValue(FormFieldsEnum.rate, val)}
                    onBlur={handleBlur}
                  />

                  <ZSelect
                    required
                    label="Frequency"
                    className="*:w-full"
                    options={ZFrequenciesData}
                    name={FormFieldsEnum.frequency}
                    value={values?.[FormFieldsEnum.frequency]}
                    isTouched={touched?.[FormFieldsEnum.frequency]}
                    errorMessage={errors?.[FormFieldsEnum.frequency]}
                    onOpenChange={(val) => {
                      if (!touched[FormFieldsEnum.frequency]) {
                        setFieldTouched(FormFieldsEnum.frequency, val);
                      }
                    }}
                    onValueChange={(val) => {
                      setFieldValue(FormFieldsEnum.frequency, val);
                    }}
                  />
                  <ZButton
                    size="1"
                    className="font-normal"
                    type="button"
                    onClick={() => setFieldValue("editRate", false)}
                  >
                    Done
                  </ZButton>
                </ZBox>
                <ZSeparator className="w-full" />

                <ZTextArea
                  rows={3}
                  label="Tenants Requirement"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name={FormFieldsEnum.tenantsRequirement}
                  placeholder="Maximum 50 words"
                  value={values?.[FormFieldsEnum.tenantsRequirement]}
                  isTouched={touched?.[FormFieldsEnum.tenantsRequirement]}
                  errorMessage={errors?.[FormFieldsEnum.tenantsRequirement]}
                />

                <ZFormActionButtons />
              </Form>
            );
          }}
        </Formik>
      </ZBox>
    </ZModal>
  );
};

export default OfferModal;
