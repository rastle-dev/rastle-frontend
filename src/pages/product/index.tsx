import React, { useState } from "react";
import ImageSwiper from "@/components/Swiper";
import ColorButton from "@/components/common/ColorButton";
import COLORS from "@/constants/color";
import Icon from "@/components/common/Icon";
import * as S from "./index.styles";

export default function Product() {
  // 상태 변수들

  interface SelectedProduct {
    title?: string;
    price?: number;
    color?: string | null;
    size?: string | null;
    count: number;
  }

  // TODO: 의성) 실제 데이터 api호출로 추가 , 비동기처리 주의해야함
  const jsonData = {
    images: [
      "/image/product5.jpg",
      "/image/product6.jpg",
      "/image/product1.jpg",
      "/image/whiteBackground.png",
    ],
    title: "틴 워시드 버뮤다 데님 팬츠",
    price: 56200,
    colors: [COLORS.WHITE, COLORS.BLACK, COLORS.BLUE],
    sizes: ["M", "L"],
    remain: {
      M: 3,
      L: 4,
    },
    imageDetails: ["/image/product5.jpg", "/image/homeDesktop2.jpg"],
  };

  // TODO: 의성) title, price에 api에서 받아온 실제 제품의 정보 기입
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>({
    title: jsonData.title,
    price: jsonData.price,
    color: null,
    size: null,
    count: 0, // 기본 수량
  });

  // 컬러 버튼 클릭 핸들러
  const handleColorClick = (color: string) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      color,
      size: null,
      count: 0,
    }));
    // setShowProductCount(false); // "수량" 부분 숨김
  };

  // 사이즈 버튼 클릭 핸들러
  const handleSizeClick = (size: string) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      size,
      count: 1, // 사이즈를 고르면 count가 1 증가함
    }));
  };

  const inputChangeHandler = (event: any) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      count: event.target.value,
    }));
  };

  const handleIncrement = () => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      count: prevProduct.count + 1,
    }));
  };

  const handleDecrement = () => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      count: prevProduct.count - 1,
    }));
  };
  console.log(selectedProduct);
  return (
    <S.Wrapper>
      <S.TopLayer>
        <S.ImageLayer>
          <ImageSwiper images={jsonData.images} />
        </S.ImageLayer>
        <S.ProductContent>
          <S.Title>{jsonData.title}</S.Title>
          <S.Price>{jsonData.price}원</S.Price>
          <S.ColorText>색상</S.ColorText>
          <S.ColorList>
            {jsonData.colors.map((color) => (
              <ColorButton
                key={color}
                size={3}
                clicked={color === selectedProduct.color}
                color={color}
                onClick={() => handleColorClick(color)} // 클릭 핸들러 연결
              />
            ))}
          </S.ColorList>
          <S.SizeText>사이즈</S.SizeText>
          <S.SizeButtonList>
            {jsonData.sizes.map((size) => (
              <S.SizeButton
                key={size}
                title={size}
                type="size"
                onClick={() => handleSizeClick(size)} // 클릭 핸들러 연결
                disabled={!selectedProduct.color} // 컬러 선택 전에는 비활성화
                isActive={selectedProduct.size === size}
              />
            ))}
          </S.SizeButtonList>
          {selectedProduct.count > 0 && (
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
                  <S.ProductCountButton
                    type="number"
                    min={1}
                    value={selectedProduct.count}
                    onChange={inputChangeHandler}
                  />
                  <S.NumberInputContainer>
                    <S.CountUpButton
                      src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_up.gif"
                      onClick={handleIncrement}
                    />
                    <S.CountDownButton
                      src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_down.gif"
                      onClick={handleDecrement}
                    />
                  </S.NumberInputContainer>
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
