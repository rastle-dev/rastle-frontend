import styled, { keyframes } from "styled-components";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import media from "@/styles/media";
import COLORS from "@/constants/color";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  //height: 55rem;
  width: 37rem;
  //width: 40rem;
  //width: 100%;
  //overflow: scroll; // 세로 스크롤 사용
  h2 {
    font-size: 1rem;
    flex-shrink: 0;
    font-weight: 600;
  }
  margin-bottom: 10rem;

  ${media.mobile} {
    width: 100%;
  }
`;

export const StyledInput = styled(Input)`
  width: 100%;
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

  ${media.mobile} {
    width: 100%;
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
      border: none;
      font-weight: 400;
    }
  }
`;

export const StyledButtonInput = styled(Input)`
  width: 100%;
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

  ${media.mobile} {
    width: 100%;
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
      border: none;
      font-weight: 400;
    }
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 3.5rem;
  font-weight: 400;
  line-height: normal;
  padding-top: 1rem;
  padding-bottom: 3.5rem;
  margin: 0;
  @media (max-width: 769px) {
    padding-top: 1rem;
    font-size: 3rem;
    padding-bottom: 3rem;
  }
`;

export const InputWithButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2.19rem;
  width: 100%;
`;

export const DefaultInputDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 2.19rem;
  font-size: 1.4rem;
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
    font-size: 1.1rem;
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
  width: 6rem;
  padding: 0.8rem;
  font-size: 1.2rem;
`;

export const SignupButton = styled(Button)`
  height: 4.375rem;
  flex-shrink: 0;
  width: 100%;
  font-size: 1.3rem;

  ${media.mobile} {
    font-size: 1.6rem;
  }
`;

// export const StyledInput = styled(Input)`
//   padding: 0;
//   margin: 0;
// `;

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
  width: 100%;
  flex-direction: row;
  padding-top: 2.19rem;
  opacity: 0;
  &.show-text {
    opacity: 1;
    animation: ${fadeInDown} 0.7s forwards;
  }
`;

export const ViewMoreButton = styled(Button)`
  padding-left: 1rem;
  font-size: 1.1rem;
  border: none;
  font-weight: 500;
  text-decoration: underline;

  &:hover {
    border: none;
    font-weight: 600;
  }
  &:focus {
    border: none;
  }
`;
