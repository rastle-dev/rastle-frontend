// pages/404.js
import styled from "styled-components";
import React from "react";
import Button from "@/components/Common/Button";
import COLORS from "@/constants/color";
import PATH from "@/constants/path";
import { useRouter } from "next/dist/client/router";
import * as S from "@/components/Home/SignupPopup/index.styles";

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
    font-weight: 300;
    width: 25rem;
    margin-bottom: 3rem;
    text-align: center;
    @media (max-width: 769px) {
      width: 20rem;
    }
  }
`;
const StyledButton = styled(Button)`
  background-color: ${COLORS.BLACK};
  color: ${COLORS.WHITE};
  border-radius: 5px;
  padding: 0.6rem 0 0.6rem 0;
  font-size: 0.8rem;
  border: none;

  &:hover {
    border: none;
    background-color: ${COLORS.BLACK};
    color: white;
  }
  margin-bottom: 0.7rem;
`;

export default function Error() {
  const router = useRouter();
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
      <h3>
        예상치 못한 오류가 발생하였습니다. 서버의 일시적인 장애이거나, 네트워크
        문제일 수 있습니다.관리자에게 요청하여 빠른 시 안에 해결하겠습니다.
      </h3>
      <StyledButton
        type="default"
        width="16rem"
        title="메인페이지로 돌아가기"
        onClick={() => {
          router.push(PATH.HOME);
        }}
      />
    </Wrap>
  );
}
