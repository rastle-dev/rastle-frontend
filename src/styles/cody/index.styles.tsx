import styled from "styled-components";
import COLORS from "@/constants/color";
import media from "@/styles/media";
import Image from "next/image";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8rem;
`;
export const SetBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const Line = styled.div`
  width: 88%;
  height: 0.2px;
  margin-top: 4rem;
  margin-bottom: 6rem;
  background-color: ${COLORS.GREY[400]};
  ${media.xsmall} {
    width: 95%;
  }
  ${media.small} {
    width: 90%;
  }
`;

export const CurrentMarketWrapper = styled.div`
  width: 50rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  h2 {
    width: 88%;
    font-size: 1.5rem;
    font-weight: 400;
    padding-top: 3rem;
    padding-bottom: 2rem;
    margin: 0;
    ${media.xsmall} {
      width: 95%;
    }
    ${media.small} {
      width: 90%;
    }
  }
  ${media.xsmall} {
    width: 95%;
  }
  ${media.small} {
    width: 90%;
  }
`;
export const FirstMarketDescription = styled.div`
  width: 88%;
  font-weight: 400;
  p {
    font-weight: 300;
    font-size: 1.5rem;
  }
  ${media.xsmall} {
    width: 95%;
  }
  ${media.small} {
    width: 90%;
  }
  font-size: 2rem;
  padding-bottom: 0.5rem;
`;

export const MarketIMG = styled(Image)`
  width: 88%;
  height: auto;
  aspect-ratio: 0.77;
  ${media.xsmall} {
    width: 95%;
  }
  ${media.small} {
    width: 90%;
  }
`;

export const ProductList = styled.div`
  display: grid;
  width: 88%;
  justify-content: center;
  align-content: center;
  grid-template-columns: repeat(2, 1fr);
  ${media.xsmall} {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2.5rem;
    width: 95%;
  }
  ${media.small} {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2.5rem;
    width: 90%;
  }
  column-gap: 1%;
  row-gap: 2rem;
`;
