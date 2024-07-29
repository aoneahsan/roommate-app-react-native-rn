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
            <aside className="h-full text-sm justify-between flex flex-col border-e shadow-sm xl:min-w-80 min-w-48 xl:p-3.5 ">
              <ZPrivSidebarContent />
            </aside>
          ) : null}

          <ZBox className="w-full h-full px-2 py-4 xl:px-5">
            <ZScrollArea scrollbars={ZRUScrollbarsE.vertical}>
              <Outlet />
            </ZScrollArea>
          </ZBox>
        </ZBox>
      </ZPage>
    </>
  );
};

export default Layout;
