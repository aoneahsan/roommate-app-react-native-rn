// #region ---- Core Imports ----
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { useMatchRoute, useNavigate } from "@tanstack/react-router";
import { useRecoilValue } from "recoil";
import { useZMediaQueryScale, ZClassNames } from "zaions-react-tool-kit";
import {
  ZBox,
  ZFlex,
  ZRUJustifyE,
  ZSkeleton,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import { AppRoutes } from "@/routes/appRoutes";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----
import { appFeaturesVisibilityRStateAtom } from "@/state/appFeatures";
import { ZShowAppLoaderRStateAtom } from "@/state/globalComponents";

// #endregion

// #region ---- Images Imports ----
import {
  ZCloseIcon,
  ZHomeOutlineIcon,
  ZMessageOutlineIcon,
  ZUserOutlineIcon,
  ZUserPlusOutlineIcon,
} from "@/assets";

// #endregion

const ZPrivSidebarContent: React.FC<{ closeSidebar?: () => void }> = ({
  closeSidebar,
}) => {
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const { is900pxScale } = useZMediaQueryScale();
  const ZShowAppLoaderRState = useRecoilValue(ZShowAppLoaderRStateAtom);
  const appFeaturesVisibility = useRecoilValue(appFeaturesVisibilityRStateAtom);

  const items = useMemo(
    () => [
      {
        title: "Places list",
        icon: <ZHomeOutlineIcon className="w-6 h-6" />,
        routes: [AppRoutes.appSub.placesList.completePath],
        mainRoute: AppRoutes.appSub.placesList.completePath,
        isVisible: true,
      },
      {
        title: "Users",
        icon: <ZUserPlusOutlineIcon className="w-6 h-6" />,
        routes: [AppRoutes.appSub.users.completePath],
        mainRoute: AppRoutes.appSub.users.completePath,
        isVisible: true,
      },
      {
        title: "Messages",
        icon: <ZMessageOutlineIcon className="w-6 h-6" />,
        routes: [AppRoutes.appSub.messages.completePath],
        mainRoute: AppRoutes.appSub.messages.completePath,
        isVisible: true,
      },
      {
        title: "Inbox & Notifications",
        icon: <ZMessageOutlineIcon className="w-6 h-6" />,
        routes: [AppRoutes.appSub.inboxNotifications.completePath],
        mainRoute: AppRoutes.appSub.inboxNotifications.completePath,
        isVisible: true,
      },
      {
        title: "Profile",
        icon: <ZUserOutlineIcon className="w-6 h-6" />,
        routes: [AppRoutes.appSub.profile.completePath],
        mainRoute: AppRoutes.appSub.profile.completePath,
        isVisible: true,
      },
    ],
    [appFeaturesVisibility]
  );

  return (
    <>
      {!is900pxScale ? (
        <ZFlex justify={ZRUJustifyE.end} className="mb-3">
          <ZCloseIcon className="w-7 h-7" onClick={closeSidebar} />
        </ZFlex>
      ) : null}
      <ZBox className="flex flex-col w-full gap-1 text-base font-normal md:p-2 gap-y-3">
        {ZShowAppLoaderRState
          ? [...Array(7)].map((_, index) => (
              <ZSkeleton key={index} loading>
                <ZBox className="w-full px-3 py-5 rounded-full" />
              </ZSkeleton>
            ))
          : items?.map((item, index) => {
              const isAnyRouteActive = item?.routes?.some((route) =>
                matchRoute({
                  to: route,
                })
              );
              return item?.isVisible ? (
                <ZBox
                  key={index}
                  permissions={item?.permissions ?? []}
                  roles={item?.role ?? []}
                  className={ZClassNames(
                    "flex items-center w-full px-3 py-2 font-medium leading-tight transition-all rounded-full outline-none cursor-pointer text-start hover:bg-indigoDarkA4 hover:bg-opacity-80",
                    {
                      "bg-indigoDarkA4": isAnyRouteActive,
                    }
                  )}
                  onClick={() => {
                    navigate({
                      to: item?.mainRoute,
                    });
                  }}
                >
                  <ZBox className="grid mr-4 place-items-center">
                    {item.icon}
                  </ZBox>
                  <ZText>{item?.title}</ZText>
                </ZBox>
              ) : null;
            })}
      </ZBox>
    </>
  );
};

export default ZPrivSidebarContent;
