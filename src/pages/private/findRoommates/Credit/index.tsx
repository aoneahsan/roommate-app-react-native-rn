// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import { useNavigate } from "@tanstack/react-router";
import {
  ZBox,
  ZButton,
  ZCallout,
  ZCard,
  ZContainer,
  ZFlex,
  ZHeading,
  ZPage,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUTextAsE,
  ZRUVariantE,
  ZText,
} from "zaions-react-ui-kit";
import { SwiperSlide, Swiper } from "swiper/react";

// #endregion

// #region ---- Custom Imports ----
import CreditScore from "@/components/private/CreditScore";
import NavigationHeader from "@/components/private/NavigationHeader";
import { AppRoutes } from "@/routes/appRoutes";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZArrowLeftLongIcon,
  ZPersonalInfoSvg,
  ZAuthenticationSvg,
  ZMaleAvatarSvg,
  ZArrowRightLongIcon,
} from "@/assets";
import CircularProgress from "@/components/private/CircularProgress";
import { useZMediaQueryScale } from "zaions-react-tool-kit";

// #endregion

const Credit: React.FC = () => {
  const navigate = useNavigate();
  const { is1100pxScale, is1150pxScale, is900pxScale, isMdScale, isXsScale } =
    useZMediaQueryScale();

  return (
    <ZPage>
      <NavigationHeader
        title="Credit"
        afterBoxContent={
          <ZButton
            size={isMdScale ? "3" : "2"}
            className="font-medium tracking-wider me-1 maxMd:w-full"
            color={ZRUColorE.yellow}
            variant={isMdScale ? ZRUVariantE.ghost : ZRUVariantE.solid}
            onClick={() => {
              navigate({
                to: AppRoutes.appSub.placesList.completePath,
              });
            }}
          >
            Skip
          </ZButton>
        }
        beforeBoxContent={
          <>
            <ZButton
              onClick={() => {
                navigate({
                  to: AppRoutes.roommatesPreference,
                });
              }}
              className="maxMd:w-full"
            >
              <ZArrowLeftLongIcon /> Go Back
            </ZButton>
          </>
        }
      />

      <ZContainer size="4" className="my-6 maxLg:mx-3">
        <ZCard className="md:mx-2">
          <ZHeading as={ZRUHeadingAsE.h4} className="maxMd:text-center">
            Credit Score
          </ZHeading>

          <CreditScore textSize="5" classNames="md:mt-7 mt-3" />

          <ZText className="block mt-3 text-base ms-2 maxMd:text-center">
            Your current credit score
          </ZText>

          <ZBox className="mt-3 md:mt-7">
            <Swiper
              spaceBetween={is1150pxScale ? 25 : 5}
              slidesPerView={is900pxScale ? 3 : isMdScale ? 2 : 1}
              className="*:items-stretch"
            >
              <SwiperSlide className="h-auto">
                <ZCard className="flex items-center justify-center w-full h-full gap-3 transition-all duration-300 scale-95 cursor-pointer select-none hover:scale-100 maxXs:flex-col-reverse">
                  <ZBox>
                    <ZBox
                      className="min1150px:h-36 h-28 lg:h-30"
                      show={isXsScale}
                    >
                      <ZPersonalInfoSvg className="w-full h-full" />
                    </ZBox>
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="mt-3 text-lg font-normal lg:text-xl min1150px:text-2xl"
                    >
                      Personal Info
                    </ZHeading>
                  </ZBox>
                  <ZFlex className="flex-col items-end justify-center flex-1 gap-3">
                    <CircularProgress
                      size={is1150pxScale ? 130 : is1100pxScale ? 120 : 110}
                      progress={20}
                    />
                  </ZFlex>
                </ZCard>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <ZCard className="flex items-center justify-center w-full h-full gap-3 transition-all duration-300 scale-95 cursor-pointer select-none hover:scale-100 maxXs:flex-col-reverse">
                  <ZBox>
                    <ZBox
                      className="h-24 lg:h-28 min1150px:h-36"
                      show={isXsScale}
                    >
                      <ZAuthenticationSvg className="w-full h-full" />
                    </ZBox>
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="mt-3 text-lg font-normal lg:text-xl min1150px:text-2xl"
                    >
                      ID Verification
                    </ZHeading>
                  </ZBox>
                  <ZFlex className="flex-col items-end justify-center flex-1 gap-3">
                    <CircularProgress
                      size={is1150pxScale ? 130 : is1100pxScale ? 120 : 110}
                      progress={30}
                    />
                  </ZFlex>
                </ZCard>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <ZCard className="flex items-center w-full h-full gap-3 transition-all duration-300 scale-95 cursor-pointer select-none hover:scale-100 maxXs:flex-col-reverse">
                  <ZBox>
                    <ZBox
                      className="h-24 lg:h-28 min1150px:h-36"
                      show={isXsScale}
                    >
                      <ZMaleAvatarSvg className="w-full h-full" />
                    </ZBox>

                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="mt-3 text-lg font-normal lg:text-xl min1150px:text-2xl "
                    >
                      Face verification
                    </ZHeading>
                  </ZBox>

                  <ZFlex className="flex-col items-end flex-1 gap-3">
                    <CircularProgress
                      size={is1150pxScale ? 130 : is1100pxScale ? 120 : 110}
                      progress={30}
                    />
                  </ZFlex>
                </ZCard>
              </SwiperSlide>
            </Swiper>
          </ZBox>

          <ZFlex className="md:items-end md:justify-center maxMd:flex-col gap-6 mt-7 min900px:*:flex-1">
            <ZBox className="space-y-4 *:py-2">
              <ZCallout
                content="Complete your verification, let more people trust you!"
                className="justify-center"
                showIcon={false}
              />

              <ZCallout
                content="Let’s do it now!"
                className="justify-center"
                showIcon={false}
              />

              <ZCallout
                content="30% of 100%"
                showIcon={false}
                className="justify-center"
                color={ZRUColorE.yellow}
              />
            </ZBox>
            <ZBox className="flex flex-col items-center justify-center">
              <ZHeading
                as={ZRUHeadingAsE.h5}
                className="mb-3 text-xl font-medium min900px:text-2xl"
              >
                Proportion
              </ZHeading>
              <CircularProgress
                size={is900pxScale ? 150 : 120}
                strokeWidth={10}
                progress={25}
              />
            </ZBox>
          </ZFlex>
        </ZCard>
        <ZButton
          className="mt-6 max900px:w-full"
          onClick={() => {
            navigate({
              to: AppRoutes.appSub.placesList.completePath,
            });
          }}
        >
          Save & Continue <ZArrowRightLongIcon className="mt-px" />
        </ZButton>
      </ZContainer>
    </ZPage>
  );
};

export default Credit;
