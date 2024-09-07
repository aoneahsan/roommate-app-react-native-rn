// #region ---- Core Imports ----
import ZSearch from "@/components/private/Search";
import React from "react";
import {
  ZAvatar,
  ZBox,
  ZFlex,
  ZRUAlignE,
  ZRUColorE,
  ZRUDirectionE,
  ZRUJustifyE,
  ZRUTextAsE,
  ZSeparator,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const Messages: React.FC = () => {
  return (
    <>
      <ZBox className="md:px-2 md:py-2">
        <ZFlex
          align={ZRUAlignE.center}
          justify={ZRUJustifyE.between}
          className="maxSm:flex-col maxSm:gap-3 maxSm:*:w-full"
        >
          <ZFlex className="gap-3 sm:gap-2 maxSm:flex-col">
            <ZSearch />
          </ZFlex>
        </ZFlex>
      </ZBox>

      <ZBox className="mt-6 space-y-3">
        <ZFlex
          justify={ZRUJustifyE.between}
          align={ZRUAlignE.center}
          className="cursor-pointer select-none gap-x-3"
        >
          <ZFlex gap="3" align={ZRUAlignE.center}>
            <ZAvatar
              size="3"
              // src={allPeople[6].image}
              fallback={"F"}
            />
            <ZBox>
              <ZText as={ZRUTextAsE.div} size="2" className="font-bold">
                Name
              </ZText>
              <ZText
                as={ZRUTextAsE.div}
                size="2"
                color={ZRUColorE.gray}
                className="max-w-[34rem] line-clamp-1 text-ellipsis"
              >
                it’s nice meeting you.you are awesome you are
              </ZText>
            </ZBox>
          </ZFlex>

          <ZBox className="w-max">
            <ZText size="2" color={ZRUColorE.gray}>
              June 21, 11:34 am
            </ZText>
          </ZBox>
        </ZFlex>
        <ZBox>
          <ZSeparator size="4" />
        </ZBox>
      </ZBox>
    </>
  );
};

export default Messages;
