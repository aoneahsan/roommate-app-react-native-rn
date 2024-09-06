// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZFlex,
  ZBox,
  ZRUAlignE,
  ZHeading,
  ZRUJustifyE,
  ZButton,
  ZRUColorE,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import PlaceListingCard from "@/components/private/PlaceListingCard";
import PlaceListingInProgressCard from "@/components/private/PlaceListingInProgressCard";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZAddIcon } from "@/assets";
import OtherUserInfoCard from "@/components/private/OtherUserInfoCard";
import ZPlacesData from "@/data/places";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import { calculateFullDuration } from "@/utils/helpers";
import ZSearch from "@/components/private/Search";

// #endregion

const PlacesList: React.FC = () => {
  return (
    <>
      <ZBox className="md:px-2 md:py-2">
        <ZFlex
          align={ZRUAlignE.center}
          justify={ZRUJustifyE.between}
          className="maxSm:flex-col maxSm:gap-3 maxSm:*:w-full"
        >
          <ZHeading className="text-2xl font-medium tracking-wider md:text-4xl maxSm:text-center">
            Your List
          </ZHeading>

          <ZFlex className="gap-3 sm:gap-2 maxSm:flex-col">
            <ZSearch />
            <ZButton>
              <ZAddIcon className="w-5 h-5" /> Add New Listing
            </ZButton>

            <ZButton color={ZRUColorE.blue}>In Progress</ZButton>
          </ZFlex>
        </ZFlex>
      </ZBox>

      <ZFlex className="items-stretch gap-3 mt-3 mb-4 md:mt-5">
        {ZPlacesData?.map((el, index) => {
          return (
            <PlaceListingCard
              key={index}
              title={el?.[FormFieldsEnum.title]}
              availabilityDate={el?.[FormFieldsEnum.moveInDate]}
              bathCount={el?.[FormFieldsEnum.numOfWashroom]}
              bedCount={el?.[FormFieldsEnum.numOfBedroom]}
              carCount={el?.[FormFieldsEnum.numOfParking]}
              frequency={el?.[FormFieldsEnum.frequency]}
              price={Number(el?.[FormFieldsEnum.rentFee]?.prize)}
              duration={calculateFullDuration(
                el?.[FormFieldsEnum.moveInDate],
                el?.[FormFieldsEnum.moveOutDate]
              )}
              type={el?.[FormFieldsEnum.buildingType]}
            />
          );
        })}
      </ZFlex>
    </>
  );
};

export default PlacesList;
