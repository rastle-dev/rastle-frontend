import React from "react";
import * as S from "@/styles/login/index.styles";
import PATH from "@/constants/path";
import { useRouter } from "next/router";

export default function SNSLogin() {
  const router = useRouter();

  return (
    <S.SNSLogin>
      <S.NAVERLogo
        onClick={() => {
          router.push(PATH.ERROR);
        }}
      >
        <img src="/naver.png" alt="네이버 로고" />
        <div>네이버로 로그인하기</div>
      </S.NAVERLogo>
      <S.KAKAOLogo
        onClick={() => {
          router.push(PATH.ERROR);
        }}
      >
        <img
          src="https://cdn.imweb.me/upload/S20210304872ba49a108a8/89a68d1e3674a.png"
          alt="카카오 로고"
        />
        <div>카카오로 로그인하기</div>
      </S.KAKAOLogo>
    </S.SNSLogin>
  );
}
