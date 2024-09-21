// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import { useZMediaQueryScale } from "zaions-react-tool-kit";
import {
  ZAvatar,
  ZButton,
  ZCard,
  ZFlex,
  ZRUAlignE,
  ZRUColorE,
  ZRUJustifyE,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
interface IInvitationItem {
  text: string;
  fallback: string;
  src?: string;
  showAcceptBtn?: boolean;
  acceptBtnText?: string;
  accepted?: boolean;
  acceptBtnOnClick?: React.MouseEventHandler<HTMLButtonElement>;
}
// #endregion

const InvitationItem: React.FC<IInvitationItem> = ({
  text,
  fallback,
  acceptBtnText = "Accept",
  accepted = false,
  showAcceptBtn = true,
  src,
  acceptBtnOnClick,
}) => {
  const { isSmScale } = useZMediaQueryScale();
  return (
    <ZCard className="2xl:min-w-70 min1336px:w-80 min768px:w-[49%] w-full">
      <ZFlex
        align={ZRUAlignE.center}
        justify={ZRUJustifyE.between}
        className="gap-2 min768px:gap-3"
      >
        <ZFlex align={ZRUAlignE.center} className="gap-2 min768px:gap-3">
          <ZAvatar fallback={fallback} src={src} />
          <ZText className="max768px:text-sm max-w-[90%] line-clamp-1 text-ellipsis">
            {text}
          </ZText>
        </ZFlex>

        <ZButton
          size={isSmScale ? "2" : "1"}
          show={!accepted && showAcceptBtn}
          onClick={acceptBtnOnClick}
        >
          {acceptBtnText}
        </ZButton>

        <ZText show={accepted} className="text-sm" color={ZRUColorE.teal}>
          Accepted
        </ZText>
      </ZFlex>
    </ZCard>
  );
};

export default InvitationItem;
