import React from "react";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import * as S from "./index.styles";

function Login() {
  const buttons = [
    { title: "이메일 가입", width: "11.6875rem" },
    { title: "비밀번호 찾기", width: "11.75rem" },
    { title: "비회원 주문 조회하기", width: "11.4375rem" },
  ];
  const inputs = [
    { size: 35, placeholder: "예) rastle@rastle.com", label: "이메일 주소" },
    { size: 35, label: "비밀번호" },
  ];
  return (
    <DefaultLayout>
      <S.Container>
        <S.Header>
          <h1>로그인</h1>
          <h3>레슬페션 슬로건레슬페션 슬로건레슬페션 슬로건</h3>
        </S.Header>
        <S.Wrapper>
          {inputs.map((input) => (
            <Input
              key={input.label}
              size={input.size}
              placeholder={input.placeholder}
              label={input.label}
            />
          ))}
          <Button title="로그인" width="35rem" />
        </S.Wrapper>
        <S.Box>
          {buttons.map((button, index) => (
            <React.Fragment key={button.title}>
              <S.StyledButton title={button.title} width={button.width} />
              {index < buttons.length - 1 && <S.Line />}
            </React.Fragment>
          ))}
        </S.Box>
      </S.Container>
    </DefaultLayout>
  );
}

export default Login;
