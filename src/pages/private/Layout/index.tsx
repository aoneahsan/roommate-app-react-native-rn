// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import { ZBox, ZPage, ZRUScrollbarsE, ZScrollArea } from "zaions-react-ui-kit";
import { Outlet } from "@tanstack/react-router";
import { useZMediaQueryScale } from "zaions-react-tool-kit";

// #endregion

// #region ---- Custom Imports ----
import ZPrivNavigation from "@/components/private/DashboardNavigation";
import ZPrivSidebarContent from "@/components/private/ZSidebarContent";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const Layout: React.FC = () => {
  const { is900pxScale } = useZMediaQueryScale();
  return (
    <>
      <ZPage>
        <ZPrivNavigation />
        <ZBox className="flex w-full h-[calc(100vh-3.3125rem)]">
          {is900pxScale ? (
            <ZBox className="h-full text-sm justify-between flex flex-col border-e shadow-sm 2xl:min-w-80 min-w-48 2xl:p-3.5">
              <ZPrivSidebarContent />
            </ZBox>
          ) : null}

          <ZBox className="flex-1 h-full px-2 py-4 overflow-x-hidden overflow-y-auto 2xl:px-5 z_pretty_scrollbar">
            <Outlet />
          </ZBox>
        </ZBox>
      </ZPage>
    </>
  );
};

export default Layout;
