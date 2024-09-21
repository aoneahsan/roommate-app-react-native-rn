// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBox,
  ZFlex,
  ZHeading,
  ZRUAlignE,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUJustifyE,
  ZRUOrientationE,
  ZSegmentedControl,
  ZSegmentedControlItem,
  ZSeparator,
  ZText,
} from "zaions-react-ui-kit";
import InvitationItem from "../../../components/private/InvitationItem";

// #endregion

// #region ---- Custom Imports ----
import NotificationItem from "@/components/private/NotificationItem";
import ZSearch from "@/components/private/Search";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const InboxNotifications: React.FC = () => {
  return (
    <>
      <ZBox className="space-y-5 md:px-2 md:py-2">
        <ZSegmentedControl className="w-full">
          <ZSegmentedControlItem value="message" className="maxSm:*:px-0">
            <ZText
              className="text-base tracking-wide maxSm:text-xs"
              color={ZRUColorE.sky}
            >
              Message
            </ZText>
          </ZSegmentedControlItem>
          <ZSegmentedControlItem value="notification" className="maxSm:*:px-0">
            <ZText
              className="text-base tracking-wide maxSm:text-xs"
              color={ZRUColorE.sky}
            >
              Notification
            </ZText>
          </ZSegmentedControlItem>
        </ZSegmentedControl>

        <ZFlex
          align={ZRUAlignE.center}
          justify={ZRUJustifyE.between}
          className="maxSm:flex-col maxSm:gap-3 maxSm:*:w-full"
        >
          <ZFlex className="gap-3 sm:gap-2 maxSm:flex-col">
            <ZSearch />
          </ZFlex>
        </ZFlex>

        <ZBox>
          <ZHeading
            as={ZRUHeadingAsE.h2}
            className="text-2xl font-medium tracking-wide maxSm:text-center"
            color={ZRUColorE.cyan}
          >
            Team
          </ZHeading>

          <ZFlex
            align={ZRUAlignE.center}
            className="flex-wrap justify-between mt-3 min1336px:gap-5 min1336px:justify-stretch gap-y-5 max768px:flex-col"
          >
            {[...Array(4)]?.map((el) => (
              <InvitationItem fallback="T" text="Peak Performers" key={el} />
            ))}
          </ZFlex>
        </ZBox>

        <ZSeparator
          className="w-full"
          orientation={ZRUOrientationE.horizontal}
        />

        <ZBox>
          <ZHeading
            as={ZRUHeadingAsE.h2}
            className="text-2xl font-medium tracking-wide maxSm:text-center"
            color={ZRUColorE.cyan}
          >
            My Offer
          </ZHeading>

          <ZBox className="mt-3 space-y-3">
            <NotificationItem
              fallback="F"
              text="Name here"
              description="it’s nice meeting you.you are awesome you are"
              date="June 21, 11:34 am"
              showSeparator={false}
            />
          </ZBox>
        </ZBox>

        <ZSeparator
          className="w-full"
          orientation={ZRUOrientationE.horizontal}
        />

        <ZBox>
          <ZHeading
            as={ZRUHeadingAsE.h2}
            className="text-2xl font-medium tracking-wide maxSm:text-center"
            color={ZRUColorE.cyan}
          >
            People
          </ZHeading>

          <ZFlex
            align={ZRUAlignE.center}
            className="flex-wrap justify-between mt-3 min1336px:gap-5 min1336px:justify-stretch gap-y-5 max768px:flex-col"
          >
            {[...Array(4)]?.map((el) => (
              <InvitationItem fallback="T" text="Name here" key={el} />
            ))}
          </ZFlex>
        </ZBox>
      </ZBox>
    </>
  );
};

export default InboxNotifications;
