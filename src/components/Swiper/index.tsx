import React, { useRef } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import styled from "styled-components";
import COLORS from "@/constants/color";
import Icon from "@/components/Common/Icon";
import media from "@/styles/media";
import Image from "next/image";

SwiperCore.use([Navigation, Pagination]);

const StyledSwiper = styled(Swiper)`
  width: 100%;

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }

  ${media.mobile} {
    width: 100%;
    height: auto;
    .swiper-button-prev,
    .swiper-button-next {
      display: none; // 화살표 숨기기
    }
  }

  .swiper-pagination-bullets {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    .swiper-pagination-bullet {
      margin: 0 0.25rem;
      padding: 0 0.5rem; ;
      width: 1rem;
      height: 1rem;
    }
  }
  

\` ;
`;

const StyledImage = styled(Image)<{
  soldOut: boolean | undefined;
}>`
  max-width: 100%; // 이미지의 최대 너비를 100%로 설정하여 부모 컨테이너에 맞게 조절
  height: auto; // 이미지의 높이를 자동으로 조절하여 비율을 유지
  aspect-ratio: 0.77;
  filter: ${({ soldOut }) => {
    if (soldOut) {
      return "brightness(0.5)";
    }
    return "brightness(1)";
  }};
`;

const CustomArrow = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: rgba(255, 255, 255, 0.5); // 투명도 설정
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); //그림자 설정
`;

const LeftArrowIcon = styled.div`
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.3rem;
  padding-right: 0.1rem;
`;

const RightArrowIcon = styled.div`
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.3rem;
  padding-left: 0.15rem;
`;

const SoldOutInfo = styled.div`
  position: absolute;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  z-index: 1;
  margin-top: 55%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${media.mobile} {
    font-size: 3rem;
`;

interface ImageGalleryProps {
  images: string[];
  alt: string;
  soldOut?: boolean | undefined;
}

const ImageSwiper: React.FC<ImageGalleryProps> = function ({
  images,
  alt,
  soldOut,
}) {
  const swiperRef = useRef<SwiperCore | null>(null);

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSwiperInit = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
  };

  return (
    <StyledSwiper
      onInit={handleSwiperInit}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      pagination={{ clickable: true, dynamicBullets: true }}
      breakpoints={{
        768: {
          navigation: false,
        },
      }}
      // @ts-expect-error 이 부분은 의도적으로 에러를 억제하기 위해 사용되었습니다.
      ref={swiperRef}
    >
      {images?.map((image) => (
        <SwiperSlide key={image}>
          {soldOut && (
            <SoldOutInfo>
              <p>SOLD OUT</p>
            </SoldOutInfo>
          )}
          <StyledImage
            src={image}
            alt={alt}
            layout="responsive"
            width={100}
            height={100}
            soldOut={soldOut}
          />
        </SwiperSlide>
      ))}

      {/* 커스텀 화살표 아이콘 */}
      <div className="swiper-button-prev">
        <CustomArrow onClick={handlePrevClick}>
          <LeftArrowIcon>
            <Icon
              iconSize="1rem"
              iconName="arrowLeft"
              color={COLORS.블랙}
              opacity={0.7}
            />
          </LeftArrowIcon>
        </CustomArrow>
      </div>
      <div className="swiper-button-next">
        <CustomArrow onClick={handleNextClick}>
          <RightArrowIcon>
            <Icon
              iconSize="1rem"
              iconName="arrowRight"
              color={COLORS.블랙}
              opacity={0.7}
            />
          </RightArrowIcon>
        </CustomArrow>
      </div>
    </StyledSwiper>
  );
};

export default ImageSwiper;
