import styled from "styled-components";
import COLORS from "@/constants/color";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 92%;
  position: fixed;
  background-color: ${COLORS.WHITE};

  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    padding: 4rem 0 5rem 0;
  }
`;
export const Line = styled.div`
  border: 0.5px solid;
  color: ${COLORS.GREY[200]};
  padding-top: 20.3rem;
  width: 100%;
`;
export const FirstMarketDescription = styled.div`
  padding-top: 3rem;
  width: 92%;
  font-weight: 200;
  font-size: 2rem;
`;

export const ProductList = styled.div`
  display: grid;
  width: 92%;
  grid-template-columns: repeat(auto-fill, minmax(23%, auto));
  padding-top: 4.8rem;

  column-gap: 2rem;
  row-gap: 8rem;
`;
export const Product = styled.div`
  height: 43.25rem;
  background-color: transparent;
`;
export const Img = styled.img`
  height: 32.375rem;
  width: 28.6rem;
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
`;
export const Event = styled.div`
  font-size: 1.5rem;
  padding-top: 1rem;
  color: ${COLORS.RED};
  font-weight: 300;
`;
