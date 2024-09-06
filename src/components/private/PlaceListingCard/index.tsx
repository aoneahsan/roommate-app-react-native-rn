// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBox,
  ZButton,
  ZCard,
  ZFlex,
  ZRUAlignE,
  ZRUColorE,
  ZRUJustifyE,
  ZRUOrientationE,
  ZRUVariantE,
  ZSeparator,
  ZText,
} from "zaions-react-ui-kit";
import { isZNonEmptyString } from "zaions-tool-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZBathtubOutlineIcon,
  ZBedOutlineIcon,
  ZCarOutlineIcon,
  ZImageOutlineIcon,
  ZLogOutOutlineIcon,
} from "@/assets";

// #endregion

// #region ---- Types Imports ----
import { EBuildingType } from "@/types/roomPreference";
import { frequencyEnum } from "@/types/generic";
interface PlaceListingCardProps {
  imageUrl?: string;
  title?: string;
  availabilityDate?: string;
  duration?: string;
  type?: EBuildingType | null;
  price?: number;
  bedCount?: number;
  bathCount?: number;
  carCount?: number;
  showEditBtn?: boolean;
  showDeleteBtn?: boolean;
  showCreateTeamBtn?: boolean;
  frequency?: frequencyEnum;
  onEdit?: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  createTeamHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

// #endregion

const PlaceListingCard: React.FC<PlaceListingCardProps> = ({
  imageUrl,
  title,
  availabilityDate,
  duration,
  type,
  price,
  bedCount,
  bathCount,
  carCount,
  frequency,
  showEditBtn = true,
  showDeleteBtn = true,
  showCreateTeamBtn = true,
  onEdit,
  onDelete,
  createTeamHandler,
}) => {
  return (
    <ZCard className="relative w-full p-0 overflow-hidden max-w-96">
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
      <ZBox className="px-3 py-2 mb-14">
        <ZText
          className="inline-block text-sm leading-1"
          color={ZRUColorE.iris}
        >
          {title || "No Title Available"}
        </ZText>

        <ZFlex className="mt-4 maxXs:flex-col xs:justify-between xs:items-end">
          <ZFlex align={ZRUAlignE.center} className="gap-2">
            <ZFlex className="gap-1" align={ZRUAlignE.center}>
              <ZLogOutOutlineIcon className="w-5 h-5" />
              <ZText className="text-xs sm:text-sm">
                {availabilityDate || "Date Not Available"}
              </ZText>
            </ZFlex>
            <ZSeparator orientation={ZRUOrientationE.vertical} />
            <ZText className="text-xs sm:text-sm">
              {duration || "Duration Not Specified"}
            </ZText>
          </ZFlex>

          <ZBox className="text-end maxXs:flex maxXs:items-center maxXs:gap-3 maxXs:mt-2">
            <ZText className="block text-xs sm:text-sm">
              {type || "Type Not Specified"}
            </ZText>
            <ZText className="font-medium maxSm:text-sm">
              <ZText color={ZRUColorE.tomato}>${price ?? "0"}</ZText>/
              {frequency}
            </ZText>
          </ZBox>
        </ZFlex>

        <ZFlex className="gap-2 mt-2 maxXs:flex-col xs:justify-between xs:items-end">
          <ZFlex align={ZRUAlignE.center} className="gap-2">
            <ZFlex align={ZRUAlignE.center} className="gap-1">
              <ZBedOutlineIcon className="w-5 h-5" />
              <ZText>{bedCount ?? "0"}</ZText>
            </ZFlex>
            <ZSeparator orientation={ZRUOrientationE.vertical} />

            <ZFlex align={ZRUAlignE.center} className="gap-1">
              <ZBathtubOutlineIcon className="w-5 h-5" />
              <ZText>{bathCount ?? "0"}</ZText>
            </ZFlex>
            <ZSeparator orientation={ZRUOrientationE.vertical} />

            <ZFlex align={ZRUAlignE.center} className="gap-1">
              <ZCarOutlineIcon className="w-5 h-5" />
              <ZText>{carCount ?? "0"}</ZText>
            </ZFlex>
          </ZFlex>

          <ZButton onClick={createTeamHandler} show={showCreateTeamBtn}>
            Create Team
          </ZButton>
        </ZFlex>
      </ZBox>

      <ZCard className="absolute bottom-0 w-full mt-3 rounded-none">
        <ZFlex
          align={ZRUAlignE.center}
          justify={ZRUJustifyE.between}
          className="gap-2"
        >
          <ZText>No. 1</ZText>

          <ZFlex className="gap-3" align={ZRUAlignE.center}>
            <ZButton
              variant={ZRUVariantE.ghost}
              onClick={onEdit}
              show={showEditBtn}
            >
              Edit
            </ZButton>
            <ZSeparator orientation={ZRUOrientationE.vertical} />
            <ZButton
              variant={ZRUVariantE.ghost}
              color={ZRUColorE.tomato}
              onClick={onDelete}
              show={showDeleteBtn}
            >
              Delete
            </ZButton>
          </ZFlex>
        </ZFlex>
      </ZCard>
    </ZCard>
  );
};

export default PlaceListingCard;
