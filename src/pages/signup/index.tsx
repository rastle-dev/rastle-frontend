import React from "react";
import * as S from "@/styles/signup/index.styles";
import useSignup from "@/hooks/useSignup";
import Head from "next/head";
import Modal from "@/components/Common/Modal";
import EnterViewMoreModal from "@/components/Signup/EnterViewMoreModal";
import { ViewMoreButton } from "@/styles/signup/index.styles";

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
    handleLinkClick,
    isViewMoreModalOpen,
    setIsViewMoreModalOpen,
  } = useSignup();

  return (
    <S.Wrapper>
      {/* <style> */}
      {/*   {` */}
      {/*       html{ */}
      {/*         font-size: 11px; */}
      {/*       } */}
      {/*   `} */}
      {/* </style> */}
      <Head>
        <title>회원가입 - RECORDY SLOW</title>
      </Head>
      {isViewMoreModalOpen && (
        <Modal
          closeModal={() => {
            setIsViewMoreModalOpen(false);
            // openDialog();
          }}
          width={60}
        >
          <EnterViewMoreModal />
        </Modal>
      )}
      <S.Title>회원가입</S.Title>
      {inputData.map((data) => (
        <div key={data.label}>
          {data.isCertification && data.label === "이메일주소" && (
            <S.InputWithButtonDiv>
              <S.StyledButtonInput
                placeholder={data.placeholder}
                label={data.label}
                onChange={data.onChange}
                message={data.message}
                invalid={data.inValid}
                autoComplete="off"
              />
              <S.ButtonWrapper>
                <S.StyledButton
                  title={data.isCertification.title}
                  onClick={data.isCertification.onClick}
                  disabled={data.isCertification.disabled}
                />
              </S.ButtonWrapper>
            </S.InputWithButtonDiv>
          )}

          {data.isCertification && data.label !== "이메일주소" && showText && (
            <S.CodeContainer className="show-text">
              <S.StyledButtonInput
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
          )}

          {!data.isCertification && (
            <S.DefaultInputDiv>
              <S.StyledInput
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
        <ViewMoreButton title="내용 보기" onClick={handleLinkClick} />
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
