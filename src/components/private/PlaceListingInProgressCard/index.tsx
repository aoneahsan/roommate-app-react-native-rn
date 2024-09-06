// #region ---- Core Imports ----
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { ZBox, ZCard, ZRUColorE, ZText } from "zaions-react-ui-kit";
import { isZNonEmptyString } from "zaions-tool-kit";

// #endregion

// #region ---- Custom Imports ----
import CreditScore from "../CreditScore";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZImageOutlineIcon } from "@/assets";

// #endregion

// #region ---- Types Imports ----
interface PlaceListingInProgressCardProps {
  imageUrl?: string;
  title?: string;
  scorePercentage?: number;
}

// #endregion

const PlaceListingInProgressCard: React.FC<PlaceListingInProgressCardProps> = ({
  imageUrl,
  title,
  scorePercentage = 0,
}) => {
  const remainingPercentage = useMemo(
    () => 100 - scorePercentage,
    [scorePercentage]
  ); // Calculate remaining percentage
  return (
    <ZCard className="w-full h-full p-0 overflow-hidden max-w-96">
      <ZBox className="px-4 py-2">
        <ZText
          className="inline-block text-base font-medium leading-1"
          color={ZRUColorE.iris}
        >
          {title || "No Title Available"}
        </ZText>
      </ZBox>

      <ZBox className="w-full h-36">
        {isZNonEmptyString(imageUrl) ? (
          <img
            src={imageUrl}
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

      <ZBox className="px-4 py-2">
        <ZText className="block text-base leading-1">Finish your listing</ZText>
        <ZText
          className="block text-sm leading-1"
          show={remainingPercentage > 0}
        >
          You’re {remainingPercentage}% of the way there
        </ZText>

        <CreditScore scorePercentage={scorePercentage} classNames="mt-7" />
      </ZBox>
    </ZCard>
  );
};

export default PlaceListingInProgressCard;
