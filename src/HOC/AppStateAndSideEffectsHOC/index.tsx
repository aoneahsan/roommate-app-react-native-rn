import { getFrbAuthInstance } from "@/firebaseInstance";
import { mainAuthRStateAtom } from "@/state";
import { ZShowAppLoaderRStateAtom } from "@/state/globalComponents";
import { userDataRStateAtom, userTokenRStateAtom } from "@/state/user";
import constants from "@/utils/constants";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { STORAGE } from "zaions-react-tool-kit";
import { ZAppLoader } from "zaions-react-ui-kit";

const frbAuth = getFrbAuthInstance();

const AppStateAndSideEffectsHOC: React.FC = () => {
  const ZShowAppLoaderRState = useRecoilValue(ZShowAppLoaderRStateAtom);
  const setUserDataRState = useSetRecoilState(userDataRStateAtom);
  const setUserTokenRState = useSetRecoilState(userTokenRStateAtom);
  const setMainAuthState = useSetRecoilState(mainAuthRStateAtom);

  // Firebase Auth State Change Handlers
  useEffect(() => {
    setMainAuthState((oldState) => ({
      ...oldState,
      processing: true,
    }));

    try {
      onAuthStateChanged(frbAuth, async (user) => {
        if (user?.uid && user?.email && user?.phoneNumber) {
          const _token = await user?.getIdToken();

          // Storing user data
          setUserDataRState({
            id: user?.uid,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
          });

          // Storing Token
          setUserTokenRState(() => _token);

          setMainAuthState((oldState) => ({
            ...oldState,
            processing: false,
            isLoggedIn: true,
          }));

          await STORAGE.set(constants.localStorageKeys.userData, {
            id: user?.uid,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
          });
        } else {
          setMainAuthState((oldState) => ({
            ...oldState,
            processing: false,
            isLoggedIn: false,
          }));
        }
      });
    } catch (error) {}
  }, []);

  // we don't need to wrap the whole app in it, as this is just to watch these states
  return <ZAppLoader showAppLoader={ZShowAppLoaderRState} />;
};
export default AppStateAndSideEffectsHOC;
