import React, { useEffect, useState } from "react";
import * as S from "@/styles/login/index.styles";
import API from "@/api/config";

export default function SNSLogin() {
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    const url = window.location.href;
    setCurrentURL(url);
    // 현재 URL에 대한 작업 수행
  }, []);
  console.log("current", currentURL);
  useEffect(() => {
    // URL에서 인가 코드 값을 추출.
    const searchParams = new URLSearchParams(window.location.search);
    console.log("searchParams", searchParams);
  }, []);

  return (
    <S.SNSLogin>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <S.NAVERLogo>
        <img src="/naver.png" alt="네이버 로고" />
        <div>네이버로 로그인하기</div>
      </S.NAVERLogo>
      <S.KAKAOLogo
        onClick={() => {
          console.log("click");
          window.location.href = currentURL.includes("localhost:3000")
            ? API.LOCAL_KAKAO_AUTH_URL
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
