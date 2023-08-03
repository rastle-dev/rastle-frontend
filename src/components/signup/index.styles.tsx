import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 8.38rem;

  h2 {
    font-size: 1rem;
    flex-shrink: 0;
    font-weight: 600;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 3.4375rem;
  font-weight: 500;
  flex-shrink: 0;
  line-height: normal;
  padding-bottom: 3.81rem;
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
  justify-content: flex-end;
`;

export const CheckBoxWithText = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
  padding-bottom: 2rem;
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
`;

export const SignupButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
