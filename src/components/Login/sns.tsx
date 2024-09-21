import React from "react";
import * as S from "@/styles/login/index.styles";
import API from "@/api/config";
import errorMsg from "@/components/Toast/error";

export default function SNSLogin() {
  return (
    <S.SNSLogin>
      <S.NAVERLogo
        onClick={() => {
          errorMsg("서비스 종료로 네이버 로그인은 사용이 불가능합니다.");
        }}
      >
        <img src="/naver.png" alt="네이버 로고" />
        <div>네이버로 로그인하기</div>
      </S.NAVERLogo>
      <S.KAKAOLogo
        onClick={() => {
          window.location.href = API.KAKAO_AUTH_URL;
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
