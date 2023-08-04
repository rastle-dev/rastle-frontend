import React from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import * as S from "./index.styles";

const inputData = [
  {
    label: "이메일주소",
    size: 28.75,
    value: "rastle@naver.com",
    buttonTitle: "전송",
    buttonType: "small",
  },
  {
    label: "인증번호",
    size: 28.75,
    value: "label",
    buttonTitle: "확인",
    buttonType: "small",
  },
  {
    label: "비밀번호",
    size: 35,
    value: "영문,숫자,특수문자 조합 8~16자",
  },
  {
    label: "비밀번호 확인",
    size: 35,
    value: "1234134",
  },
  {
    label: "휴대폰 번호",
    size: 35,
    value: "예) 01012345678",
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
              <Input size={data.size} value={data.value} label={data.label} />
              <S.ButtonWrapper>
                <Button title={data.buttonTitle} type={data.buttonType} />
              </S.ButtonWrapper>
            </S.InputWithButtonDiv>
          ) : (
            <S.DefaultInputDiv>
              <Input size={data.size} value={data.value} label={data.label} />
            </S.DefaultInputDiv>
          )}
        </div>
      ))}

      <S.CheckBoxWithText>
        <Input size={1.125} type="checkbox" />
        <h3>개인정보 수집 및 이용 동의 (필수)</h3>
        <h3>자세히</h3>
      </S.CheckBoxWithText>
      <S.SignupButton>
        <Button title="가입하기" type="default" />
      </S.SignupButton>
    </S.Wrapper>
  );
}
