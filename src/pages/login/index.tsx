import React from "react";
import { useRouter } from "next/router";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import SNSLogin from "@/components/Login/sns";
import PATH from "@/constants/path";
import * as S from "./index.styles";

export default function Login() {
  const router = useRouter();
  const buttons = [
    {
      itemName: "이메일 가입",
      width: "11.6875rem",
      onClick: () => router.push(PATH.SIGNUP),
    },
    { itemName: "비밀번호 찾기", width: "11.75rem" },
    {
      itemName: "비회원 주문 조회",
      width: "11.4375rem",
      onClick: () => router.push(PATH.GUEST),
    },
  ];
  const inputs = [
    { size: 35, placeholder: "예) rastle@rastle.com", label: "이메일 주소" },
    { size: 35, label: "비밀번호", type: "password" },
  ];
  return (
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
            type={input.type}
          />
        ))}
        <Button title="로그인" width="35rem" disabled />
      </S.Wrapper>
      <S.Box>
        {buttons.map((button, index) => (
          <React.Fragment key={button.itemName}>
            <S.StyledButton
              title={button.itemName}
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
