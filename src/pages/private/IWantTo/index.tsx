// #region ---- Core Imports ----
import { ZPeopleSearchSvg, ZPlaceSvg } from "@/assets";
import { AppRoutes } from "@/routes/appRoutes";
import { useNavigate } from "@tanstack/react-router";
import React, { useCallback } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBox,
  ZCard,
  ZFlex,
  ZHeading,
  ZPage,
  ZRUColorE,
  ZRUHeadingAsE,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const IWantTo: React.FC = () => {
  const navigate = useNavigate();

  const postPlace = useCallback(() => {
    navigate({
      to: AppRoutes.postingListSub.stepOne,
    });
  }, []);

  const findRoommates = useCallback(() => {
    navigate({
      to: AppRoutes.roomPreference,
    });
  }, []);

  return (
    <ZPage>
      <ZFlex className="items-start justify-center w-full h-screen">
        <ZBox className="mx-4 md:mt-24 maxMd:my-6 space-y-9 maxMd:w-full">
          <ZCard className="p-4 space-y-5 sm:p-6 md:p-9 md:space-y-9">
            <ZHeading
              className="text-4xl font-normal tracking-wide maxMd:text-center md:text-5xl"
              color={ZRUColorE.indigo}
            >
              I Want To...
            </ZHeading>

            <ZFlex className="items-stretch gap-8 *:flex-1 maxMd:flex-col">
              <ZCard
                size="3"
                className="flex flex-col items-center justify-between space-y-4 text-center cursor-pointer"
                onClick={postPlace}
              >
                <ZPlaceSvg className="h-20 md:h-32 sm:h-28 w-max" />
                <ZHeading
                  as={ZRUHeadingAsE.h3}
                  className="text-xl font-normal tracking-wide"
                >
                  Post a New Place
                </ZHeading>
              </ZCard>
              <ZCard
                size="3"
                className="flex flex-col items-center justify-between space-y-4 text-center cursor-pointer"
                onClick={findRoommates}
              >
                <ZPeopleSearchSvg className="h-20 md:h-32 sm:h-28 w-max" />
                <ZHeading
                  as={ZRUHeadingAsE.h3}
                  className="text-xl font-normal tracking-wide"
                >
                  Find Roommates
                </ZHeading>
              </ZCard>
            </ZFlex>
          </ZCard>
        </ZBox>
      </ZFlex>
    </ZPage>
  );
};

export default IWantTo;
