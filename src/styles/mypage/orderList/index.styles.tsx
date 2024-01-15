import styled from "styled-components";
import COLORS from "@/constants/color";
import Button from "@/components/Common/Button";

export const Wrap = styled.div<{ isLoading?: boolean }>`
  height: ${({ isLoading }) => (isLoading ? "auto" : "auto")};
  //margin-top: 3.68rem;
`;
export const OrderDateNum = styled.div`
  width: 13rem;
  font-size: 1.3rem;
  text-align: center;
  div {
    font-weight: 300;
    padding-left: 1rem;
    @media (max-width: 769px) {
      font-weight: 500;
    }
  }
  @media (max-width: 769px) {
    //display: none;
    display: flex;
    justify-content: space-between;
    background-color: ${COLORS.GREY[200]};
    width: 100%;
    padding: 1rem 0 1rem 0;
    text-align: left;
  }
`;
export const OrderNum = styled.div`
  text-decoration: underline;
  cursor: pointer;
  @media (max-width: 769px) {
    display: none;
  }
`;
export const OrderDetail = styled.div`
  padding-right: 1rem;
  @media (min-width: 769px) {
    display: none;
  }
`;
export const Table = styled.div`
  width: 80rem;
`;
export const TableHeader = styled.div`
  width: 80rem;
  border-bottom: 1px solid;
  display: grid;
  align-items: center;
  grid-template-columns: 20.5rem 24rem 11.3rem 12.5rem 7rem;
  font-size: 1.2rem;
  padding-left: 4.56rem;
  @media (max-width: 769px) {
    display: none;
  }
  p {
    margin: 1rem 0 1rem 0;
    font-weight: 500;
  }
`;
export const TableContent = styled.div`
  display: flex;
  flex-direction: column;
`;
export const NODATA = styled.div`
  margin-top: 3rem;
  font-weight: 400;
  color: ${COLORS.GREY[500]};
  font-size: 1.5rem;
  height: 30rem;
`;
export const ProductInfo = styled.div`
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  margin: 2.24rem 0 0 0;
  padding-bottom: 2.24rem;
  border-bottom: 1px solid ${COLORS.GREY[300]};
  p {
    @media (max-width: 769px) {
      margin: 0;
    }
    font-weight: 200;
  }
  @media (max-width: 769px) {
    align-items: unset;
    flex-direction: column;
    border: 1px solid ${COLORS.GREY[300]};
  }
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.24rem;
  margin-right: 1rem;
  @media (max-width: 769px) {
    width: 100%;
    padding: 1.9rem 1.2rem 1.5rem 1.2rem;
  }
`;
export const ProductBox = styled.div`
  //margin-right: 1rem;
  display: flex;
  flex-direction: row;
  @media (max-width: 769px) {
    //border-bottom: 1px solid ${COLORS.GREY[300]};
    flex-direction: column;
    padding-bottom: 1rem;
  }
`;
export const UpperBox = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 769px) {
    //border-bottom: 1px solid ${COLORS.GREY[300]};
  }
`;
export const BottomBox = styled.div`
  @media (max-width: 769px) {
    //border-bottom: 1px solid ${COLORS.GREY[300]};
    //border: 1px solid red;
    padding-top: 2rem;
  }
`;
export const Img = styled.img`
  width: 7.5rem;
  height: 8.2rem;
  margin-right: 1rem;
  margin-left: 1.88rem;
  @media (max-width: 769px) {
    width: 11.5rem;
    border-radius: 3px;
    height: 12.5rem;
    padding: 0;
    margin: 0 1rem 0 0;
  }
`;
export const TextInfo = styled.div`
  width: 24rem;
  padding-right: 1rem;
  h4 {
    font-weight: 500;
    margin: 0;
  }
  @media (max-width: 769px) {
    font-size: 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  padding-bottom: 0.5rem;
`;
export const Count = styled.div`
  //text-align: center;
`;
export const MobileTextInfo = styled.div`
  display: grid;
  grid-template-columns: 25.5rem 12rem 10.7rem;
  align-items: center;
  @media (max-width: 769px) {
    align-items: unset;
    margin-left: 2rem;
    div {
      font-size: 1.6rem;
      font-weight: 300;
      margin-bottom: 1rem;
    }
    display: flex;
    flex-direction: column;
  }
`;
export const TotalPrice = styled.div`
  display: flex;
  justify-content: right;
  font-size: 1.45rem;
  padding: 2.2rem 0 2.2rem 0;
  width: 80rem;
  @media (max-width: 769px) {
    width: 100%;
    font-size: 1.3rem;
  }
  p {
    margin: 0;
    font-weight: 200;
    padding: 0 0.5rem 0 0.5rem;
  }
  div {
  }
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 769px) {
    flex-direction: row;
  }
`;

export const DiscountedPrice = styled.span`
  font-size: 1.3rem;
  font-weight: 400;
`;
export const CartBox = styled.div`
  display: flex;
  width: 80rem;
  margin-top: 3.88rem;
  p {
    margin: 0;
    font-size: 1rem;
    font-weight: 200;
    padding-bottom: 0.5rem;
  }
  h3 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 200;
  }
  border-bottom: 1px solid;
  @media (max-width: 769px) {
    width: 100%;
  }
`;
export const MobileDeliveryStatus = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
  display: flex;
  justify-content: space-between;
`;

export const DeskTopDeliveryStatus = styled.div`
  @media (max-width: 769px) {
    display: none;
  }
`;
export const LoadDeliveryButton = styled(Button)`
  border-radius: 0;
  font-size: 1.3rem;
  font-weight: 300;
  border: 0.5px solid;
  padding: 0.5rem 1rem 0.5rem 1rem;
`;
