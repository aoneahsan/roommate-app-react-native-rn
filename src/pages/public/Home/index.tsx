// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBox,
  ZText,
  ZPage,
  ZButton,
  ZFlex,
  ZRUDirectionE,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import ZPubNavigation from "@/components/public/Navigation";
import {
  signInWithEmailAndPassword,
  reload,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFrbAuthInstance } from "@/firebaseInstance";
import ENVS from "@/utils/envKeys";
import CapGoogleMapsTestComponent from "@/capacitorApis/googleMaps/CapGoogleMapsTestComponent";
import { autoCompleteTest } from "@/googleApisInstance/placesApi";
import { getMyCurrentLocationFormattedPlaceData } from "@/googleApisInstance/geoCodingApi";

const frbAuth = getFrbAuthInstance();

const Home: React.FC = () => {
  const signUpTest = async () => {
    // const email = prompt('Enter Email') || 'ahsan@gmail.com';
    const email = "ahsan@gmail.com";
    // const password = prompt('Enter Password') || 'asdasd';
    const password = "asdasd";

    const result = await createUserWithEmailAndPassword(
      frbAuth,
      email,
      password
    );

    console.log({ ml: "Home: React.FC -> signUpTest", result });
  };

  const signInTest = async () => {
    // const email = prompt('Enter Email') || 'ahsan@gmail.com';
    const email = "ahsan@gmail.com";
    // const password = prompt('Enter Password') || 'asdasd';
    const password = "asdasd";

    const signInResult = await signInWithEmailAndPassword(
      frbAuth,
      email,
      password
    );

    console.log({ ml: "Home: React.FC -> signInTest", signInResult });
  };

  const getCurrentUserTest = async () => {
    const currentUser = frbAuth.currentUser;

    console.log({ currentUser, useLocalApis: ENVS.useLocalApis });
  };

  const reloadUserData = async () => {
    if (frbAuth.currentUser) {
      await reload(frbAuth.currentUser);
    }
  };

  const signOut = async () => {
    await frbAuth.signOut();
  };

  return (
    <ZPage>
      <ZPubNavigation />

      <ZBox className="text-center pt-7">
        <ZText className="text-xl font-medium">Home Page</ZText>
        <ZFlex
          direction={ZRUDirectionE.column}
          className="mt-5 space-y-4 w-[400px] m-auto"
        >
          <ZButton onClick={signUpTest}>SignUp token</ZButton>
          <ZButton onClick={signInTest}>SignIn token</ZButton>
          <ZButton onClick={getCurrentUserTest}>Get Current User</ZButton>
          <ZButton onClick={reloadUserData}>reload User</ZButton>
          <ZButton onClick={signOut}>signout User</ZButton>
        </ZFlex>
        <CapGoogleMapsTestComponent />
      </ZBox>
    </ZPage>
  );
};

export default Home;
