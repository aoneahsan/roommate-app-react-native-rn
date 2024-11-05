import { Theme, ThemePanel } from "@radix-ui/themes";

// Tanstack React Router

// Import Radix UI CSS
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

import "@radix-ui/themes/styles.css";
import "react-toastify/dist/ReactToastify.min.css";

import "react-datepicker/dist/react-datepicker.css";

import "zaions-react-ui-kit/dist/index.css";

// importing this here so the ENVs validation will kick in as soon as ap starts
import "@/utils/envKeys";

import ENVS from "@/utils/envKeys";
import { configureZTK } from "zaions-tool-kit";

// Import Swiper styles
import "swiper/css";
import AppRoutesEntry from "./AppRoutesEntry";
import AppStateAndSideEffectsHOC from "./HOC/AppStateAndSideEffectsHOC";

configureZTK({ cryptoSecret: ENVS.cryptoSecret });

const queryClient = new QueryClient();

const AppEntryPoint: React.FC = () => {
  return (
    <>
      <Theme appearance="dark" radius="full">
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <AppRoutesEntry />

            <AppStateAndSideEffectsHOC />
          </QueryClientProvider>
        </RecoilRoot>
        <ThemePanel defaultOpen={false} />
      </Theme>
    </>
  );
};

export default AppEntryPoint;
