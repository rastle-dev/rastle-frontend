import styled, { keyframes } from "styled-components";
import Image from "next/image";
import media from "@/styles/media";

// 애니메이션 정의
const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const PopupContainer = styled.div`
  margin: 2rem;
  opacity: 0.95;
  position: fixed;
  border-radius: 10px;
  background-color: #fff;
  height: 55rem;
  width: 40rem;
  display: flex;
  bottom: 0;
  left: 0;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 10000; /* 더 높은 z-index 값 */
  animation: ${slideUp} 0.65s ease-out; /* 애니메이션 추가 */

  div {
    font-weight: 500;
    padding-bottom: 0.2rem;
    font-size: 1.2rem;
  }

  p {
    font-size: 1.6rem;
    font-weight: 300;
  }

  ${media.mobile} {
    margin: 0;
    width: 100%;
    height: 60rem;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    left: 0;

    div {
      font-weight: 500;
      padding-bottom: 0.4rem;
      font-size: 1.5rem;
    }
  }
`;
export const DeleteIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.7rem 0.7rem 0 0;
`;
export const CloseButton = styled.button`
  border: none;
  cursor: pointer;
  color: black;
  background-color: transparent;
  position: absolute;
  right: 0;
  font-size: 1.2rem;
  bottom: 0;
  font-weight: 400;
  padding-bottom: 1.5rem;
  padding-right: 1.5rem;
`;
export const CouponWrapper = styled.div`
  width: 25rem;
  height: 15rem;
  position: relative;
  //border: 1px solid red;
`;
export const CouponImage = styled(Image)`
  width: 100%;
  padding: 1rem;
`;
export const LOGOBOX = styled.div`
  //margin-top: 2.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  //gap: 0.7rem;
  h2 {
    margin: 0;
    font-size: 3rem;
    font-weight: 400;
    font-family: Avenir;
  }
`;
export const LOGOWrapper = styled.div`
  width: 5.1rem;
  height: 6rem;
  position: relative;
  margin-bottom: 1rem;
`;
export const LOGOImage = styled(Image)`
  width: 100%;
`;

export const Intro = styled.div`
  font-weight: 500;
  padding-bottom: 0.2rem;
  font-size: 1.2rem;
  ${media.mobile} {
    font-weight: 500;
    padding-bottom: 0.4rem;
    font-size: 1.5rem;
  }
`;

export const IntroMargin = styled.div`
  margin-bottom: 1rem;
`;
