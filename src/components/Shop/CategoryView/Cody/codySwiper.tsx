import React from "react";
import styled from "styled-components";
import media from "@/styles/media";
import Image from "next/image";

// 슬라이드 데이터

const SwiperContainer = styled.div`
  width: 88%;
  overflow: hidden;
  position: relative;
  ${media.xsmall} {
    width: 95%;
  }
  ${media.small} {
    width: 90%;
  }
`;
const SwiperWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin; /* 스크롤바 너비 설정 */
  scrollbar-color: darkgray lightgray; /* 스크롤바 색상 설정 */

  &::-webkit-scrollbar {
    background-color: lightgray; /* 웹킷 브라우저용 스크롤바 색상 설정 */
    height: 5px; /* 웹킷 브라우저용 스크롤바 너비 설정 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgray; /* 웹킷 브라우저용 스크롤바 색상 설정 */
    height: 5px; /* 웹킷 브라우저용 스크롤바 너비 설정 */
  }
`;

const SwiperSlide = styled.div`
  flex: 0 0 auto;
  width: 25%;
  height: auto;
  aspect-ratio: 0.77;
  scroll-snap-align: start;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
  margin-top: 3rem;
  align-items: center;
  font-size: 24px;
  margin-right: 10px; /* 슬라이드 간의 간격 설정 */
  ${media.xsmall} {
    width: 50%;
  }
  ${media.small} {
    width: 33%;
  }
`;
const MarketIMG = styled(Image)`
  width: 100%;
  height: auto;
  aspect-ratio: 0.77;
`;

interface SwiperComponentProps {
  imgUrls: string;
}

function SwiperComponent({ imgUrls }: SwiperComponentProps) {
  const slides = imgUrls?.split(",");
  return (
    <SwiperContainer>
      <SwiperWrapper>
        {slides.slice(0, -1)?.map((slide: any, index: number) => (
          <SwiperSlide key={slide}>
            <MarketIMG
              src={slide}
              alt={`마켓제품 ${index + 1}`}
              width={500}
              height={500}
            />
          </SwiperSlide>
        ))}
      </SwiperWrapper>
    </SwiperContainer>
  );
}
export default SwiperComponent;
