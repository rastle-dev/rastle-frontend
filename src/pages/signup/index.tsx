import React from "react";
import Input from "@/components/common/Input";
import * as S from "@/styles/signup/index.styles";
import useSignup from "@/hooks/useSignup";

type InputProps = {
  label: string;
  size: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  message?: string;
  placeholder?: string;
  readOnly?: boolean;
  isCertification?: {
    title?: string;
    size?: "large" | "medium" | "small";
    disabled?: boolean;
    theme?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  };
  inValid?: boolean;
};

export default function Signup() {
  const {
    username,
    onChangeUserName,
    onChangeEmailHandler,
    email,
    onChangeEmail,
    onChangeCode,
    password,
    onChangePassword,
    passwordCheck,
    onChangePasswordCheck,
    phoneNumber,
    onChangePhoneNumber,
    sendEmailCode,
    showText,
    codeMatch,
    checkEmailCode,
    isValidEmail,
    emailMessage,
    emailButton,
    duplicateCheck,
    codeMessage,
    signUp,
    togglePrivate,
    privateChecked,
  } = useSignup();

  const inputData: InputProps[] = [
    {
      label: "이메일주소",
      size: 28.75,
      placeholder: "예) rastle@rastle.com",
      // buttonTitle: "전송",
      onChange: onChangeEmailHandler,
      message:
        email.length > 0 && !isValidEmail(email)
          ? "이메일 형식이 틀렸습니다"
          : emailMessage,
      inValid: email.length > 0 && (!isValidEmail(email) || duplicateCheck),
      isCertification: {
        title: emailButton,
        disabled: (email.length > 0 && !isValidEmail(email)) || codeMatch,
        onClick: () => {
          sendEmailCode();
        },
      },
    },
    {
      label: "인증번호",
      size: 28.75,
      placeholder: "",
      onChange: onChangeCode,
      message: codeMessage,
      inValid: codeMessage === "코드가 일치하지 않습니다" && !codeMatch,
      isCertification: {
        title: "확인",
        disabled: codeMatch,
        onClick: () => {
          checkEmailCode();
        },
      },
    },
    {
      label: "비밀번호",
      type: "password",
      size: 35,
      placeholder: "영문,숫자,특수문자 조합 8~16자",
      onChange: onChangePassword,
      message:
        password.length > 0 && password.length < 8
          ? "비밀번호를 8자리 이상 입력하세요 "
          : "",
      inValid: password.length > 0 && password.length < 8,
    },
    {
      label: "비밀번호 확인",
      type: "password",
      size: 35,
      onChange: onChangePasswordCheck,
      message:
        password !== passwordCheck && passwordCheck.length > 0
          ? "비밀번호가 일치하지 않습니다."
          : "",
      inValid: password !== passwordCheck && passwordCheck.length > 0,
    },
    {
      label: "이름",
      size: 35,
      placeholder: "예) 홍레슬",
      onChange: onChangeUserName,
    },
    {
      label: "휴대폰 번호",
      size: 35,
      placeholder: "예) 01012345678",
      onChange: onChangePhoneNumber,
      inValid:
        phoneNumber.length > 0 &&
        !/^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/.test(phoneNumber),
      message:
        phoneNumber.length > 0 &&
        !/^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/.test(phoneNumber)
          ? "유효하지 않은 전화번호입니다"
          : "",
    },
  ];

  return (
    <S.Wrapper>
      <style>
        {`
            html{
              font-size: 12px;
            }
        `}
      </style>
      <S.Title>회원가입</S.Title>
      {inputData.map((data) => (
        <div key={data.label}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {data.isCertification ? (
            data.label === "이메일주소" ? (
              <S.InputWithButtonDiv>
                <Input
                  placeholder={data.placeholder}
                  size={data.size}
                  label={data.label}
                  onChange={data.onChange}
                  message={data.message}
                  inValid={data.inValid}
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
                    size={data.size}
                    label={data.label}
                    onChange={data.onChange}
                    message={data.message}
                    inValid={data.inValid}
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
                size={data.size}
                type={data.type}
                placeholder={data.placeholder}
                label={data.label}
                onChange={data.onChange}
                message={data.message}
                inValid={data.inValid}
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
        <h3>자세히</h3>
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
