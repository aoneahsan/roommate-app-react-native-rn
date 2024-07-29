// #region ---- Core Imports ----
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { ZBox, ZText } from "zaions-react-ui-kit";
import { AppRoutes } from "@/routes/appRoutes";
import { useMatchRoute, useNavigate } from "@tanstack/react-router";
import { ZClassNames } from "zaions-react-tool-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZGamepadOutlineIcon, ZPresentationChartOutlineIcon } from "@/assets";

// #endregion

const ZPrivSidebarContent: React.FC = () => {
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();

  const items = useMemo(
    () => [
      {
        title: "Dashboard",
        icon: <ZPresentationChartOutlineIcon className="w-7 h-7" />,
        routes: [AppRoutes.appSub.dashboard.completePath],
        mainRoute: AppRoutes.appSub.dashboard.completePath,
      },

      {
        title: "Games",
        icon: <ZGamepadOutlineIcon className="w-7 h-7" />,
        routes: [AppRoutes.appSub.games.completePath],
        mainRoute: AppRoutes.appSub.games.completePath,
      },
    ],
    []
  );
  return (
    <ZBox className="flex flex-col w-full gap-1 p-2 text-base font-normal gap-y-3">
      {items?.map((item, index) => {
        const isAnyRouteActive = item?.routes?.some((route) =>
          matchRoute({
            to: route,
          })
        );
        return (
          <ZBox
            key={index}
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
            <ZBox className="grid mr-4 place-items-center">{item.icon}</ZBox>
            <ZText>{item?.title}</ZText>
          </ZBox>
        );
      })}
    </ZBox>
  );
};

export default ZPrivSidebarContent;
