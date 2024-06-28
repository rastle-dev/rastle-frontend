import styled from "styled-components";
import Image from "next/image";
import media from "@/styles/media";

export const PopupContainer = styled.div`
  margin: 2rem;
  opacity: 0.95;
  position: fixed;
  border-radius: 10px;
  background-color: #fff;
  height: 39rem;
  width: 35rem;
  display: flex;
  ${media.mobile} {
    width: 100%;
    height: 56.6rem;
    margin: 0;
    border-radius: 0;
  }
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 10000; /* 더 높은 z-index 값 */
  p {
    font-size: 1.6rem;
    font-weight: 300;
  }
  bottom: 0;
  right: 0;
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
  font-size: 1.1rem;
  bottom: 0;
  font-weight: 300;
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
  gap: 0.7rem;
  h2 {
    margin: 0;
    //font-size: 2.7rem;
    padding-top: 1rem;
    font-weight: 800;
  }
`;
export const LOGOWrapper = styled.div`
  width: 5.1rem;
  height: 5.1rem;
  position: relative;
`;
export const LOGOImage = styled(Image)`
  width: 100%;
`;
