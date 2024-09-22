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
import type { Responsive } from "@radix-ui/themes/dist/cjs/props";
interface INotificationItem {
  fallback: string;
  text: string;
  textClassName?: string;
  description?: string;
  descriptionClassName?: string;
  date?: string;
  dateClassName?: string;
  src?: string;
  showSeparator?: boolean;
  className?: string;
  showAvatarPointer?: boolean;
  avatarPointerText?: string;
  avatarPointerClassName?: string;
  size?: Responsive<"1" | "4" | "2" | "3" | "5" | "6" | "7" | "8" | "9">;
  onClick?: () => void;
}
// #endregion

const NotificationItem: React.FC<INotificationItem> = ({
  fallback,
  text,
  textClassName,
  description,
  descriptionClassName,
  date,
  dateClassName,
  src,
  showSeparator = true,
  showAvatarPointer = false,
  avatarPointerText,
  className,
  avatarPointerClassName,
  size = "4",
  onClick,
}) => {
  return (
    <>
      <ZFlex
        align={ZRUAlignE.center}
        className={ZClassNames("cursor-pointer select-none gap-x-3", className)}
        onClick={onClick}
      >
        <ZBox className="relative">
          <ZAvatar size={size} fallback={fallback} src={src} />
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
        <ZBox className="flex-1">
          <ZFlex
            gap="3"
            align={ZRUAlignE.start}
            justify={ZRUJustifyE.between}
            className="flex-1"
          >
            <ZBox>
              <ZText
                as={ZRUTextAsE.div}
                size="2"
                className={ZClassNames("font-bold", textClassName)}
              >
                {text}
              </ZText>
            </ZBox>

            <ZBox className="w-max" show={isZNonEmptyString(date)}>
              <ZText
                color={ZRUColorE.gray}
                className={ZClassNames(dateClassName)}
              >
                {date}
              </ZText>
            </ZBox>
          </ZFlex>
          <ZText
            as={ZRUTextAsE.div}
            size="2"
            color={ZRUColorE.gray}
            className={ZClassNames(
              "max-w-[90%] line-clamp-1 text-ellipsis",
              descriptionClassName
            )}
            show={isZNonEmptyString(description)}
          >
            {description}
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
