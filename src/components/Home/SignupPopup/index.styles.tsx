import styled from "styled-components";
import Image from "next/image";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  //align-items: center;
  //justify-content: center;
  z-index: 999;
`;

export const PopupContainer = styled.div`
  margin: 7rem 0 0 5rem;
  background-color: #fff;
  border: 1px solid black;
  height: 36.6rem;
  width: 40rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 2rem;
  z-index: 10000; /* 더 높은 z-index 값 */
  p {
    font-size: 1.6rem;
    font-weight: 300;
  }
  position: relative;
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
  width: 15.5rem;
  height: 10rem;
  position: relative;
`;
export const CouponImage = styled(Image)`
  width: 100%;
`;
export const LOGOBOX = styled.div`
  margin-top: 2.3rem;
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
