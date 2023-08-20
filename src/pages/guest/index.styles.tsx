import styled from "styled-components";
import COLORS from "@/constants/color";

export const Container = styled.div`
  width: 36rem;
  padding-top: 10rem;
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
  margin-top: 8rem;
  width: 36rem;
  display: flex;
  flex-direction: column;
  gap: 2.7rem;
  align-items: center;
`;

export const Box = styled.div`
  width: 36rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  padding: 3.3rem 0.5rem 3.3rem 0.5rem;
  p {
    color: ${COLORS.GREY[400]};
    font-weight: 300;
  }
  button {
    color: ${COLORS.블랙};
    font-weight: 300;
    cursor: pointer;
  }
`;

export const AskMember = styled.div`
  color: ${COLORS.GREY[400]};
  font-weight: 300;
`;
export const Signup = styled.div`
  color: ${COLORS.블랙};
  font-weight: 300;
  cursor: pointer;
`;
