// import FullPageLoader from "@/components/FullPageLoader";
// import { userDataRStateAtom } from "@/state/userState";
// import {
//   getAuthDataFromLocalStorage,
//   IApiResponse,
//   IUser,
// } from "zaions-react-tool-kit";
// import React, { ReactNode, useEffect, useState } from "react";
// import { useSetRecoilState } from "recoil";
// import apiRoutes from "@/utils/constants/apiRoutes";
// import { AppRoutes } from "@/routes/appRoutes";
// import { useGetRequest, usePostRequest } from "@/hooks/reactQuery";
// import ErrorBoundary from "@/components/errors/ErrorBoundary";
// import { MESSAGES } from "@/utils/messages";
// import { useLocation } from "react-router";
// import { ReactQueryKeyEnum } from "@/enums/reactQuery";
// import { reactQueryKeys } from "@/utils/constants/reactQuery";

// const AuthenticationHOC: React.FC<{
//   children: ReactNode;
// }> = ({ children }) => {
//   const [compState, setCompState] = useState<{ processing: boolean }>({
//     processing: true,
//   });
//   const setUserDataRState = useSetRecoilState(userDataRStateAtom);
//   const { mutateAsync: updateUserStatus } = usePostRequest(
//     reactQueryKeys.mutation.updateUserStatus
//   );
//   const {
//     data: response,
//     isFetching,
//     isError,
//   } = useGetRequest({
//     url: apiRoutes.getUserData,
//     queryKey: ReactQueryKeyEnum.getUserData,
//   });
//   // const navigate = useNavigate();
//   const location = useLocation();
//   // const rootRouteMatched = matchRoutes(
//   //   [{ path: AppRoutes.rootRoute }],
//   //   location
//   // );
//   // const isRootRoute = rootRouteMatched && rootRouteMatched?.length > 0;
//   const isRootRoute = false;

//   useEffect(() => {
//     try {
//       (async () => {
//         const _authData = await getAuthDataFromLocalStorage();

//         if (_authData?.authToken && _authData?.userData?.email) {
//           // update user status in backend (lastActiveAt)
//           await updateUserStatus({
//             url: apiRoutes.updateUserStatus,
//             isAuthenticatedRequest: true,
//           });
//         }
//       })();
//     } catch (error) {}
//   }, []);

//   useEffect(() => {
//     if (!isFetching && !isError) {
//       if (response && response.data) {
//         try {
//           const _res = JSON.parse(response.data) as IApiResponse<IUser>;
//           const userData = _res.result?.data;

//           if (userData && userData.id) {
//             setUserDataRState(userData);

//             if (isRootRoute) {
//               // navigate(AppRoutes.home);
//             }
//           }
//           setCompState((oldState) => ({
//             ...oldState,
//             processing: false,
//           }));
//         } catch (error) {
//           setCompState((oldState) => ({
//             ...oldState,
//             processing: false,
//           }));
//         }
//       } else {
//         setUserDataRState(null);

//         setCompState((oldState) => ({
//           ...oldState,
//           processing: false,
//         }));

//         if (isRootRoute) {
//           // navigate(AppRoutes.login);
//         }
//       }
//     }
//   }, [response, isFetching, isError, isRootRoute]);

//   if (compState.processing || isFetching) {
//     return <FullPageLoader />;
//   } else if (!compState.processing && !isError) {
//     return children;
//   } else {
//     return <ErrorBoundary message={MESSAGES.errors.authCheckFailed} />;
//   }
// };
// export default AuthenticationHOC;

export {};
