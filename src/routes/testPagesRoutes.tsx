import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import tanstackRootRoute from "./RootRoute";
import { AppRoutes } from "./appRoutes";

const testPagesRootRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.testPages,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/TestPages")
  ),
});

const firebaseTestPageRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.testPagesSub.firebaseTesting,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/TestPages/FirebaseTestPage")
  ),
});

const testPagesRootRouteTree = testPagesRootRoute.addChildren([
  firebaseTestPageRoute,
]);

export default testPagesRootRouteTree;
