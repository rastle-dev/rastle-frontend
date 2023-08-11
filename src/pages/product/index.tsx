import React, { useState } from "react";
import ImageSwiper from "@/components/Swiper";
import * as S from "./index.styles";
import ColorButton from "@/components/common/ColorButton";
import COLORS from "@/constants/color";
import Icon from "@/components/common/Icon";

export default function Product() {
  // 상태 변수들
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showProductCount, setShowProductCount] = useState(false);

  // 컬러 버튼 클릭 핸들러
  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(null); // 사이즈 선택 초기화
    setShowProductCount(false); // "수량" 부분 숨김
  };

  // 사이즈 버튼 클릭 핸들러
  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    setShowProductCount(true); // "수량" 부분 보이기
  };
  const images = [
    "/image/product5.jpg",
    "/image/product6.jpg",
    "/image/product1.jpg",
    "/image/whiteBackground.png",
    // 추가적인 이미지 경로를 여기에 추가합니다
  ];

  const colors = [COLORS.WHITE, COLORS.BLACK, COLORS.BLUE];

  const sizes = ["M", "L"];

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
            {colors.map((color) => (
              <ColorButton
                key={color}
                size={3}
                buttonType="default"
                color={color}
                // isActive={selectedColor === color} // isActive 설정
                onClick={() => handleColorClick(color)} // 클릭 핸들러 연결
              />
            ))}
            <ColorButton size={3} color={COLORS.YELLOW} buttonType="clicked" />
          </S.ColorList>
          <S.SizeText>사이즈</S.SizeText>
          <S.SizeButtonList>
            {sizes.map((size) => (
              <S.SizeButton
                key={size}
                title={size}
                type="size"
                onClick={() => handleSizeClick(size)} // 클릭 핸들러 연결
                disabled={!selectedColor} // 컬러 선택 전에는 비활성화
                isActive={selectedSize === size}
              />
            ))}
          </S.SizeButtonList>
          {showProductCount && (
            <>
              {/* "수량"과 이후 컨텐츠 */}
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
                  <S.ProductCountButton type="number" min={1} />
                  <S.ProductCountDelete>
                    <Icon
                      size="1.2rem"
                      iconName="delete"
                      color={COLORS.GREY.상세페이지}
                    />
                  </S.ProductCountDelete>
                </S.ProductCountRightInfo>
              </S.ProductCountInfo>
              <S.TotalPrice>총 상품 금액: 128,000(4개)</S.TotalPrice>
            </>
          )}
          <S.Pay>
            <S.StyledPayButton title="구매하기" type="shop" />
            <S.StyledPayButton title="장바구니에 담기" type="shop" />
            <S.StyledPayButton title="N Pay 구매하기" type="shop" />
          </S.Pay>
        </S.ProductContent>
      </S.TopLayer>
      <S.ProductDetailList>
        <S.ProductDetail src="/image/product5.jpg" />
        <S.ProductDetail src="/image/homeDesktop2.jpg" />
      </S.ProductDetailList>
    </S.Wrapper>
  );
}
