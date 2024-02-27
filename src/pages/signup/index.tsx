import React from "react";
import Input from "@/components/Common/Input";
import * as S from "@/styles/signup/index.styles";
import useSignup from "@/hooks/useSignup";
import LazyLink from "@/components/LazyLink";
import PATH from "@/constants/path";
import Head from "next/head";

export default function Signup() {
  const {
    username,
    password,
    passwordCheck,
    phoneNumber,
    showText,
    codeMatch,
    signUp,
    togglePrivate,
    privateChecked,
    inputData,
  } = useSignup();

  return (
    <S.Wrapper>
      <style>
        {`
            html{
              font-size: 12px;
            }
        `}
      </style>
      <Head>
        <title>회원가입 - RECORDY SLOW</title>
      </Head>
      <S.Title>회원가입</S.Title>
      {inputData.map((data) => (
        <div key={data.label}>
          {data.isCertification ? (
            data.label === "이메일주소" ? (
              <S.InputWithButtonDiv>
                <Input
                  placeholder={data.placeholder}
                  label={data.label}
                  onChange={data.onChange}
                  message={data.message}
                  invalid={data.inValid}
                />
                <S.ButtonWrapper>
                  <S.StyledButton
                    title={data.isCertification.title}
                    onClick={data.isCertification.onClick}
                    disabled={data.isCertification.disabled}
                  />
                </S.ButtonWrapper>
              </S.InputWithButtonDiv>
            ) : (
              showText && (
                <S.CodeContainer className="show-text">
                  <Input
                    placeholder={data.placeholder}
                    label={data.label}
                    onChange={data.onChange}
                    message={data.message}
                    invalid={data.inValid}
                  />
                  <S.ButtonTimerWrapper>
                    <S.StyledButton
                      title={data.isCertification.title}
                      onClick={data.isCertification.onClick}
                      disabled={data.isCertification.disabled}
                    />
                  </S.ButtonTimerWrapper>
                </S.CodeContainer>
              )
            )
          ) : (
            <S.DefaultInputDiv>
              <Input
                type={data.type}
                placeholder={data.placeholder}
                label={data.label}
                onChange={data.onChange}
                message={data.message}
                invalid={data.inValid}
              />
            </S.DefaultInputDiv>
          )}
        </div>
      ))}

      <S.CheckBoxWithText>
        <input
          type="checkbox"
          checked={privateChecked}
          onChange={togglePrivate}
        />
        <h3>개인정보 수집 및 이용 동의 (필수)</h3>
        <LazyLink href={PATH.AGREEMENT}>
          <h3>자세히</h3>
        </LazyLink>
      </S.CheckBoxWithText>
      <S.SignupButtonDiv>
        <S.SignupButton
          onClick={signUp}
          title="가입하기"
          disabled={
            !(
              username.length > 0 &&
              codeMatch &&
              password === passwordCheck &&
              password.length >= 8 &&
              /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/.test(phoneNumber) &&
              privateChecked
            )
          }
        />
      </S.SignupButtonDiv>
    </S.Wrapper>
  );
}
Signup.displayName = "User";
