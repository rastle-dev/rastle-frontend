import styled from "styled-components";
import COLORS from "@/constants/color";
import Button from "@/components/Common/Button";

export const Wrap = styled.div<{ isLoading?: boolean }>`
  height: ${({ isLoading }) => (isLoading ? "auto" : "auto")};
`;
export const OrderDateNum = styled.div`
  font-size: 1.3rem;
  text-align: center;
  width: 13.2rem;
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
  cursor: pointer;
`;
export const Table = styled.div`
  width: 100%;
`;
export const TableHeader = styled.div`
  width: 80rem;
  border-bottom: 1px solid;
  display: grid;
  align-items: center;
  grid-template-columns: 16rem 24rem 11.3rem 12.5rem 7rem;
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
    padding-bottom: 0;
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
    flex-direction: column;
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
  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 1rem 0 0;
  }
  padding-top: 2rem;
`;
export const EventBottomBox = styled.div`
  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 1rem 0 1rem;
  }
  padding-top: 2rem;
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
  @media (min-width: 769px) {
    text-align: center;
  }
`;
export const MobileTextInfo = styled.div`
  display: grid;
  grid-template-columns: 18.2rem 7.7rem 18rem;
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
  text-align: center;
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
  @media (max-width: 769px) {
    width: 100%;
    border-bottom: none;
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
  border: 1px solid ${COLORS.GREY[400]};
  padding: 0.5rem 1rem 0.5rem 1rem;
  &:hover {
    font-weight: 500;
  }
`;
export const PagingWrapper = styled.div`
  padding-top: 10rem;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 80rem;
  @media (max-width: 769px) {
    width: 100%;
  }

  .pagination {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    gap: 0.5rem;
    cursor: pointer;
    z-index: 998;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${COLORS.GREY[600]};
    border-radius: 5rem;
  }

  ul.pagination li:first-child {
    border-radius: 1rem;
  }

  ul.pagination li:last-child {
    border-radius: 1rem;
  }

  ul.pagination li a {
    text-decoration: none;
    color: ${COLORS.GREY[600]};
    font-size: 1.5rem;
  }

  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: ${COLORS.BLACK};
  }
`;
