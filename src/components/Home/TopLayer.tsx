import * as S from "@/styles/index/index.styles";
import React from "react";
import homeDesktopImage from "../../../public/image/homeDesktop2.jpg";
import COLORS from "@/constants/color";

function TopLayer() {
  return (
    <S.ImageWrapper>
      <S.DesktopImage
        src={homeDesktopImage}
        alt="래슬패션"
        layout="fill"
        objectFit="cover"
      />
      <S.MobileImage
        src="/image/homeMobile1.jpg"
        alt="래슬패션"
        layout="fill"
        objectFit="cover"
      />
      <S.TextWrapper>
        <S.Text>코디로 이해시키는 제품의 가치 </S.Text>
        <S.Text2>RECORDY SLOW</S.Text2>
        <S.Text3> (해당 사이트는 개발중입니다.) </S.Text3>
        <S.Text3>
          <a href="https://smartstore.naver.com/rastle">
            네이버 스마트스토어 RECORDY SLOW 👈
          </a>
          를 이용해주시면 감사하겠습니다 :)
        </S.Text3>

        <S.StyledButton title="view more" width="10rem" />
      </S.TextWrapper>
    </S.ImageWrapper>
  );
}
export default TopLayer;
