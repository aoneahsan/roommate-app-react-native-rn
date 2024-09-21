// #region ---- Core Imports ----
import NotificationItem from "@/components/private/NotificationItem";
import ZSearch from "@/components/private/Search";
import React from "react";
import { ZBox, ZFlex, ZRUAlignE, ZRUJustifyE } from "zaions-react-ui-kit";

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
        <NotificationItem
          fallback="F"
          text="Name here"
          description="it’s nice meeting you.you are awesome you are"
          date="June 21, 11:34 am"
        />
      </ZBox>
    </>
  );
};

export default Messages;
