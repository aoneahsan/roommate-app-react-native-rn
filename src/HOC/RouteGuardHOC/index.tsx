import { userIsAuthenticatedRStateSelector } from "@/state/user";
import React, { ReactNode } from "react";
import { useRecoilValue } from "recoil";
// import { Navigate } from "react-router-dom";
import { AppRoutes } from "@/routes/appRoutes";

const RouteGuardHOC: React.FC<{
  children: ReactNode;
  isAuthenticatedView: boolean;
}> = ({ children, isAuthenticatedView }) => {
  const userIsAuthenticatedRState = useRecoilValue(
    userIsAuthenticatedRStateSelector
  );

  if (userIsAuthenticatedRState) {
    if (isAuthenticatedView) {
      return children;
    } else {
      // return <Navigate to={AppRoutes.home} />;
    }
  } else {
    if (isAuthenticatedView) {
      // return <Navigate to={AppRoutes.login} />;
    } else {
      return children;
    }
  }
};
export default RouteGuardHOC;
