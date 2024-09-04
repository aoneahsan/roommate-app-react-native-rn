// #region ---- Core Imports ----
import React, { useRef } from "react";

// #endregion

// #region ---- Packages Imports ----
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// #endregion

// #region ---- Custom Imports ----
import {
  ZCard,
  ZIconButton,
  ZRUColorE,
  ZRUVariantE,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Images Imports ----
import { ZTrashOutlineIcon } from "@/assets";
import { useZMediaQueryScale, ZClassNames } from "zaions-react-tool-kit";
import "swiper/css/pagination";

// #endregion

// #region ---- Types Imports ----
interface ImageSwiperProps {
  images: string[];
  onRemove: (index: number) => void;
  sectionTitle: string;
}
// #endregion

const ImageSwiper: React.FC<ImageSwiperProps> = ({
  images,
  onRemove,
  sectionTitle,
}) => {
  const sliderRef = useRef<SwiperRef>(null);
  const { is1150pxScale, is900pxScale, isMdScale } = useZMediaQueryScale();
  const paginationBulletsLength =
    sliderRef?.current?.swiper?.pagination?.bullets?.length ?? 0;
  return (
    <Swiper
      ref={sliderRef}
      spaceBetween={is1150pxScale ? 25 : is900pxScale ? 20 : 10}
      slidesPerView={is1150pxScale ? 4 : is900pxScale ? 3 : isMdScale ? 2 : 1}
      pagination={true}
      modules={[Pagination]}
      className={ZClassNames({
        "h-[17rem]": paginationBulletsLength > 1,
        "h-[14.5rem]": paginationBulletsLength <= 1,
      })}
    >
      {images.map((image, index) => (
        <SwiperSlide
          key={index}
          className={ZClassNames({
            "h-full": paginationBulletsLength <= 1,
            "h-[85%]": paginationBulletsLength > 1,
          })}
        >
          <ZCard className="relative w-full h-full p-0 overflow-hidden select-none">
            <ZIconButton
              variant={ZRUVariantE.surface}
              color={ZRUColorE.red}
              className="absolute z-20 cursor-pointer top-2 right-3"
              onClick={() => onRemove(index)}
            >
              <ZTrashOutlineIcon className="w-6 h-6" />
            </ZIconButton>
            <img
              src={image}
              className="object-cover w-full h-full select-none"
              alt={`${sectionTitle} Image`}
            />
          </ZCard>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
