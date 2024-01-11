import styled from "styled-components";
import COLORS from "@/constants/color";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";

export const Wrap = styled.div<{ isLoading?: boolean }>`
  height: ${({ isLoading }) => (isLoading ? "auto" : "auto")};
`;
export const TabMenu = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: right;
  button {
    font-size: 1.18rem;
    border: none;
    border-bottom: 1px solid ${COLORS.GREY[400]};
    color: ${COLORS.GREY[400]};
    font-weight: 200;
    cursor: pointer;
    margin: 0 0 1.4rem 0;
    padding: 0 0 0.4rem 0;
    background-color: transparent;
  }
  @media (max-width: 769px) {
    display: none;
  }
  width: 80rem;
`;
export const Table = styled.div`
  width: 74.5rem;
`;
export const Select = styled(Input)`
  width: 2rem;
  @media (max-width: 769px) {
    margin-right: 1rem;
    display: none;
  }
`;
export const TableHeader = styled.div`
  width: 80rem;
  border-bottom: 1px solid;
  display: grid;
  align-items: center;
  grid-template-columns: 18rem 21rem 12rem 12.3rem 12rem 4rem;
  font-size: 1.2rem;
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
export const Img = styled.img`
  width: 7.5rem;
  height: 8.2rem;
  margin-right: 1rem;
  margin-left: 0.8rem;
  @media (max-width: 769px) {
    margin-right: 3rem;
    width: 9rem;
    height: 9.84rem;
  }
`;
export const TextInfo = styled.div`
  width: 24rem;
  padding-right: 1rem;
  h4 {
    font-weight: 500;
    margin: 0;
  }
  padding-bottom: 0.5rem;
`;
export const MobileTextInfo = styled.div`
  display: grid;
  grid-template-columns: 25.5rem 12.8rem 10rem;
  margin: 1.9rem 0 1.9rem 1rem;
  p {
    padding-top: 1rem;
  }
  @media (max-width: 769px) {
    display: flex;
    flex-direction: column;
    p {
      font-weight: 400;
      font-size: 1.3rem;
      padding-bottom: 0.2rem;
    }
    p:nth-child(2):before {
      content: "판매가 : ";
    }
    p:nth-child(3):before {
      content: "수량 : ";
      font-size: 1.3rem;
    }
  }
`;
export const SelectTab = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.36rem;
  @media (max-width: 769px) {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 1.5rem;
  }
`;
export const SelectButton = styled(Button)`
  margin: 0;
  text-align: center;
  padding: 0.5rem 0 0.5rem 0;
  font-weight: 200;
  font-size: 1rem;
  width: 6.2rem;
  border-radius: 0;
  border: 1px solid ${COLORS.GREY[300]};

  @media (max-width: 769px) {
    display: none;
  }
`;
export const DeleteButton = styled(Button)`
  margin: 0;
  padding: 0.5rem 0 0.5rem 0;
  font-weight: 600;
  font-size: 1.4rem;
  width: 3.2rem;
  border-radius: 0;
  border: none;
  &:focus {
    border: none;
  }
  &:hover {
    border: none;
  }
  @media (min-width: 769px) {
    border: 1px solid ${COLORS.GREY[300]};
    border-radius: 0;
    font-weight: 200;
    font-size: 1rem;
    width: 6.2rem;
    text-align: center;
    &::after {
      content: " 삭제";
    }
    &:hover {
      border: 1px solid ${COLORS.GREY[300]};
    }
    &:focus {
      border: 1px solid ${COLORS.GREY[300]};
    }
  }
`;
export const TotalPrice = styled.div`
  display: flex;
  justify-content: right;
  font-size: 1.45rem;
  padding: 2.2rem 0 2.2rem 0;
  width: 80rem;
  @media (max-width: 769px) {
    width: 88%;
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
export const ButtonWrapper = styled.div`
  width: 80rem;
  font-size: 1rem;
  display: flex;
  gap: 1.45rem;
  justify-content: right;
  @media (max-width: 769px) {
    width: 88%;
  }
`;
export const OrderButton = styled(Button)`
  padding: 1.18rem 3rem 1.18rem 3rem;
  font-size: 1.18rem;
  font-weight: 200;
  border-radius: 0.45rem;
  &:hover {
    font-weight: 400;
  }
`;
export const SelectOrderButton = styled(Button)`
  padding: 1.18rem 3rem 1.18rem 3rem;
  font-size: 1.18rem;
  font-weight: 200;
  border-radius: 0.45rem;
  &:hover {
    font-weight: 400;
  }
  @media (max-width: 769px) {
    display: none;
  }
`;
export const Price = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DiscountPrice = styled.span`
  font-size: 1.3rem;
  font-weight: 400;
  text-decoration: line-through;
  color: ${COLORS.GREY.상세페이지};
  padding-right: 0.5rem;
`;

export const DiscountedPrice = styled.span`
  font-size: 1.3rem;
  font-weight: 400;
`;
export const DeliveryCharge = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 769px) {
    display: none;
  }
`;
export const CartBox = styled.div`
  display: flex;
  width: 80rem;
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
    width: 88%;
  }
`;
