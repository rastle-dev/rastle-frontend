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
// export const Container = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   margin-top: 5.5rem;
//   padding-top: 2rem;
//   border: 1px solid blue;
// `;

export const Header = styled.div`
  width: 88%;
  background-color: ${COLORS.화이트};
  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    padding: 4rem 0 5rem 0;
  }
  @media (max-width: 500px) {
    width: 92%;
  }
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
  width: 50%;
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
`;

export const ProductList = styled.div`
  display: grid;
  width: 88%;
  grid-template-columns: repeat(4, 1fr);
  ${media.xsmall} {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2.5rem;
    width: 95%;
  }
  ${media.small} {
    grid-template-columns: repeat(auto-fill, minmax(30%, auto));
    row-gap: 2.5rem;
    width: 90%;
  }

  //padding-top: 4.8rem;
  column-gap: 1%;
  row-gap: 8rem;
`;
export const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  padding-top: 1rem;
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
