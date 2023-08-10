import React from "react";
import ImageGallery from "@/components/Swiper";
import * as S from "./index.styles";

export default function Product() {
  const images = [
    "/image/product5.jpg",
    "/image/product6.jpg",
    "/image/product1.jpg",
    "/image/whiteBackground.png",
    // 추가적인 이미지 경로를 여기에 추가합니다
  ];

  return (
    <S.Wrapper>
      <S.TopLayer>
        <S.ImageLayer>
          <ImageGallery images={images} />
        </S.ImageLayer>
        <S.ProductContent>
          <S.Title>틴 워시드 버뮤다 데님 팬츠</S.Title>
          <S.Price>56,200원</S.Price>
          <S.Color>색상</S.Color>
          <S.Size>사이즈</S.Size>
          <S.ProductCount>수량</S.ProductCount>
          <S.TotalPrice>총 상품 금액: 128,000(4개)</S.TotalPrice>
          <S.Pay>구매하기</S.Pay>
        </S.ProductContent>
      </S.TopLayer>
    </S.Wrapper>
  );
}
