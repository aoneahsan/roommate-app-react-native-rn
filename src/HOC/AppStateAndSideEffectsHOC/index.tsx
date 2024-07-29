import { getFrbAuthInstance } from "@/firebaseInstance";
import { userDataRStateAtom, userTokenRStateAtom } from "@/state/user";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const frbAuth = getFrbAuthInstance();

const AppStateAndSideEffectsHOC: React.FC = () => {
  const setUserDataRState = useSetRecoilState(userDataRStateAtom);
  const setUserTokenRState = useSetRecoilState(userTokenRStateAtom);

  // Firebase Auth State Change Handlers
  useEffect(() => {
    try {
      onAuthStateChanged(frbAuth, async (user) => {
        if (user?.uid) {
          const _token = await user?.getIdToken();

          // Storing user data
          setUserDataRState({
            id: user?.uid,
            email: user?.email ?? "",
            name: user?.displayName ?? "",
            phoneNumber: user?.phoneNumber ?? "",
          });

          // Storing Token
          setUserTokenRState(() => _token);
        }
      });
    } catch (error) {}

    try {
      onIdTokenChanged(frbAuth, (idToken) => {
        // console.log({ ml: "onIdTokenChanged", idToken });
      });
    } catch (error) {}
  }, []);

  // we don't need to wrap the whole app in it, as this is just to watch these states
  return <></>;
};

export default AppStateAndSideEffectsHOC;
