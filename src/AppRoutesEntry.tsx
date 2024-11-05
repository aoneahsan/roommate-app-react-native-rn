// Tanstack React Router
import { RouterProvider } from "@tanstack/react-router";
import { useRecoilValue } from "recoil";
import AppRouter from "./routes";
import { mainAuthRStateAtom } from "./state";

const AppRoutesEntry = () => {
  const mainAuthState = useRecoilValue(mainAuthRStateAtom);

  if (mainAuthState?.processing) {
  } else {
    return <RouterProvider router={AppRouter} />;
  }
};
export default AppRoutesEntry;
