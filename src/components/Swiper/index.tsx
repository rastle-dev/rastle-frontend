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
    padding-bottom: 3.72rem;

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
    }
  }

\` ;
`;

const StyledImage = styled.img`
  max-width: 100%; // 이미지의 최대 너비를 100%로 설정하여 부모 컨테이너에 맞게 조절
  height: auto; // 이미지의 높이를 자동으로 조절하여 비율을 유지
`;

const CustomArrow = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.5); // 투명도 설정
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); //그림자 설정
`;

const ArrowIcon = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ImageGalleryProps {
  images: string[];
}

const ImageSwiper: React.FC<ImageGalleryProps> = function ({ images }) {
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
      onInit={handleSwiperInit} // Swiper 초기화 시 호출되는 콜백 함수
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
      {images?.map((image, index) => (
        <SwiperSlide key={image}>
          <StyledImage src={image} alt={`Image ${index + 1}`} />
        </SwiperSlide>
      ))}

      {/* 커스텀 화살표 아이콘 */}
      <div className="swiper-button-prev">
        <CustomArrow onClick={handlePrevClick}>
          <ArrowIcon>
            <Icon
              iconSize="1rem"
              iconName="arrowLeft"
              color={COLORS.블랙}
              opacity={0.7}
            />
          </ArrowIcon>
        </CustomArrow>
      </div>
      <div className="swiper-button-next">
        <CustomArrow onClick={handleNextClick}>
          <ArrowIcon>
            <Icon
              iconSize="1rem"
              iconName="arrowRight"
              color={COLORS.블랙}
              opacity={0.7}
            />
          </ArrowIcon>
        </CustomArrow>
      </div>
    </StyledSwiper>
  );
};

export default ImageSwiper;
