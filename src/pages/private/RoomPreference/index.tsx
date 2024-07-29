// #region ---- Core Imports ----
import React, { useMemo } from "react";

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
  ZRadioCardsGroup,
  ZRadioCardsItem,
  ZRUAlignE,
  ZRUColorE,
  ZRUInputTypeE,
  ZSelect,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import ZCitiesData from "@/data/cities";
import NavigationHeader from "@/components/private/NavigationHeader";

// #endregion

// #region ---- Types Imports ----
import { EBuildingType, EPlacePreference } from "@/types/roomPreference";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZArrowRightLongIcon } from "@/assets";

// #endregion

const RoomPreference: React.FC = () => {
  const initialValues = useMemo(() => ({}), []);

  const placePreference = useMemo(
    () => [
      {
        value: EPlacePreference.entirePlace,
        label: "Entire Place",
      },
      {
        value: EPlacePreference.sharedPlace,
        label: "Shared Place",
      },
    ],
    []
  );

  const buildingType = useMemo(
    () => [
      {
        value: EBuildingType.noPreference,
        label: "No Preference",
      },
      {
        value: EBuildingType.condo,
        label: "Condo",
      },
      {
        value: EBuildingType.apartment,
        label: "Apartment",
      },
      {
        value: EBuildingType.twonHouse,
        label: "TwonHouse",
      },
      {
        value: EBuildingType.house,
        label: "House",
      },
      {
        value: EBuildingType.basement,
        label: "Basement",
      },
    ],
    []
  );

  return (
    <ZPage>
      <NavigationHeader title="Room Preference" />

      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <ZContainer size="4" className="my-6 maxLg:mx-3">
                <ZCard className="*:w-full space-y-3 p-5">
                  <ZSelect
                    label="Where you want to live?"
                    options={ZCitiesData}
                    trigger={{ placeholder: "Select City" }}
                  />

                  <ZInput label="Move in date" type={ZRUInputTypeE.date} />

                  <ZBox>
                    <ZText className="inline-block mb-1">Budget</ZText>
                    <ZFlex
                      align={ZRUAlignE.center}
                      gap="2"
                      className="sm:*:w-1/2 *:w-full maxSm:flex-col"
                    >
                      <ZInput
                        type={ZRUInputTypeE.number}
                        placeholder="min: $0"
                      />

                      <ZInput
                        type={ZRUInputTypeE.number}
                        placeholder="max: $10,000"
                      />
                    </ZFlex>
                  </ZBox>

                  <ZBox>
                    <ZText className="inline-block mb-1">
                      Place Preference
                    </ZText>
                    <ZRadioCardsGroup
                      className="*:w-max justify-start flex *:h-8 flex-wrap"
                      color={ZRUColorE.purple}
                    >
                      {placePreference?.map((el, index) => (
                        <ZRadioCardsItem
                          value={el?.value}
                          key={index}
                          className="w-max"
                        >
                          {el?.label}
                        </ZRadioCardsItem>
                      ))}
                    </ZRadioCardsGroup>
                  </ZBox>

                  <ZBox>
                    <ZText className="inline-block mb-1">Building Type</ZText>
                    <ZRadioCardsGroup
                      className="*:w-max justify-start flex *:h-8 flex-wrap"
                      color={ZRUColorE.purple}
                    >
                      {buildingType?.map((el, index) => (
                        <ZRadioCardsItem value={el?.value} key={index}>
                          {el?.label}
                        </ZRadioCardsItem>
                      ))}
                    </ZRadioCardsGroup>
                  </ZBox>
                </ZCard>
                <ZButton className="mt-6 max900px:w-full">
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

export default RoomPreference;
