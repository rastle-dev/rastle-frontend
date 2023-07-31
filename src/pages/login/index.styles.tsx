import styled from "styled-components";
import Button from "@/components/Button";
import COLORS from "../../constants/color";

export const Container = styled.div`
  width: 36rem;
  border: 1px solid blue;
`;

export const Header = styled.div`
  width: 36rem;
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  h1 {
    margin: 0;
    font-size: 3.4375rem;
    font-weight: 500;
    text-align: center;
  }
  h3 {
    margin: 0;
    text-align: center;
    font-weight: 200;
    font-size: 1.5rem;
  }
`;

export const Wrapper = styled.div`
  margin-top: 6.75rem;
  width: 36rem;
  display: flex;
  flex-direction: column;
  gap: 2.7rem;
  align-items: center;
`;
export const Box = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0rem;
`;
export const Line = styled.div`
  width: 1px;
  height: 0.9375rem;
  background-color: ${COLORS.BLACK};
`;

export const StyledButton = styled(Button)`
  border: none;
  &:hover {
    border: none;
  }
  font-size: 1rem;
`;
