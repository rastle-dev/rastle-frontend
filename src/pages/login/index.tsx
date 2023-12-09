import React from "react";
import { useRouter } from "next/dist/client/router";
import { toast } from "react-toastify";
import SNSLogin from "@/components/Login/sns";
import PATH from "@/constants/path";
import useLogin from "@/hooks/useLogin";
import * as S from "@/styles/login/index.styles";
import errorMsg from "@/components/Toast/error";

export default function Login() {
  const router = useRouter();
  const { email, onChangeEmail, password, onChangePassword, mutateLogin } =
    useLogin();
  const buttons = [
    {
      productName: "이메일 가입",
      width: "12.3rem",
      onClick: () => router.push(PATH.SIGNUP),
    },
    {
      productName: "비밀번호 찾기",
      width: "12.3rem",
      // onClick: () => logout(),
    },
    {
      productName: "비회원 주문 조회",
      width: "12.3rem",
      onClick: () => router.push(PATH.GUEST),
    },
  ];
  const inputs = [
    {
      placeholder: "예) rastle@rastle.com",
      label: "이메일 주소",
      value: email,
      onChange: onChangeEmail,
    },
    {
      label: "비밀번호",
      type: "password",
      value: password,
      onChange: onChangePassword,
    },
  ];
  return (
    <S.Container>
      <S.Header>
        <h1>R E C O R D Y&nbsp;&nbsp; S L O W</h1>
        <h3>코디로 이해시키는 제품의 가치, @rastle_fashion</h3>
      </S.Header>
      <S.Wrapper>
        {inputs.map((input) => (
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
        {buttons.map((button, index) => (
          <React.Fragment key={button.productName}>
            <S.StyledButton
              title={button.productName}
              width={button.width}
              onClick={button.onClick}
            />
            {index < buttons.length - 1 && <S.Line />}
          </React.Fragment>
        ))}
      </S.Box>
      <SNSLogin />
    </S.Container>
  );
}

Login.displayName = "User";
