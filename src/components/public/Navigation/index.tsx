// #region ---- Core Imports ----
import React, { useCallback } from "react";

// #endregion

// #region ---- Packages Imports ----
import { useNavigate } from "@tanstack/react-router";
import {
  ZBox,
  ZButton,
  ZFlex,
  ZRUAlignE,
  ZRUJustifyE,
  ZText,
} from "zaions-react-ui-kit";
import { useRecoilValue } from "recoil";

// #endregion

// #region ---- Custom Imports ----
import { AppRoutes } from "@/routes/appRoutes";
import { ZIsUserLoggedIn } from "@/state/user";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ZPubNavigation: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(ZIsUserLoggedIn);

  const homeRouteRedirect = useCallback(() => {
    navigate({
      to: AppRoutes.rootRoute,
    });
  }, []);

  const registerBtnHandler = useCallback(() => {
    navigate({
      to: AppRoutes.register,
    });
  }, []);

  const appBtnHandler = useCallback(() => {
    navigate({
      to: AppRoutes.app,
    });
  }, []);

  const loginBtnHandler = useCallback(() => {
    navigate({
      to: AppRoutes.login,
    });
  }, []);

  return (
    <ZFlex
      justify={ZRUJustifyE.between}
      align={ZRUAlignE.center}
      className="px-4 py-3 shadow-md bg-light/20"
    >
      <ZBox>
        <ZText onClick={homeRouteRedirect} className="cursor-pointer">
          Home
        </ZText>
      </ZBox>
      <ZFlex
        justify={ZRUJustifyE.end}
        align={ZRUAlignE.center}
        className="gap-3"
      >
        {isLoggedIn ? (
          <ZButton onClick={appBtnHandler}>App</ZButton>
        ) : (
          <>
            <ZButton onClick={loginBtnHandler}>Login</ZButton>
            <ZButton onClick={registerBtnHandler}>Register</ZButton>
          </>
        )}
      </ZFlex>
    </ZFlex>
  );
};

export default ZPubNavigation;
