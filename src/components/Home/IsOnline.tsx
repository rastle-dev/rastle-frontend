import * as S from "@/components/Home/SignupPopup/index.styles";
import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  justify-content: center;
  height: 97.9vh;
  overflow: hidden;
  h2 {
    font-weight: 400;
  }
  h3 {
    font-weight: 400;
    width: 30rem;
    margin-bottom: 3rem;
    text-align: center;
    @media (max-width: 769px) {
      width: 20rem;
    }
  }
`;
export default function IsOnline() {
  return (
    <Wrap>
      <S.LOGOWrapper>
        <S.LOGOImage
          src="/image/LOGO_WHITE.png"
          alt="/image/LOGO_WHITE.png"
          layout="fill"
          objectFit="cover"
        />
      </S.LOGOWrapper>
      <h2>R E C O R D Y&nbsp;&nbsp; S L O W</h2>
      <h3>인터넷 연결이 끊겼습니다. 인터넷 연결을 확인하세요.</h3>
    </Wrap>
  );
}
IsOnline.displayName = "User";
