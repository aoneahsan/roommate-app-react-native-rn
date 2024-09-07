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
  // beforeLoad: privateRouteHandler,
});

// --- Dashboard
export const placesListRoute = createRoute({
  getParentRoute: () => appRoute,
  path: AppRoutes.appSub.placesList.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/PlacesList")
  ),
});

export const usersRoute = createRoute({
  getParentRoute: () => appRoute,
  path: AppRoutes.appSub.users.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/Users")
  ),
});

export const messagesRoute = createRoute({
  getParentRoute: () => appRoute,
  path: AppRoutes.appSub.messages.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/Messages")
  ),
});

export const appRouteTree = appRoute.addChildren([
  placesListRoute,
  usersRoute,
  messagesRoute,
]);

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
export const profileRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.profile,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/Profile")
  ),
});

export const iWantToRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.iWantTo,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/IWantTo")
  ),
});

export const roomPreferenceRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.roomPreference,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/findRoommates/RoomPreference")
  ),
});

export const hobbiesRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.hobbies,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/findRoommates/Hobbies")
  ),
});

export const myLifeStyleRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.myLifeStyle,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/findRoommates/MyLifeStyle")
  ),
});

export const roommatesPreferenceRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.roommatesPreference,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/findRoommates/RoommatesPreference")
  ),
});

export const creditRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.credit,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/findRoommates/Credit")
  ),
});

// posting List
export const plStepOne = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.postingListSub.stepOne,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/postNewPlace/PostingList/StepOne")
  ),
});

export const plStepTwo = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.postingListSub.stepTwo,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/postNewPlace/PostingList/StepTwo")
  ),
});

export const plStepThree = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.postingListSub.stepThree,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/postNewPlace/PostingList/StepThree")
  ),
});

export const plStepFour = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.postingListSub.stepFour,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/postNewPlace/PostingList/StepFour")
  ),
});

export const plStepFive = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.postingListSub.stepFive,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/postNewPlace/PostingList/StepFive")
  ),
});

export const selectLocationRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.postingListSub.selectLocation,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import("@/pages/private/postNewPlace/SelectLocation")
  ),
});
// #endregion
