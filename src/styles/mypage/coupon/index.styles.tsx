import styled from "styled-components";
import COLORS from "@/constants/color";
import Image from "next/image";

export const Wrap = styled.div<{ isLoading?: boolean }>`
  height: ${({ isLoading }) => (isLoading ? "auto" : "auto")};
`;
export const TabMenu = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: right;
  p {
    font-weight: 200;
    font-size: 1.18rem;
  }
  @media (max-width: 769px) {
    display: none;
  }
  width: 80rem;
`;
export const Table = styled.div`
  border-bottom: 1px solid;
  width: 80rem;
  @media (max-width: 769px) {
    width: 88%;
    border: none;
  }
`;
export const TableHeader = styled.div`
  border-bottom: 1px solid;
  padding-left: 15rem;
  display: grid;
  align-items: center;

  //grid-template-columns: 17rem 22rem 12.5rem 11rem 12.5rem 11rem 5rem;
  grid-template-columns: 26rem 17rem 14rem 7.7rem;
  //border: 1px solid red;
  font-size: 1.2rem;
  @media (max-width: 769px) {
    display: none;
  }
  p {
    margin: 1rem 0 1rem 0;
    font-weight: 500;
    //border: 1px solid red;
  }
`;
export const TableContent = styled.div``;
export const NODATA = styled.div`
  margin-top: 3rem;
  font-weight: 400;
  color: ${COLORS.GREY[500]};
  font-size: 1.5rem;
  height: 30rem;
  //border: 1px solid red;
`;
export const ProductInfo = styled.div`
  display: flex;
  position: relative;
  font-size: 1.2rem;
  align-items: center;
  margin: 1.9rem 0 1.9rem 0;
  p {
    @media (max-width: 769px) {
      margin: 0;
    }
    font-weight: 200;
  }
`;
export const TextInfo = styled.div`
  //border: 1px solid red;
  //width: 24rem;
  //display: flex;
  //padding-right: 1rem;
  gap: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    font-weight: 500;
    //margin: 0;
  }
  @media (max-width: 769px) {
    display: flex;
    flex-direction: column;
  }
`;
export const MobileTextInfo = styled.div`
  display: grid;
  //padding-left: 5rem;
  grid-template-columns: 36.5rem 16rem 15rem 15rem;
  margin: 1.9rem 0 1.9rem 0;
  text-align: center;
  justify-content: center;
  align-items: center;

  h4 {
    margin: 0;
    padding: 0;
  }

  @media (max-width: 769px) {
    display: flex;
    width: 100%;
    border: 1px solid ${COLORS.BLACK};
    border-radius: 10px;
    padding: 1.5rem 0 1.5rem 0;
    flex-direction: row;
    //gap: 5rem;
    justify-content: space-around;
    p {
      font-weight: 400;
      font-size: 1rem;
      padding-bottom: 0.2rem;
      display: none;
    }

    p:nth-child(2):before {
      //content: "판매가 : ";
      display: none;
    }
    p:nth-child(3):before {
      //content: "수량 : ";
      display: none;
    }
    p:nth-child(4):before {
      display: none;
    }
  }
`;
export const MobileDescription = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;
export const CouponWrapper = styled.div`
  width: 8rem;
  height: 5.28rem;
  position: relative;
`;
export const CouponImage = styled(Image)`
  //width: 5rem;
  //height: 5rem;
  width: 100%;
  //border: 1px solid black;
  //width: 30%;
`;
