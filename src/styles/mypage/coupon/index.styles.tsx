import styled from "styled-components";
import COLORS from "@/constants/color";

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
  grid-template-columns: 26rem 17rem 14rem 7.7rem;
  font-size: 1.2rem;
  @media (max-width: 769px) {
    display: none;
  }
  p {
    margin: 1rem 0 1rem 0;
    font-weight: 500;
  }
`;
export const TableContent = styled.div``;
export const NODATA = styled.div`
  margin-top: 3rem;
  font-weight: 400;
  color: ${COLORS.GREY[500]};
  font-size: 1.5rem;
  height: 30rem;
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
  gap: 1.4rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    font-weight: 500;
  }
  @media (max-width: 769px) {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
export const MobileTextInfo = styled.div`
  display: grid;
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
    padding: 1.5rem 7rem 2rem 2rem;
    flex-direction: row;
    justify-content: space-between;
    gap: 5rem;
    p {
      font-weight: 400;
      font-size: 1rem;
      padding-bottom: 0.2rem;
      display: none;
    }
    p:nth-child(2):before {
      display: none;
    }
    p:nth-child(3):before {
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
  position: relative;
  width: 15rem;
  height: 9rem;
  border-radius: 5px;
  border: 1.5px solid grey;
`;
export const CouponImage = styled.div`
  width: 100%;
  height: 100%;
  h3 {
    text-align: left;
    margin: 1rem 1rem 0 1rem;
  }
  h4 {
    text-align: left;
    margin: 0.5rem 1rem 0 1rem;
    font-size: 2rem;
  }
  h5 {
    text-align: left;
    margin: 0.8rem 1rem 0 1rem;
    font-size: 1rem;
    font-weight: 400;
  }
`;
