import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Button from "@/components/common/Button";

const StyledHome = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

/** TopLayer 컴포넌트 스타일링*/
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* 변경된 부분 */
`;

const DesktopImage = styled(Image)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileImage = styled(Image)`
  display: none;

  @media (max-width: 768px) {
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 50rem;
    object-fit: cover;
  }
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 1.5rem;
  font-weight: 200;
`;

const TextInstagram = styled.span`
  font-size: 1.375rem;
  font-weight: 600;
  padding: 0.5rem 0rem 0rem 0rem;
`;

export const StyledButton = styled(Button)`
  margin-top: 3.25rem;
  font-size: 1.5rem;
  font-weight: 200;
  background-color: rgba(0, 0, 0, 0.15);
  height: 3.125rem;
  color: white;
  border-radius: 3px;
  border: none;
`;

/** ShopLayer 컴포넌트 스타일링 */

/** 홈화면의 첫 화면 : 전체 화면의 이미지와 버튼 */
function TopLayer() {
  return (
    <ImageWrapper>
      <DesktopImage
        src="/image/homeDesktop2.jpg"
        alt="/image/homeDesktop2.jpg"
        layout="fill"
        objectFit="cover"
      />
      <MobileImage
        src="/image/homeMobile1.jpg"
        alt="/image/homeMobile1.jpg"
        layout="fill"
        objectFit="cover"
      />
      <TextWrapper>
        <Text>레슬(rastle) : (악, 어려움 등에) 전력을 다하다</Text>
        <TextInstagram>@rastle_fashion</TextInstagram>
        <StyledButton title="view more" width="10rem" />
      </TextWrapper>
    </ImageWrapper>
  );
}

function ShopLayer() {
  return <div></div>;
}

function EventLayer() {
  return <div />;
}

export default function Home() {
  return (
    <StyledHome>
      <TopLayer />
      <ShopLayer />
      <EventLayer />
    </StyledHome>
  );
}
