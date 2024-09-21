// #region ---- Core Imports ----
import React from "react";
import { ZClassNames } from "zaions-react-tool-kit";

// #endregion

// #region ---- Packages Imports ----
import {
  ZAvatar,
  ZBox,
  ZFlex,
  ZRUAlignE,
  ZRUColorE,
  ZRUJustifyE,
  ZRUTextAsE,
  ZSeparator,
  ZText,
} from "zaions-react-ui-kit";
import { isZNonEmptyString } from "zaions-tool-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
interface INotificationItem {
  fallback: string;
  text: string;
  description?: string;
  date?: string;
  src?: string;
  showSeparator?: boolean;
  className?: string;
  showAvatarPointer?: boolean;
  avatarPointerText?: string;
  avatarPointerClassName?: string;
  onClick?: () => void;
}
// #endregion

const NotificationItem: React.FC<INotificationItem> = ({
  fallback,
  text,
  description,
  date,
  src,
  showSeparator = true,
  showAvatarPointer = false,
  avatarPointerText,
  className,
  avatarPointerClassName,
  onClick,
}) => {
  return (
    <>
      <ZFlex
        justify={ZRUJustifyE.between}
        align={ZRUAlignE.center}
        className={ZClassNames("cursor-pointer select-none gap-x-3", className)}
        onClick={onClick}
      >
        <ZFlex gap="3" align={ZRUAlignE.center}>
          <ZBox className="relative">
            <ZAvatar size="4" fallback={fallback} src={src} />
            <ZBox
              show={showAvatarPointer}
              className={ZClassNames(
                "flex items-center font-medium absolute -right-1 top-0 justify-center w-5 h-5 text-[9px] rounded-full bg-gold11",
                avatarPointerClassName
              )}
            >
              {avatarPointerText}
            </ZBox>
          </ZBox>
          <ZBox>
            <ZText as={ZRUTextAsE.div} size="2" className="font-bold">
              {text}
            </ZText>
            <ZText
              as={ZRUTextAsE.div}
              size="2"
              color={ZRUColorE.gray}
              className="max-w-[34rem] line-clamp-1 text-ellipsis"
              show={isZNonEmptyString(description)}
            >
              {description}
            </ZText>
          </ZBox>
        </ZFlex>

        <ZBox className="w-max" show={isZNonEmptyString(date)}>
          <ZText size="2" color={ZRUColorE.gray}>
            {date}
          </ZText>
        </ZBox>
      </ZFlex>
      {showSeparator ? (
        <ZBox>
          <ZSeparator size="4" />
        </ZBox>
      ) : null}
    </>
  );
};

export default NotificationItem;
