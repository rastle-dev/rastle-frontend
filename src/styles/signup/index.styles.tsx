import styled, { keyframes } from "styled-components";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  //height: 55rem;
  width: 35rem;
  //width: 100%;
  //overflow: scroll; // 세로 스크롤 사용
  h2 {
    font-size: 1rem;
    flex-shrink: 0;
    font-weight: 600;
  }
  margin-bottom: 10rem;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 3.4375rem;
  font-weight: 500;
  line-height: normal;
  padding-bottom: 3.5rem;
  margin: 0;
  @media (max-width: 769px) {
    font-size: 3rem;
  }
`;

export const InputWithButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2.19rem;
`;

export const DefaultInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2.19rem;
`;

export const ButtonWrapper = styled.div`
  margin-left: 0.7rem;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export const ButtonTimerWrapper = styled.div`
  margin-left: 0.7rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 2rem;
`;

export const CheckBoxWithText = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 1.5rem;
  padding-bottom: 2.5rem;
  justify-content: flex-start;
  align-items: center;
  h3 {
    font-size: 1rem;
    margin-left: 0.94rem;
  }

  h4 {
    font-size: 1rem;
    margin-left: 0.44rem;
  }
  input {
    margin-bottom: 0.35rem;
  }
`;

export const SignupButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  border-radius: 0.625rem;
  width: 5.3rem;
  padding: 0.62rem;
  font-size: 1rem;
`;

export const SignupButton = styled(Button)`
  height: 4.375rem;
  flex-shrink: 0;
  //padding-left: 15rem;
  //padding-right: 15rem;
  width: 100%;
  //@media (max-width: 440px) {
  //  padding-left: 11.5rem;
  //  padding-right: 11.5rem;
  //}
`;

export const StyledInput = styled(Input)`
  padding: 0;
  margin: 0;
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;
export const CodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2.19rem;
  opacity: 0;
  &.show-text {
    opacity: 1;
    animation: ${fadeInDown} 0.7s forwards;
  }
`;
