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
  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    padding: 4rem 0 5rem 0;
  }
`;
export const Line = styled.div`
  border: 0.5px solid;
  color: ${COLORS.GREY[200]};
  width: 100%;
`;
