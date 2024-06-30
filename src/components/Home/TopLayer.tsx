import * as S from "@/styles/index/index.styles";
import React from "react";
import PATH from "@/constants/path";
import { useRouter } from "next/dist/client/router";
import homeDesktopImage from "../../../public/image/homeDesktop2.jpg";

function TopLayer() {
  const router = useRouter();
  return (
    <S.ImageWrapper>
      <S.DesktopImage
        src={homeDesktopImage}
        alt="래슬패션"
        layout="fill"
        objectFit="cover"
      />
      <S.MobileImage
        src="/image/homemobile1_1.jpeg"
        alt="래슬패션"
        layout="fill"
        objectFit="cover"
      />
      <S.TextWrapper>
        <S.Text>코디로 이해시키는 제품의 가치 </S.Text>
        <S.Text2>RECORDY SLOW</S.Text2>

        <S.StyledButton
          title="view more"
          width="10rem"
          onClick={() => {
            router.push(PATH.SHOP);
          }}
        />
      </S.TextWrapper>
    </S.ImageWrapper>
  );
}
export default TopLayer;
