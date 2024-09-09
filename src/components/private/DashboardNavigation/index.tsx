// #region ---- Core Imports ----
import React, { useCallback } from "react";

// #endregion

// #region ---- Packages Imports ----
import { useZMediaQueryScale } from "zaions-react-tool-kit";
import {
  useZSideBar,
  ZBox,
  ZFlex,
  ZHeading,
  ZRUAlignE,
  ZRUHeadingAsE,
  ZRUJustifyE,
  ZUserAvatar,
} from "zaions-react-ui-kit";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isZNonEmptyString } from "zaions-tool-kit";

// #endregion

// #region ---- Custom Imports ----
import ZPrivSidebarContent from "../ZSidebarContent";
import constants from "@/utils/constants";
import { getFrbAuthInstance } from "@/firebaseInstance";
import { userDataRStateAtom } from "@/state/user";
import { useNavigate } from "@tanstack/react-router";
import { AppRoutes } from "@/routes/appRoutes";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZMenuIcon } from "@/assets";

// #endregion

const frbAuth = getFrbAuthInstance();

const ZPrivNavigation: React.FC = () => {
  const { openSidebar } = useZSideBar({
    component: ZPrivSidebarContent,
    containerClassName: "pe-6",
  });

  const navigate = useNavigate();

  const userDataRState = useRecoilValue(userDataRStateAtom);
  const setUserDataRState = useSetRecoilState(userDataRStateAtom);

  const signOut = useCallback(async () => {
    try {
      if (userDataRState && isZNonEmptyString(userDataRState?.email)) {
        await frbAuth.signOut();

        setUserDataRState(() => ({}));

        await navigate({
          to: AppRoutes.rootRoute,
        });
      }
    } catch (error) {}
  }, []);

  const { is900pxScale } = useZMediaQueryScale();
  return (
    <ZBox className="flex items-center h-[3.3125rem] justify-between w-full px-5 border-b shadow-sm">
      <ZFlex align={ZRUAlignE.center} className="max900px:gap-5">
        {!is900pxScale ? (
          <ZMenuIcon
            className="cursor-pointer"
            onClick={() => {
              openSidebar();
            }}
          />
        ) : null}
        <ZHeading
          as={ZRUHeadingAsE.h1}
          className="text-lg sm:text-xl text-body md:text-2xl"
        >
          {constants.productInfo.name}
        </ZHeading>
      </ZFlex>

      <ZFlex align={ZRUAlignE.center} justify={ZRUJustifyE.end}>
        <ZUserAvatar
          fallback={userDataRState?.name?.slice(0, 1) ?? ""}
          text={userDataRState?.name}
          logoutBtnClickHandler={signOut}
        />
      </ZFlex>
    </ZBox>
  );
};

export default ZPrivNavigation;
