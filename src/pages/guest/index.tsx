import React from "react";
import { useRouter } from "next/router";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import PATH from "@/constants/path";
import * as S from "@/styles/guest/index.styles";

export default function Guest() {
  const router = useRouter();
  const inputs = [
    { size: 35, label: "이름" },
    { size: 35, label: "주문번호" },
  ];
  return (
    <S.Container>
      <S.Header>
        <h1>비회원 주문 조회</h1>
      </S.Header>
      <S.Wrapper>
        {inputs.map((input) => (
          <Input key={input.label} size={input.size} label={input.label} />
        ))}
        <Button children="주문 조회" width="35rem" disabled />
      </S.Wrapper>
      <S.Box>
        <S.AskMember>아직 회원이 아니신가요?</S.AskMember>
        <S.Signup
          onClick={() => {
            router.push(PATH.SIGNUP);
          }}
        >
          회원가입 하러 가기
        </S.Signup>
      </S.Box>
    </S.Container>
  );
}
Guest.displayName = "User";
