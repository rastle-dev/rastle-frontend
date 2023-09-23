import React from "react";
import styled from "styled-components";

// 슬라이드 데이터
const slides = ["a", "b", "c", "d", "e", "f", "g"];

const SwiperContainer = styled.div`
  width: 88%;
  overflow: hidden;
  position: relative;
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
`;

const SwiperComponent: React.FC = () => {
  return (
    <SwiperContainer>
      <SwiperWrapper>
        {slides.map((slide) => (
          <SwiperSlide key={slide}>{`Slide ${slide}`}</SwiperSlide>
        ))}
      </SwiperWrapper>
    </SwiperContainer>
  );
};
export default SwiperComponent;
