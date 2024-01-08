import styled from "styled-components";
import COLORS from "@/constants/color";
import Button from "@/components/Common/Button";
import media from "@/styles/media";

export const Temp = styled.div`
  margin-top: 5.5rem;
  padding-top: 2rem;
  width: 100%;
  background-color: #f5f5f5;
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
  ${media.xsmall} {
    width: 100%;
  }
  margin-bottom: 15rem;
`;

export const Header = styled.div`
  width: 81%;
  background-color: ${COLORS.WHITE};
  ${media.small} {
    width: 92%;
  }
  ${media.xsmall} {
    width: 92%;
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    padding: 4rem 0 4.27rem 0;
    margin: 0;
  }
`;
export const InfoWrapper = styled.div`
  width: 81%;
  ${media.small} {
    width: 92%;
  }
  ${media.xsmall} {
    width: 92%;
  }
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

export const OrdererInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding-top: 2.65rem;
  padding-bottom: 2.65rem;
  border-top: 1px solid #9b9b9b;
  border-bottom: 1px solid #9b9b9b;
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
  ${media.small} {
    width: 7rem;
  }
  ${media.xsmall} {
    width: 7rem;
  }
`;
export const Data = styled.div`
  font-weight: 400;
  font-size: 1.1rem;
`;
export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 2.6rem;
`;
export const TotalInfo = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
`;
export const TotalPrice = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${COLORS.BLUE};
`;

export const ButtonDiv = styled.div`
  padding-top: 5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const StyledBuyButton = styled(Button)`
  font-size: 1.18rem;
  font-weight: 400;
  width: 17rem;
  height: 4.8rem;
  border-radius: 0.45455rem;

  ${media.mobile} {
    width: 40%;
  }
`;
