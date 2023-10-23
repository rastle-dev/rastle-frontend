import styled from "styled-components";
import COLORS from "@/constants/color";
import media from "@/styles/media";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5.5rem;
  padding-top: 2rem;
`;

export const Header = styled.div`
  width: 88%;
  background-color: ${COLORS.화이트};
  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    padding: 4rem 0 5rem 0;
  }
`;
export const Line = styled.div`
  border-bottom: 0.5px solid;
  color: ${COLORS.GREY[200]};
  width: 100%;
`;
export const SetBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7rem;
`;

export const CurrentMarketWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  h2 {
    width: 88%;
    font-size: 2rem;
    font-weight: 300;
    padding-top: 3rem;
    margin: 0;
    ${media.xsmall} {
      width: 95%;
    }
    ${media.small} {
      width: 90%;
    }
  }
`;
export const FirstMarketDescription = styled.div`
  padding-top: 5rem;
  width: 88%;
  font-weight: 400;
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

  padding-top: 4.8rem;
  column-gap: 1%;
  row-gap: 8rem;
`;
export const BundleProductList = styled.div`
  border: 1px solid red;
`;
export const Product = styled.div`
  background-color: transparent;
  width: 100%;
`;
export const Img = styled.img`
  width: 100%;
`;
export const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  padding-top: 1rem;
`;
export const Name = styled.div`
  font-size: 1.5rem;
  padding-top: 1rem;
  font-weight: 200;
  width: 100%;
`;
export const Event = styled.div`
  font-size: 1.5rem;
  padding-top: 1rem;
  color: ${COLORS.레드};
  font-weight: 300;
`;
