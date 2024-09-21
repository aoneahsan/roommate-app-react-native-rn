// #region ---- Core Imports ----
import ZAgesData from "@/data/ages";
import ZBuildingTypeData from "@/data/buildingType";
import ZCleanlinessData from "@/data/cleanliness";
import ZGenderData from "@/data/gender";
import ZGuestsData from "@/data/guests";
import ZSmokeData from "@/data/smoke";
import {
  ECleanlinessType,
  EGenderType,
  EGuestsType,
  EPetsType,
  ESmokeType,
} from "@/types/preference";
import { EBuildingType } from "@/types/roomPreference";
import { IUserFilter } from "@/types/user";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import { Form, Formik } from "formik";
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBox,
  ZButton,
  ZCard,
  ZFlex,
  ZFormActionButtons,
  ZInput,
  ZRadioCardsGroup,
  ZRadioCardsItem,
  ZRUAlignE,
  ZRUColorE,
  ZRUInputTypeE,
  ZRUJustifyE,
  ZSelect,
  ZSeparator,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZCityLightOutlineIcon } from "@/assets";

// #endregion

const UserFilter: React.FC = () => {
  const filterOptions = useMemo(
    () =>
      [
        {
          label: "Building Type",
          name: FormFieldsEnum.buildingType,
          items: ZBuildingTypeData,
        },
        {
          label: "Gender",
          name: FormFieldsEnum.gender,
          items: [...ZGenderData, { value: EGenderType.all, label: "All" }],
        },
        {
          label: "Cleanliness",
          name: FormFieldsEnum.cleanliness,
          items: ZCleanlinessData,
        },
        {
          label: "Smoke",
          name: FormFieldsEnum.smoke,
          items: ZSmokeData,
        },
        {
          label: "Pets",
          name: FormFieldsEnum.pets,
          items: [
            {
              value: EPetsType.no,
              label: "No",
            },
            {
              value: EPetsType.yes,
              label: "Yes",
            },
          ],
        },
        {
          label: "Overnight Guests",
          name: FormFieldsEnum.overnightGuests,
          items: ZGuestsData,
        },
      ] as const,
    []
  );

  const initialValues = useMemo<IUserFilter>(
    () => ({
      [FormFieldsEnum.buildingType]: EBuildingType.noPreference,
      [FormFieldsEnum.gender]: EGenderType.all,
      [FormFieldsEnum.cleanliness]: ECleanlinessType.clean,
      [FormFieldsEnum.smoke]: ESmokeType.no,
      [FormFieldsEnum.pets]: EPetsType.dependsOnThePet,
      [FormFieldsEnum.overnightGuests]: EGuestsType.occasionally,
      [FormFieldsEnum.city]: "",
      [FormFieldsEnum.age]: "",
      [FormFieldsEnum.minBudget]: "",
      [FormFieldsEnum.maxBudget]: "",
      [FormFieldsEnum.moveInDate]: "",
      [FormFieldsEnum.moveOutDate]: "",
    }),
    []
  );

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldTouched,
          setFieldValue,
        }) => {
          return (
            <Form>
              <ZBox className="px-2 py-2 space-y-6">
                <ZFlex
                  align={ZRUAlignE.center}
                  justify={ZRUJustifyE.between}
                  className="maxSm:flex-col maxSm:*:w-full maxSm:*:text-center"
                >
                  <ZBox>
                    <ZText color={ZRUColorE.gray}>
                      You are searching in
                      <ZText className="font-medium ps-1" color={ZRUColorE.sky}>
                        Toronto
                      </ZText>
                    </ZText>
                  </ZBox>
                  <ZBox>
                    <ZButton className="maxSm:w-full">
                      <ZCityLightOutlineIcon className="w-5 h-5" /> Change City
                    </ZButton>
                  </ZBox>
                </ZFlex>

                <ZSeparator className="w-full" />

                <ZFlex className="2xl:*:flex-1 lg:*:w-[49%] *:w-full  gap-4 flex-wrap">
                  <ZCard>
                    <ZSelect
                      label="Age"
                      name={FormFieldsEnum.age}
                      value={values?.[FormFieldsEnum.age]}
                      isTouched={touched?.[FormFieldsEnum.age]}
                      trigger={{
                        placeholder: "Select Your Age",
                      }}
                      className="*:w-full"
                      options={ZAgesData}
                      errorMessage={errors?.[FormFieldsEnum.age]}
                      onOpenChange={(val) => {
                        if (!touched?.[FormFieldsEnum.age]) {
                          setFieldTouched(FormFieldsEnum.age, val);
                        }
                      }}
                      onValueChange={(val) => {
                        setFieldValue(FormFieldsEnum.age, val);
                      }}
                    />
                  </ZCard>

                  <ZCard>
                    <ZText className="inline-block mb-1" color={ZRUColorE.sky}>
                      Budget
                    </ZText>
                    <ZFlex
                      align={ZRUAlignE.start}
                      gap="2"
                      className="sm:*:w-1/2 *:w-full maxSm:flex-col"
                    >
                      <ZInput
                        name={FormFieldsEnum.minBudget}
                        label="Min"
                        type={ZRUInputTypeE.number}
                        placeholder="min: $0"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.[FormFieldsEnum.minBudget]}
                        isTouched={touched?.[FormFieldsEnum.minBudget]}
                        errorMessage={errors?.[FormFieldsEnum.minBudget]}
                      />

                      <ZInput
                        name={FormFieldsEnum.maxBudget}
                        label="Max"
                        type={ZRUInputTypeE.number}
                        placeholder="max: $10,000"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.[FormFieldsEnum.maxBudget]}
                        isTouched={touched?.[FormFieldsEnum.maxBudget]}
                        errorMessage={errors?.[FormFieldsEnum.maxBudget]}
                      />
                    </ZFlex>
                  </ZCard>

                  <ZCard>
                    <ZText className="inline-block mb-1" color={ZRUColorE.sky}>
                      Move in Date
                    </ZText>
                    <ZFlex
                      align={ZRUAlignE.end}
                      gap="2"
                      className="sm:*:w-1/2 *:w-full maxSm:flex-col"
                    >
                      <ZInput
                        label="After..."
                        name={FormFieldsEnum.moveInDate}
                        type={ZRUInputTypeE.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.[FormFieldsEnum.moveInDate]}
                        isTouched={touched?.[FormFieldsEnum.moveInDate]}
                        errorMessage={errors?.[FormFieldsEnum.moveInDate]}
                      />

                      <ZInput
                        className="mb-px"
                        name={FormFieldsEnum.moveOutDate}
                        type={ZRUInputTypeE.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.[FormFieldsEnum.moveOutDate]}
                        isTouched={touched?.[FormFieldsEnum.moveOutDate]}
                        errorMessage={errors?.[FormFieldsEnum.moveOutDate]}
                      />
                    </ZFlex>
                  </ZCard>
                </ZFlex>

                <ZSeparator className="w-full" />

                <ZFlex className="*:max-w-1/4 gap-4 flex-wrap">
                  {filterOptions?.map((el, index) => (
                    <ZCard key={index}>
                      <ZText className="inline-block mb-1">{el?.label}</ZText>
                      <ZRadioCardsGroup
                        className="*:w-max justify-start flex *:h-8 flex-wrap"
                        color={ZRUColorE.purple}
                        value={values?.[el?.name]}
                        onValueChange={(value) => {
                          setFieldValue(el?.name, value);
                        }}
                      >
                        {el?.items?.map((item, itemIndex) => (
                          <ZRadioCardsItem
                            value={item?.value}
                            key={itemIndex}
                            className="w-max"
                          >
                            {item?.label}
                          </ZRadioCardsItem>
                        ))}
                      </ZRadioCardsGroup>
                    </ZCard>
                  ))}
                </ZFlex>

                <ZCard className="*:!mb-0">
                  <ZFormActionButtons />
                </ZCard>
              </ZBox>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default UserFilter;
