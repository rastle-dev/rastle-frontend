import styled from "styled-components";
import COLORS from "@/constants/color";
import Input from "@/components/common/Input";

export const Temp = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Container = styled.div`
  width: 62%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  //border: 1px solid red;
`;

export const Header = styled.div`
  width: 79%;
  background-color: ${COLORS.WHITE};
  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    padding: 8rem 0 4.27rem 0;
    margin: 0;
  }
`;
export const InfoWrapper = styled.div`
  width: 81%;
  background-color: ${COLORS.WHITE};
  h2 {
    font-size: 1.666rem;
    margin: 0;
    padding-bottom: 1.65rem;
  }
`;
export const Product = styled.div`
  display: flex;
  gap: 3.27rem;
  padding-bottom: 2.65rem;
`;
export const Thumbnail = styled.img`
  width: 7.7rem;
  height: 8.4rem;
  border-radius: 0.45455rem;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 1.2rem;
`;
export const ProductName = styled.div`
  font-size: 1.333rem;
  font-weight: 400;
  //padding-bottom: 1.545rem;
`;
export const NumPrice = styled.div`
  font-size: 1.333rem;
  font-weight: 200;
  //padding-bottom: 1.18rem;
`;
export const SizeColor = styled.div`
  font-size: 1.333rem;
  font-weight: 400;
`;

export const OrdererInfo = styled.div`
  //border: 1px solid red;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding-bottom: 2.65rem;
`;
export const Box = styled.div`
  display: flex;
  gap: 6rem;
`;
export const Meta = styled.div`
  color: ${COLORS.GREY[400]};
  font-weight: 200;
  font-size: 1.1rem;
  width: 3.4rem;
`;
export const Data = styled.div`
  font-weight: 400;
  font-size: 1.1rem;
`;

export const DeliveryInput = styled(Input)`
  font-size: 1.333rem;
  width: ${(props) => (props.label === "우편번호" ? "100%" : "100%")};
`;
