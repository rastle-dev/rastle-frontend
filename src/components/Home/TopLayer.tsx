import * as S from "@/styles/index/index.styles";
import React from "react";
import homeDesktopImage from "../../../public/image/homeDesktop2.jpg";

function TopLayer() {
  return (
    <S.ImageWrapper>
      <S.DesktopImage
        src={homeDesktopImage}
        alt="home.jpg"
        layout="fill"
        objectFit="cover"
        placeholder="blur"
      />
      <S.MobileImage
        src="/image/homeMobile1.jpg"
        alt="/image/homeMobile1.jpg"
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
