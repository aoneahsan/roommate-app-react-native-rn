// #region ---- Core Imports ----
import {
  ZArrowForwardOutlineIcon,
  ZHelpCircleOutlineIcon,
  ZMessageOutlineIcon,
  ZNotificationsOutlineIcon,
  ZRegUserOutlineIcon,
  ZUserFollowLineOutlineIcon,
  ZUserSwitchOutlineIcon,
} from "@/assets";
import CreditScore from "@/components/private/CreditScore";
import React from "react";
import { useZMediaQueryScale } from "zaions-react-tool-kit";

// #endregion

// #region ---- Packages Imports ----
import {
  ZAvatar,
  ZBox,
  ZButton,
  ZCard,
  ZContainer,
  ZFlex,
  ZHeading,
  ZRUAlignE,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUJustifyE,
  ZRUOrientationE,
  ZRURadiusE,
  ZRUVariantE,
  ZSeparator,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ViewProfile: React.FC = () => {
  const { isXsScale } = useZMediaQueryScale();
  return (
    <>
      <ZCard>
        <ZFlex align={ZRUAlignE.center} justify={ZRUJustifyE.between}>
          <ZFlex align={ZRUAlignE.center} className="gap-3">
            <ZAvatar fallback="a" size="5" radius={ZRURadiusE.medium} />
            <ZBox>
              <ZHeading
                as={ZRUHeadingAsE.h5}
                className="text-base font-medium md:text-xl"
              >
                Kelly
              </ZHeading>
              <ZText className="block text-xs" color={ZRUColorE.gray}>
                User ID: 12345678
              </ZText>
              <ZText className="block text-base" color={ZRUColorE.tomato}>
                VIP
              </ZText>
            </ZBox>
          </ZFlex>
          <ZBox className="md:me-3">
            <ZButton variant={ZRUVariantE.ghost} size="3">
              Edit <ZArrowForwardOutlineIcon className="md:w-5 md:h-5" />
            </ZButton>
          </ZBox>
        </ZFlex>
      </ZCard>

      <ZBox className="mt-5">
        <ZBox>
          <ZContainer>
            <ZCard>
              <ZHeading
                as={ZRUHeadingAsE.h4}
                className="text-xl font-medium tracking-wide"
              >
                My Credit
              </ZHeading>
              <CreditScore textSize="5" classNames="md:mt-7 mt-3" />

              <ZCard className="mt-5">
                <ZFlex
                  align={ZRUAlignE.center}
                  className="gap-2 *:text-center maxXs:flex-col"
                >
                  <ZFlex
                    align={ZRUAlignE.center}
                    justify={ZRUJustifyE.center}
                    className="flex-1 cursor-pointer sm:p-2 md:p-4"
                  >
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-sm font-normal tracking-wide min950px:text-lg lg:text-xl"
                      color={ZRUColorE.iris}
                    >
                      Personal Info
                    </ZHeading>
                  </ZFlex>
                  <ZSeparator
                    size="3"
                    className="maxXs:w-full"
                    orientation={
                      isXsScale
                        ? ZRUOrientationE.vertical
                        : ZRUOrientationE.horizontal
                    }
                  />
                  <ZFlex
                    align={ZRUAlignE.center}
                    justify={ZRUJustifyE.center}
                    className="flex-1 cursor-pointer sm:p-2 md:p-4"
                  >
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-sm font-normal tracking-wide min950px:text-lg lg:text-xl"
                      color={ZRUColorE.iris}
                    >
                      ID Varification
                    </ZHeading>
                  </ZFlex>
                  <ZSeparator
                    size="3"
                    className="maxXs:w-full"
                    orientation={
                      isXsScale
                        ? ZRUOrientationE.vertical
                        : ZRUOrientationE.horizontal
                    }
                  />
                  <ZFlex
                    align={ZRUAlignE.center}
                    justify={ZRUJustifyE.center}
                    className="flex-1 cursor-pointer sm:p-2 md:p-4"
                  >
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-sm font-normal tracking-wide min950px:text-lg lg:text-xl"
                      color={ZRUColorE.iris}
                    >
                      Face Varification
                    </ZHeading>
                  </ZFlex>
                </ZFlex>
              </ZCard>
            </ZCard>

            <ZCard className="mt-4">
              <ZHeading
                as={ZRUHeadingAsE.h4}
                className="text-xl font-medium tracking-wide"
              >
                Setting
              </ZHeading>

              <ZFlex
                align={ZRUAlignE.stretch}
                className="md:gap-4 gap-2 *:flex-1 mt-4 *:cursor-pointer maxXs:flex-col"
              >
                <ZCard>
                  <ZFlex
                    align={ZRUAlignE.center}
                    justify={ZRUJustifyE.center}
                    className="flex-col flex-1 w-full h-full gap-3 lg:p-4 maxMd:text-center"
                  >
                    <ZRegUserOutlineIcon className="w-5 h-5 min950px:w-7 min950px:h-7" />
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-sm font-normal tracking-wide min950px:text-lg min1150px:text-xl"
                      color={ZRUColorE.iris}
                    >
                      Invite Friends
                    </ZHeading>
                  </ZFlex>
                </ZCard>

                <ZCard>
                  <ZFlex
                    align={ZRUAlignE.center}
                    justify={ZRUJustifyE.center}
                    className="flex-col flex-1 w-full h-full gap-3 lg:p-4 maxMd:text-center"
                  >
                    <ZNotificationsOutlineIcon className="w-6 h-6 min950px:w-8 min950px:h-8" />
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-sm font-normal tracking-wide min950px:text-lg min1150px:text-xl"
                      color={ZRUColorE.iris}
                    >
                      Security & Notification
                    </ZHeading>
                  </ZFlex>
                </ZCard>

                <ZCard>
                  <ZFlex
                    align={ZRUAlignE.center}
                    justify={ZRUJustifyE.center}
                    className="flex-col flex-1 w-full h-full gap-3 lg:p-4 maxMd:text-center"
                  >
                    <ZUserSwitchOutlineIcon className="w-6 h-6 min950px:w-8 min950px:h-8" />
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-sm font-normal tracking-wide min950px:text-lg min1150px:text-xl"
                      color={ZRUColorE.iris}
                    >
                      Switch Account
                    </ZHeading>
                  </ZFlex>
                </ZCard>
              </ZFlex>
            </ZCard>

            <ZCard className="mt-4 cursor-pointer">
              <ZFlex align={ZRUAlignE.center} justify={ZRUJustifyE.between}>
                <ZHeading
                  as={ZRUHeadingAsE.h4}
                  className="text-sm font-medium tracking-wide sm:text-lg md:text-xl sm:ms-3"
                >
                  Terms and Condition
                </ZHeading>

                <ZArrowForwardOutlineIcon className="w-6 h-6 sm:me-3" />
              </ZFlex>
            </ZCard>

            <ZCard className="mt-4">
              <ZHeading
                as={ZRUHeadingAsE.h4}
                className="text-xl font-medium tracking-wide"
              >
                Contact Us
              </ZHeading>

              <ZFlex
                align={ZRUAlignE.stretch}
                className="md:gap-4 gap-2 *:flex-1 mt-4 *:cursor-pointer maxXs:flex-col"
              >
                <ZCard>
                  <ZFlex
                    align={ZRUAlignE.center}
                    justify={ZRUJustifyE.center}
                    className="flex-col flex-1 w-full h-full gap-3 md:p-4 maxMd:text-center"
                  >
                    <ZHelpCircleOutlineIcon className="w-5 h-5 min950px:w-7 min950px:h-7" />
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-sm font-normal tracking-wide min950px:text-lg min1150px:text-xl"
                      color={ZRUColorE.iris}
                    >
                      Help
                    </ZHeading>
                  </ZFlex>
                </ZCard>

                <ZCard>
                  <ZFlex
                    align={ZRUAlignE.center}
                    justify={ZRUJustifyE.center}
                    className="flex-col flex-1 gap-3 md:p-4 maxMd:text-center"
                  >
                    <ZMessageOutlineIcon className="w-6 h-6 min950px:w-8 min950px:h-8" />
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-sm font-normal tracking-wide min950px:text-lg min1150px:text-xl"
                      color={ZRUColorE.iris}
                    >
                      Message Us
                    </ZHeading>
                  </ZFlex>
                </ZCard>

                <ZCard>
                  <ZFlex
                    align={ZRUAlignE.center}
                    justify={ZRUJustifyE.center}
                    className="flex-col flex-1 gap-3 md:p-4 maxMd:text-center"
                  >
                    <ZUserFollowLineOutlineIcon className="w-6 h-6 min950px:w-8 min950px:h-8" />
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="text-sm font-normal tracking-wide min950px:text-lg min1150px:text-xl"
                      color={ZRUColorE.iris}
                    >
                      Follow Us
                    </ZHeading>
                  </ZFlex>
                </ZCard>
              </ZFlex>
            </ZCard>
          </ZContainer>
        </ZBox>
      </ZBox>
    </>
  );
};

export default ViewProfile;
