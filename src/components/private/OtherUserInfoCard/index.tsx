// #region ---- Core Imports ----
import React, { useState } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZAvatar,
  ZBox,
  ZCallout,
  ZCard,
  ZRUColorE,
  ZRUOrientationE,
  ZRURadiusE,
  ZRUTextAsE,
  ZSeparator,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import CreditScore from "../CreditScore";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZAvatarLgImage } from "@/assets";
import OfferModal from "../OfferModal";

// #endregion

// #region ---- Types Imports ----
interface OtherUserInfoCardProps {
  scorePercentage?: number;
}

// #endregion

const OtherUserInfoCard: React.FC<OtherUserInfoCardProps> = ({
  scorePercentage,
}) => {
  const [compState, setCompState] = useState<{
    offerModal: {
      open: boolean;
    };
  }>({
    offerModal: {
      open: false,
    },
  });

  return (
    <>
      <ZCard
        className="w-56 p-0 cursor-pointer min900px:w-max md:w-80"
        onClick={() => {
          setCompState((prev) => ({
            ...prev,
            offerModal: {
              open: true,
            },
          }));
        }}
      >
        <ZBox className="relative">
          <ZAvatar
            className="w-full h-full"
            fallback={<img src={ZAvatarLgImage} className="w-full h-full" />}
            radius={ZRURadiusE.none}
          />
          <ZBox className="absolute bottom-3 right-3 w-max">
            <ZAvatar
              size="6"
              className="text-center"
              fallback={<ZText className="normal-case">Offer me</ZText>}
              color={ZRUColorE.indigo}
            />
          </ZBox>
        </ZBox>
        <ZCallout
          showIcon={false}
          className="flex w-full *:w-full py-1 px-2 rounded-none"
          color={ZRUColorE.jade}
          content={
            <ZBox className="md:*:text-base text-xs flex items-center justify-between w-full">
              <ZText as={ZRUTextAsE.div} color={ZRUColorE.lime}>
                Gigi
              </ZText>
              <ZSeparator
                orientation={ZRUOrientationE.vertical}
                color={ZRUColorE.lime}
              />
              <ZText as={ZRUTextAsE.div} color={ZRUColorE.lime}>
                Female
              </ZText>
              <ZSeparator
                orientation={ZRUOrientationE.vertical}
                color={ZRUColorE.lime}
              />
              <ZText as={ZRUTextAsE.div} color={ZRUColorE.lime}>
                Student
              </ZText>
              <ZSeparator
                orientation={ZRUOrientationE.vertical}
                color={ZRUColorE.lime}
              />
              <ZText as={ZRUTextAsE.div} color={ZRUColorE.lime}>
                700-1200
              </ZText>
            </ZBox>
          }
        />
        <ZBox className="px-3 py-2 mt-3 mb-2 md:mt-5">
          <ZText className="block">Credit</ZText>
          <CreditScore scorePercentage={scorePercentage} />
        </ZBox>
      </ZCard>

      <OfferModal
        open={compState?.offerModal.open}
        closeModal={() =>
          setCompState((prev) => ({
            ...prev,
            offerModal: {
              open: false,
            },
          }))
        }
      />
    </>
  );
};

export default OtherUserInfoCard;
