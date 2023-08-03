import styled from "styled-components";
import COLORS from "../../constants/color";
import Button from "@/components/common/Button";

export const Container = styled.div`
  width: 36rem;
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
  display: flex;
  align-items: center;
  margin-top: 1rem;
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
export const SNSLogin = styled.div`
  margin-top: 2.7rem;
  width: 36rem;
  display: flex;
  flex-direction: column;
  gap: 1.375rem;
  align-items: center;
`;
export const NAVERLogo = styled.div`
  width: 35rem;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid ${COLORS.GREY[200]};
  img {
    width: 2.7rem;
    height: 2.7rem;
    margin: 1rem 0 1rem 1.375rem;
  }
  div {
    font-size: 1rem;
    padding: 1.6rem 0 1.6rem 0;
  }
  display: flex;
  gap: 10rem;
`;
export const KAKAOLogo = styled.div`
  width: 35rem;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid ${COLORS.GREY[200]};
  img {
    width: 2.5rem;
    height: 2.5rem;
    margin: 1.1rem 0 1.1rem 1.375rem;
  }
  div {
    font-size: 1rem;
    padding: 1.6rem 0 1.6rem 0;
  }
  display: flex;
  gap: 10rem;
`;
