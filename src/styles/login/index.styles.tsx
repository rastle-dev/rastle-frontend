import styled from "styled-components";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import media from "@/styles/media";
import COLORS from "../../constants/color";

export const Container = styled.div`
  width: 37rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${media.mobile} {
    width: 100%;
  }
`;

export const Header = styled.div`
  ${media.mobile} {
    margin-top: 5rem;
    width: 100%;
  }
  width: 36rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  h1 {
    margin: 0;
    padding-top: 2rem;
    font-size: 2.5rem;
    font-weight: 400;
    text-align: center;
  }
  h3 {
    text-align: center;
    font-weight: 400;
    font-size: 1.5rem;
    margin-bottom: 4rem;
  }
`;

export const Wrapper = styled.div`
  ${media.mobile} {
    width: 100%;
  }
  margin-top: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.7rem;
  align-items: center;
`;
export const StyledInput = styled(Input)`
  //width: 37rem;
  height: 4rem;
  font-size: 1.2rem;
  &::placeholder {
    font-size: 1.2rem;
    border: none;
    font-weight: 400;
  }
  &:focus {
    border-bottom: 2px solid;
  }
  &:focus {
    border-bottom: ${(props) =>
      props.readOnly ? `0.07rem solid ${COLORS.GREY[300]}` : "2px solid"};
  }
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  @media (max-width: 1007px) {
    //width: 44rem;
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
      border: none;
      font-weight: 400;
    }
  }
`;
export const LoginButton = styled(Button)`
  //font-size: 1.2rem;
  ${media.mobile} {
    font-size: 1.6rem;
  }
`;
export const Box = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;
export const Line = styled.div`
  width: 1px;
  height: 0.9375rem;
  background-color: ${COLORS.블랙};
`;

export const StyledButton = styled(Button)`
  border: none;
  &:hover {
    border: none;
  }
  font-size: 1.2rem;
  ${media.mobile} {
    font-size: 1.4rem;
  }
  font-weight: 300;
`;
export const SNSLogin = styled.div`
  margin-top: 2.7rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.375rem;
  align-items: center;
`;
export const NAVERLogo = styled.div`
  width: 100%;
  border-radius: 12px;
  text-align: center;

  cursor: pointer;
  border: 1px solid ${COLORS.GREY[200]};
  img {
    width: 2.7rem;
    height: 2.7rem;
    margin: 1rem 0 1rem 1.375rem;
  }
  div {
    width: 100%;
    margin-right: 2.5rem;
    font-size: 1.2rem;
    padding: 1.6rem 0 1.6rem 0;
    ${media.mobile} {
      font-size: 1.6rem;
    }
  }
  display: flex;
`;
export const KAKAOLogo = styled.div`
  width: 100%;
  text-align: center;

  border-radius: 12px;
  cursor: pointer;
  border: 1px solid ${COLORS.GREY[200]};
  img {
    width: 2.5rem;
    height: 2.5rem;
    margin: 1.1rem 0 1.1rem 1.375rem;
  }
  div {
    width: 100%;
    margin-right: 2.5rem;
    font-size: 1.2rem;
    ${media.mobile} {
      font-size: 1.6rem;
    }
    padding: 1.6rem 0 1.6rem 0;
  }
  display: flex;
`;
