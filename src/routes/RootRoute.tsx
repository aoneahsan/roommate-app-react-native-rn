import NotFound404Page from "@/pages/common/404";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { ZGlobalComponents } from "zaions-react-ui-kit";

// Radix UI
import { Theme } from "@radix-ui/themes";

// eslint-disable-next-line react-refresh/only-export-components
const ZaionsTSRAppRoot: React.FC = () => {
  //
  return (
    <>
      <Theme>
        <Outlet />
        <ZGlobalComponents />
        <ToastContainer />
      </Theme>

      {/* React Query Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

const tanstackRootRoute = createRootRoute({
  component: ZaionsTSRAppRoot,
  notFoundComponent: () => {
    return (
      <Suspense fallback={<h1>Loading tanstackRootRoute</h1>}>
        <NotFound404Page />
      </Suspense>
    );
  },
});

export default tanstackRootRoute;
