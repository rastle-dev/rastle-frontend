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
  @media (max-width: 500px) {
    width: 92%;
  }
`;
export const Line = styled.div`
  border-bottom: 0.5px solid;
  color: ${COLORS.GREY[200]};
  width: 100%;
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

export const NOPRODUCT = styled.div`
  padding-bottom: 40rem;
  font-weight: 400;
  padding-top: 3rem;
  width: 43rem;
  color: ${COLORS.GREY[500]};
`;
export const FilterBox = styled.div`
  width: 88%;
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  gap: 0.5rem;
  @media (max-width: 500px) {
    width: 98%;
  }
`;

export const FilterButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  p {
    font-weight: ${(props) =>
      props.isSelected ? 400 : 200}; // isSelected 값에 따라 색상 변경
    font-size: 1.2rem;
    color: ${(props) =>
      props.isSelected
        ? COLORS.BLACK
        : COLORS.GREY[400]}; // isSelected 값에 따라 색상 변경
  }
  cursor: pointer;
`;
export const Blank = styled.div`
  height: 4rem;
`;
