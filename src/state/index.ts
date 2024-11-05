import { User } from "firebase/auth";
import { atom } from "recoil";

/**
 * This Recoil atom holds the authentication state of the user, managing the processing state,
 * Firebase user data, and login status. It is used to determine the authentication status of the user
 * throughout the application.
 * If reload happens first of all this state will be set so the private route functionality works.
 */
export const mainAuthRStateAtom = atom<{
  processing: boolean;
  frbUserData: User | null;
  isLoggedIn: boolean;
}>({
  key: "mainAuthRStateAtom_key",
  default: {
    processing: true,
    frbUserData: null,
    isLoggedIn: false,
  },
});
