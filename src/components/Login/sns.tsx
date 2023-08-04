import React from "react";
import * as S from "@/pages/login/index.styles";

export default function SNSLogin() {
  return (
    <S.SNSLogin>
      <S.NAVERLogo>
        <img src="/naver.png" alt="네이버 로고" />
        <div>네이버로 로그인하기</div>
      </S.NAVERLogo>
      <S.KAKAOLogo>
        <img
          src="https://cdn.imweb.me/upload/S20210304872ba49a108a8/89a68d1e3674a.png"
          alt="카카오 로고"
        />
        <div>카카오로 로그인하기</div>
      </S.KAKAOLogo>
    </S.SNSLogin>
  );
}
