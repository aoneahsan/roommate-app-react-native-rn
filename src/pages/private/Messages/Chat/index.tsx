// #region ---- Core Imports ----
import { ZArrowLeftLongIcon, ZFileTextOutlineIcon } from "@/assets";
import { AppRoutes } from "@/routes/appRoutes";
import { PaperPlaneIcon, PlusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "@tanstack/react-router";
import React, { useCallback } from "react";
import {
  ZBox,
  ZButton,
  ZCard,
  ZFlex,
  ZIconButton,
  ZInput,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const Chat: React.FC = () => {
  const navigate = useNavigate();

  const gotoInbox = useCallback(() => {
    navigate({
      to: AppRoutes.appSub.messages.completePath,
    });
  }, []);

  return (
    <ZFlex className="flex-col h-full overflow-hidden">
      <ZBox>
        <ZButton onClick={() => gotoInbox()} className="maxSm:w-full">
          <ZArrowLeftLongIcon /> Go to inbox
        </ZButton>
      </ZBox>

      <ZBox className="flex-grow mt-6">
        <ZCard className="relative flex-1 h-full space-y-3 overflow-hidden">
          <ZBox className="absolute left-0 w-full max-h-full px-3 py-3 overflow-y-auto bottom-14 top-1 z_pretty_scrollbar">
            {[...Array(10)]?.map((el) => {
              return (
                <React.Fragment key={el}>
                  <ZFlex className="justify-start mb-3">
                    <ZBox className="bg-indigo9/30 md:p-3 p-2 rounded-e-xl rounded-es-xl max-w-[50%] min1336px:text-base md:text-sm text-xs w-max text-wrap">
                      Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Optio, labore eum
                      dolor maxime delectus et pariatur, esse, distinctio
                      repellendus vitae alias aliquid sequi amet aperiam
                      architecto nulla accusamus. Adipisci, commodi!
                    </ZBox>
                  </ZFlex>

                  <ZFlex className="justify-start mb-3">
                    <ZBox className="bg-indigo9/30 p-1 rounded-e-xl rounded-es-xl max-w-[50%] w-max text-wrap">
                      <ZFileTextOutlineIcon className="w-16 h-16 lg:w-20 lg:h-20 min1336px:w-28 min1336px:h-28" />
                    </ZBox>
                  </ZFlex>

                  <ZFlex className="justify-end">
                    <ZBox className="bg-grass9/30 md:p-3 p-2 rounded-s-xl rounded-ee-xl max-w-[50%] min1336px:text-base md:text-sm text-xs w-max text-wrap">
                      Lorem ipsum dolor sit amet consectetur,
                    </ZBox>
                  </ZFlex>
                </React.Fragment>
              );
            })}
          </ZBox>

          <ZBox className="fixed bottom-0 left-0 w-full px-3 pt-5 pb-3">
            <ZFlex className="items-center gap-3">
              <ZIconButton>
                <PlusIcon className="w-4 h-4" />
              </ZIconButton>
              <ZInput className="flex-1" placeholder="Type message here" />
              <ZIconButton>
                <PaperPlaneIcon className="w-4 h-4" />
              </ZIconButton>
            </ZFlex>
          </ZBox>
        </ZCard>
      </ZBox>
    </ZFlex>
  );
};

export default Chat;
