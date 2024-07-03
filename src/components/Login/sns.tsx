import React, { useState } from "react";
import * as S from "@/styles/login/index.styles";
import API from "@/api/config";

export default function SNSLogin() {
  const [currentURL] = useState("");

  return (
    <S.SNSLogin>
      <S.NAVERLogo
        onClick={() => {
          window.location.href = currentURL.includes("localhost:3000")
            ? API.NAVER_AUTH_URL
            : API.NAVER_AUTH_URL;
        }}
      >
        <img src="/naver.png" alt="네이버 로고" />
        <div>네이버로 로그인하기</div>
      </S.NAVERLogo>
      <S.KAKAOLogo
        onClick={() => {
          window.location.href = currentURL.includes("localhost:3000")
            ? API.KAKAO_AUTH_URL
            : API.KAKAO_AUTH_URL;
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
