import React from "react";
import { toast } from "react-toastify";
import SNSLogin from "@/components/Login/sns";
import useLogin from "@/hooks/useLogin";
import * as S from "@/styles/login/index.styles";
import errorMsg from "@/components/Toast/error";
import Head from "next/head";

export default function Login() {
  const {
    email,
    password,
    mutateLogin,
    bottomButtons,
    loginFormInputs,
    handleSubmit,
  } = useLogin();
  return (
    <form onSubmit={handleSubmit}>
      <Head>
        <title>로그인 - RECORDY SLOW</title>
      </Head>
      <S.Container>
        <S.Header>
          <h1>R E C O R D Y&nbsp;&nbsp; S L O W</h1>
          <h3>코디로 이해시키는 제품의 가치</h3>
        </S.Header>
        <S.Wrapper>
          {loginFormInputs.map((input) => (
            <S.StyledInput
              key={input.label}
              placeholder={input.placeholder}
              label={input.label}
              type={input.type}
              onChange={input.onChange}
            />
          ))}
          <S.LoginButton
            title="로그인"
            width="100%"
            onClick={() => {
              if (!(email && password)) {
                toast.dismiss();
                errorMsg("아이디 및 비밀번호를 확인해주세요");
              } else {
                mutateLogin.mutate({ email, password });
              }
            }}
          />
        </S.Wrapper>
        <S.Box>
          {bottomButtons.map((button, index) => (
            <React.Fragment key={button.productName}>
              <S.StyledButton
                title={button.productName}
                width={button.width}
                onClick={button.onClick}
              />
              {index < bottomButtons.length - 1 && <S.Line />}
            </React.Fragment>
          ))}
        </S.Box>

        <SNSLogin />
      </S.Container>
    </form>
  );
}

Login.displayName = "User";
