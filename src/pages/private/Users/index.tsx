// #region ---- Core Imports ----
import React, { useCallback } from "react";

// #endregion

// #region ---- Packages Imports ----
import { useNavigate } from "@tanstack/react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { useZMediaQueryScale } from "zaions-react-tool-kit";
import {
  ZBox,
  ZButton,
  ZFlex,
  ZHeading,
  ZRUAlignE,
  ZRUJustifyE,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import OtherUserInfoCard from "@/components/private/OtherUserInfoCard";
import { AppRoutes } from "@/routes/appRoutes";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZFilterSharpOutlineIcon } from "@/assets";

// #endregion

const Users: React.FC = () => {
  const navigate = useNavigate();
  const { is768Scale, isSmScale } = useZMediaQueryScale();

  const gotoFilter = useCallback(() => {
    navigate({
      to: AppRoutes.appSub.users.filter.completePath,
    });
  }, []);

  return (
    <>
      <ZBox className="md:px-2 md:py-2">
        <ZFlex
          align={ZRUAlignE.center}
          justify={ZRUJustifyE.between}
          className="maxSm:flex-col maxSm:gap-3 maxSm:*:w-full"
        >
          <ZHeading className="text-2xl font-medium tracking-wider md:text-4xl maxSm:text-center">
            Users
          </ZHeading>

          <ZButton onClick={gotoFilter}>
            <ZFilterSharpOutlineIcon className="w-5 h-5" /> Filter
          </ZButton>
        </ZFlex>

        <ZFlex
          className="flex-wrap items-stretch gap-3 mt-3 mb-4 md:mt-5"
          show={is768Scale}
        >
          <OtherUserInfoCard />
          <OtherUserInfoCard />
          <OtherUserInfoCard />
        </ZFlex>
        <ZBox show={!is768Scale} className="mt-3">
          <Swiper
            spaceBetween={10}
            slidesPerView={!isSmScale ? 1 : 2}
            className="*:items-stretch"
          >
            <SwiperSlide className="h-auto sm:flex sm:items-center sm:justify-center maxSm:*:w-full">
              <OtherUserInfoCard />
            </SwiperSlide>
            <SwiperSlide className="h-auto sm:flex sm:items-center sm:justify-center maxSm:*:w-full">
              <OtherUserInfoCard />
            </SwiperSlide>
            <SwiperSlide className="h-auto sm:flex sm:items-center sm:justify-center maxSm:*:w-full">
              <OtherUserInfoCard />
            </SwiperSlide>
          </Swiper>
        </ZBox>
      </ZBox>
    </>
  );
};

export default Users;
