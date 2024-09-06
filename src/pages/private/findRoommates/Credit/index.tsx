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
} from "@/assets";
import CircularProgress from "@/components/private/CircularProgress";

// #endregion

const Credit: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ZPage>
      <NavigationHeader
        title="Credit"
        afterBoxContent={
          <ZButton
            size="3"
            className="font-medium tracking-wider me-1"
            color={ZRUColorE.yellow}
            variant={ZRUVariantE.ghost}
          >
            Skip
          </ZButton>
        }
        beforeBoxContent={
          <>
            <ZButton
              onClick={() => {
                navigate({
                  to: AppRoutes.myLifeStyle,
                });
              }}
            >
              <ZArrowLeftLongIcon /> Go Back
            </ZButton>
          </>
        }
      />

      <ZContainer size="4" className="my-6 maxLg:mx-3">
        <ZCard>
          <ZHeading as={ZRUHeadingAsE.h4}>Credit Score</ZHeading>

          <CreditScore textSize="5" classNames="mt-7" />

          <ZText className="block mt-3 text-base ms-2">
            Your current credit score
          </ZText>

          <ZBox className="mt-7">
            <Swiper
              spaceBetween={25}
              slidesPerView={3}
              className="*:items-stretch"
            >
              <SwiperSlide className="h-auto">
                <ZCard className="flex items-center justify-center w-full h-full gap-3 transition-all duration-300 scale-95 cursor-pointer select-none hover:scale-100">
                  <ZBox>
                    <ZBox className="h-36">
                      <ZPersonalInfoSvg className="w-full h-full" />
                    </ZBox>
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="mt-3 font-normal"
                    >
                      Personal Info
                    </ZHeading>
                  </ZBox>
                  <ZFlex className="flex-col items-end justify-center flex-1 gap-3">
                    <CircularProgress size={130} progress={20} />
                  </ZFlex>
                </ZCard>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <ZCard className="flex items-center justify-center w-full h-full gap-3 transition-all duration-300 scale-95 cursor-pointer select-none hover:scale-100">
                  <ZBox>
                    <ZBox className="h-36">
                      <ZAuthenticationSvg className="w-full h-full" />
                    </ZBox>
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="mt-3 font-normal"
                    >
                      ID Verification
                    </ZHeading>
                  </ZBox>
                  <ZFlex className="flex-col items-end justify-center flex-1 gap-3">
                    <CircularProgress size={130} progress={30} />
                  </ZFlex>
                </ZCard>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <ZCard className="flex items-center w-full h-full gap-3 transition-all duration-300 scale-95 cursor-pointer select-none hover:scale-100">
                  <ZBox>
                    <ZBox className="h-36">
                      <ZMaleAvatarSvg className="w-full h-full" />
                    </ZBox>

                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      className="mt-3 font-normal"
                    >
                      Face verification
                    </ZHeading>
                  </ZBox>

                  <ZFlex className="flex-col items-end flex-1 gap-3">
                    <CircularProgress size={130} progress={30} />
                  </ZFlex>
                </ZCard>
              </SwiperSlide>
            </Swiper>
          </ZBox>

          <ZFlex className="items-end justify-center gap-6 mt-7 *:flex-1">
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
              <ZHeading as={ZRUHeadingAsE.h5} className="mb-3 font-medium">
                Proportion
              </ZHeading>
              <CircularProgress size={150} strokeWidth={10} progress={25} />
            </ZBox>
          </ZFlex>
        </ZCard>
      </ZContainer>
    </ZPage>
  );
};

export default Credit;
