// #region Packages imports
import {
  lazyRouteComponent,
  redirect,
  createRoute,
} from "@tanstack/react-router";
// #endregion

// #region Custom imports
import tanstackRootRoute from "./RootRoute";
import { AppRoutes } from "@/routes/appRoutes";
import { getFrbAuthInstance } from "@/firebaseInstance";
import { isZNonEmptyString } from "zaions-tool-kit";
// #endregion

const frbAuth = getFrbAuthInstance();

// on window refresh
const privateRouteHandler = async () => {
  const user = frbAuth.currentUser;
  const token = await user?.getIdToken();
  if (
    user &&
    isZNonEmptyString(user?.email) &&
    isZNonEmptyString(user?.uid) &&
    isZNonEmptyString(token)
  ) {
    return null;
  }

  throw redirect({
    to: AppRoutes.login,
  });
};

const publicRouteHandler = () => {};

// #region  ----- Public routes -----
// --- Home
export const homeRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.rootRoute,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/public/Home")
  ),
});

// --- Login
export const loginRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.login,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/auth/Login")
  ),
  beforeLoad: publicRouteHandler,
});

// --- Register
export const registerRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.register,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/auth/Register")
  ),
  beforeLoad: publicRouteHandler,
});

// --- App
export const appRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.app,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/Layout")
  ),
  beforeLoad: privateRouteHandler,
});

// --- Dashboard
export const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: AppRoutes.appSub.dashboard.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/Dashboard")
  ),
});

// --- Games
export const gamesRoute = createRoute({
  getParentRoute: () => appRoute,
  path: AppRoutes.appSub.games.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/Games")
  ),
});

export const appRouteTree = appRoute.addChildren([dashboardRoute, gamesRoute]);

// Reset password
// export const forgotRoute = createRoute({
//   getParentRoute: () => tanstackRootRoute,
//   path: AppRoutes.,
//   component: lazyRouteComponent(
//     async (): Promise<Record<string, unknown>> =>
//       await import("@/pages/auth/ResetPassword")
//   ),
//   beforeLoad: publicRouteHandler,
// });

// #endregion

// #region  ----- Private routes -----
export const ProfileRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.profile,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/Profile")
  ),
});

export const RoomPreferenceRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.roomPreference,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/RoomPreference")
  ),
});

export const HobbiesRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.hobbies,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/Hobbies")
  ),
});

export const MyLifeStyleRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.myLifeStyle,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/MyLifeStyle")
  ),
});

export const RoommatesPreferenceRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.roommatesPreference,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/RoommatesPreference")
  ),
});
// #endregion
