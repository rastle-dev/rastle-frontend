import React from "react";
import ImageSwiper from "@/components/Swiper";
import * as S from "./index.styles";
import ColorButton from "@/components/common/ColorButton";
import COLORS from "@/constants/color";
import Button from "@/components/common/Button";

export default function Product() {
  const images = [
    "/image/product5.jpg",
    "/image/product6.jpg",
    "/image/product1.jpg",
    "/image/whiteBackground.png",
    // 추가적인 이미지 경로를 여기에 추가합니다
  ];

  const colors = [];

  return (
    <S.Wrapper>
      <S.TopLayer>
        <S.ImageLayer>
          <ImageSwiper images={images} />
        </S.ImageLayer>
        <S.ProductContent>
          <S.Title>틴 워시드 버뮤다 데님 팬츠</S.Title>
          <S.Price>56,200원</S.Price>
          <S.ColorText>색상</S.ColorText>
          <S.ColorList>
            <ColorButton size={3} buttonType="default" color={COLORS.BLUE} />
            <ColorButton size={3} buttonType="default" color={COLORS.BLACK} />
          </S.ColorList>
          <S.SizeText>사이즈</S.SizeText>
          <S.SizeButtonList>
            <S.StyledButton title="M" type="size" />
            <S.StyledButton title="L" type="size" disabled={true} />
          </S.SizeButtonList>
          <S.ProductCountText>수량</S.ProductCountText>
          <S.ProductCountInfo>
            <S.ProductCountLeftInfo>
              <S.ProductCountTitle>
                틴 워시드 버뮤다 데님 팬츠
              </S.ProductCountTitle>
              <S.ProductCountColor>블랙 / </S.ProductCountColor>
              <S.ProudctCountSize>L</S.ProudctCountSize>
            </S.ProductCountLeftInfo>
            <S.ProductCountRightInfo>
              <S.ProductCountButton>버튼</S.ProductCountButton>
              <S.ProductCountDelete>삭제버튼</S.ProductCountDelete>
            </S.ProductCountRightInfo>
          </S.ProductCountInfo>
          <S.TotalPrice>총 상품 금액: 128,000(4개)</S.TotalPrice>
          <S.Pay>
            <S.StyledPayButton title="구매하기" type="shop" />
            <S.StyledPayButton title="장바구니에 담기" type="shop" />
            <S.StyledPayButton title="N Pay 구매하기" type="shop" />
          </S.Pay>
        </S.ProductContent>
      </S.TopLayer>
    </S.Wrapper>
  );
}
