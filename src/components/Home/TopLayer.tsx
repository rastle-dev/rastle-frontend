import * as S from "@/styles/index/index.styles";
import React from "react";
import homeDesktopImage from "../../../public/image/homeDesktop2.jpg";

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
        <S.StyledButton title="view more" width="10rem" />
      </S.TextWrapper>
    </S.ImageWrapper>
  );
}
export default TopLayer;
