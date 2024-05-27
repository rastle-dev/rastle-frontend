// pages/404.js
import styled from "styled-components";
import React from "react";
import Button from "@/components/Common/Button";
import COLORS from "@/constants/color";
import PATH from "@/constants/path";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";

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
    width: 43rem;
    margin-bottom: 3rem;
    text-align: center;
    @media (max-width: 769px) {
      width: 20rem;
    }
  }
`;
export const LOGOWrapper = styled.div`
  width: 15rem;
  height: 15rem;
  position: relative;
`;
export const LOGOImage = styled(Image)`
  width: 100%;
`;
const StyledButton = styled(Button)`
  background-color: ${COLORS.BLACK};
  color: ${COLORS.WHITE};
  border-radius: 5px;
  padding: 1rem 0 1rem 0;
  font-size: 1rem;
  border: none;

  &:hover {
    border: none;
    background-color: ${COLORS.BLACK};
    color: white;
  }
  margin-bottom: 0.7rem;
`;

export default function Custom404() {
  const router = useRouter();
  return (
    <Wrap>
      <LOGOWrapper>
        <LOGOImage
          src="/image/404.png"
          alt="/image/404.png"
          layout="fill"
          objectFit="cover"
        />
      </LOGOWrapper>
      <h2>R E C O R D Y&nbsp;&nbsp; S L O W</h2>
      <h3>
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. 입력하신 주소를
        다시 한번 확인해주세요.
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
