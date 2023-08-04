import React from "react";
import Input from "@/components/common/Input";
import * as S from "./index.styles";
import { StyledInput } from "./index.styles";

const inputData = [
  {
    label: "이메일주소",
    size: 28.75,
    placeholder: "예) rastle@rastle.com",
    buttonTitle: "전송",
    buttonType: "small",
  },
  {
    label: "인증번호",
    size: 28.75,
    placeholder: "",
    buttonTitle: "확인",
    buttonType: "small",
  },
  {
    label: "비밀번호",
    size: 35,
    placeholder: "영문,숫자,특수문자 조합 8~16자",
  },
  {
    label: "비밀번호 확인",
    size: 35,
  },
  {
    label: "휴대폰 번호",
    size: 35,
    placeholder: "예) 01012345678",
  },
];

export default function Signup() {
  return (
    <S.Wrapper>
      <S.Title>회원가입</S.Title>
      {inputData.map((data) => (
        <div key={data.label}>
          {data.buttonTitle ? (
            <S.InputWithButtonDiv>
              <Input
                placeholder={data.placeholder}
                size={data.size}
                label={data.label}
              />
              <S.ButtonWrapper>
                <S.StyledButton title={data.buttonTitle} />
              </S.ButtonWrapper>
            </S.InputWithButtonDiv>
          ) : (
            <S.DefaultInputDiv>
              <Input
                size={data.size}
                placeholder={data.placeholder}
                label={data.label}
              />
            </S.DefaultInputDiv>
          )}
        </div>
      ))}

      <S.CheckBoxWithText>
        <StyledInput size={1.125} type="checkbox" />
        <h3>개인정보 수집 및 이용 동의 (필수)</h3>
        <h3>자세히</h3>
      </S.CheckBoxWithText>
      <S.SignupButtonDiv>
        <S.SignupButton title="가입하기" />
      </S.SignupButtonDiv>
    </S.Wrapper>
  );
}
Signup.displayName = "User";
