import styled from "styled-components";
import COLORS from "@/constants/color";
import media from "@/styles/media";

export const Temp = styled.div`
  margin-top: 5.5rem;
  padding-top: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  width: 79%;
  ${media.mobile} {
    width: 100%;
  }
`;

export const Header = styled.div`
  width: 81%;
  background-color: ${COLORS.WHITE};
  ${media.mobile} {
    width: 92%;
  }

  h1 {
    font-size: 1.6rem;
    font-weight: 500;
  }
`;

export const MainTitle = styled.span`
  border-bottom: 1px solid;
  padding: 1rem 0 1rem 0;
  margin-bottom: 1.5rem;
`;

export const Title = styled.div`
  border-bottom: 0.5px solid grey;
  padding: 1rem 0 1rem 0;
  margin-bottom: 1.5rem;
`;

export const PriceTitle = styled.div`
  border-bottom: 0.5px solid grey;
  padding: 1rem 0 1rem 0;
`;

export const InfoWrapper = styled.div`
  width: 81%;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  ${media.mobile} {
    width: 92%;
  }

  background-color: ${COLORS.WHITE};
  h2 {
    font-size: 1.3rem;
    margin: 0;
    padding-bottom: 1.65rem;
  }
  p {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

export const TableDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

export const InnerLeft = styled.div`
  flex: 1.5;
  font-size: 1.1rem;
  font-weight: 300;

  ${media.mobile} {
    flex: 8;
  }
`;

export const InnerRight = styled.div`
  flex: 8.5;
  font-size: 1.1rem;
  font-weight: 400;

  ${media.mobile} {
    flex: 2;
  }
`;
export const InnerPriceLeft = styled.div`
  flex: 1.5;
  font-size: 1.3rem;
  font-weight: 300;

  ${media.mobile} {
    flex: 8;
  }
`;

export const InnerPriceRight = styled.div`
  flex: 8.5;
  font-size: 1.3rem;
  font-weight: 400;

  ${media.mobile} {
    flex: 2;
  }
`;

export const Product = styled.div`
  display: flex;
  gap: 3.27rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ebebeb;
`;
export const Thumbnail = styled.img`
  width: 7.7rem;
  height: auto;
  aspect-ratio: 0.77;
  border-radius: 0.45455rem;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 1.2rem;
  width: 100%;
`;
export const ProductName = styled.div`
  font-size: 1.333rem;
  font-weight: 400;
`;
export const NumPrice = styled.div`
  font-size: 1.333rem;
  font-weight: 200;
`;
export const SizeColor = styled.div`
  font-size: 1.333rem;
  font-weight: 400;
`;

export const Box = styled.div`
  display: flex;
  //gap: 6rem;
`;
export const Meta = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  width: 7rem;
  margin-right: 2rem;
  ${media.mobile} {
    width: 7rem;
  }
  ${media.mobile} {
    width: 7rem;
  }
`;
export const Data = styled.div`
  font-weight: 400;
  font-size: 1.1rem;
`;

export const TotalPrice = styled.div`
  background-color: #fafafa;
  height: 6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.7rem;
`;

export const DeliveryTitle = styled.div`
  border-bottom: 0.5px solid grey;
  padding: 1rem 0 1rem 0;
`;

export const DeliveryTableDiv = styled.div`
  display: flex;
  flex-direction: row;
  //padding: 0.5rem;
  //height: 4rem;
  border-bottom: 1px solid #ebebeb;
  padding: 1.3rem 0.5rem 1.4rem;
`;

export const DeliveryInnerLeft = styled.div`
  flex: 1.5;
  font-size: 1.1rem;
  font-weight: 300;

  ${media.mobile} {
    flex: 3;
  }
`;

export const DeliveryInnerRight = styled.div`
  flex: 8.5;
  font-size: 1.1rem;
  font-weight: 300;

  ${media.mobile} {
    flex: 7;
  }
`;

export const OrderTableDiv = styled.div`
  display: flex;
  flex-direction: row;
  //padding: 0.5rem;
  height: 4rem;
  border-bottom: 1px solid #ebebeb;
  padding: 1rem 0.5rem 1.1rem;
`;

export const OrderInnerLeft = styled.div`
  font-size: 1.1rem;
  font-weight: 300;
  padding-right: 0.3rem;
`;

export const OrderInnerRight = styled.div`
  font-size: 1.1rem;
  font-weight: 300;
`;
