// #region ---- Core Imports ----
import NotificationItem from "@/components/private/NotificationItem";
import ZSearch from "@/components/private/Search";
import { AppRoutes } from "@/routes/appRoutes";
import { useNavigate } from "@tanstack/react-router";
import React, { useCallback } from "react";
import { useZMediaQueryScale } from "zaions-react-tool-kit";
import {
  ZBox,
  ZCard,
  ZFlex,
  ZRUAlignE,
  ZRUJustifyE,
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
  const navigate = useNavigate();
  const { isSmScale } = useZMediaQueryScale();

  const gotoChat = useCallback(() => {
    navigate({
      to: AppRoutes.appSub.chat.completePath,
    });
  }, []);

  return (
    <ZFlex className="flex-col h-full overflow-hidden">
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

      <ZBox className="flex-grow mt-6">
        <ZCard className="w-full h-full space-y-3">
          <NotificationItem
            fallback="F"
            text="Name here"
            onClick={() => gotoChat()}
            description="it’s nice meeting you.you are awesome you are Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Accusantium expedita quo mollitia veritatis temporibus
              voluptatum tempore nam fugiat libero ipsum? Inventore impedit
              temporibus nesciunt eaque fuga provident consequatur assumenda
              quas!"
            date="June 21, 11:34 am"
            textClassName="maxSm:text-sm"
            descriptionClassName="maxSm:text-sm"
            dateClassName="maxSm:text-xs"
            size={isSmScale ? "4" : "3"}
          />
        </ZCard>
      </ZBox>
    </ZFlex>
  );
};

export default Messages;
