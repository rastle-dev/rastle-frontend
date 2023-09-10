import React from "react";
import ColorButton from "@/components/common/ColorButton";
import COLORS from "@/constants/color";
import Icon from "@/components/common/Icon";
import ImageSliderPage from "@/components/Swiper/ImageSliderPage";
import * as S from "@/styles/product/index.styles";
import useProduct from "@/hooks/useProduct";

export default function Product() {
  const {
    handleColorClick,
    handleSizeClick,
    inputChangeHandler,
    handleIncrement,
    handleDecrement,
    handleDelete,
    calculateTotalPrice,
    calculateTotalCount,
    selectedProduct,
    selectedProducts,
    jsonData,
  } = useProduct();

  return (
    <S.Wrapper>
      <S.TopLayer>
        <S.ImageLayer>
          <ImageSliderPage images={jsonData.images} />
        </S.ImageLayer>
        <S.ProductContent>
          <S.Title>{jsonData.title}</S.Title>
          {/* <S.Price>{jsonData.price.toLocaleString()}원</S.Price> */}
          <S.DiscountPrice>
            <h4>{jsonData.price.toLocaleString()}원</h4>
            <span>10% </span>
            {jsonData.price.toLocaleString()}원
          </S.DiscountPrice>
          <S.ColorText>색상</S.ColorText>
          <S.ColorList>
            {jsonData.colors.map((color) => (
              <ColorButton
                key={color}
                size={3}
                clicked={color === selectedProduct.color}
                // @ts-ignore
                color={COLORS[color]}
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
                // disabled={!selectedProduct.color} // 컬러 선택 전에는 비활성화
                isActive={selectedProduct.size === size}
              />
            ))}
          </S.SizeButtonList>
          {selectedProducts.length > 0 && (
            <>
              <S.ProductCountText>수량</S.ProductCountText>
              {selectedProducts.map((product) => (
                <React.Fragment key={`${product.size}-${product.color}`}>
                  <S.ProductCountInfo>
                    <S.ProductCountLeftInfo>
                      <S.ProductCountTitle>{product.title}</S.ProductCountTitle>
                      <S.ProductCountColor>
                        {product.color} /{" "}
                      </S.ProductCountColor>
                      <S.ProudctCountSize>{product.size}</S.ProudctCountSize>
                    </S.ProductCountLeftInfo>
                    <S.ProductCountRightInfo>
                      <S.ProductCountButton
                        type="number"
                        min={1}
                        value={product.count}
                        onChange={(event) => inputChangeHandler(event)}
                      />
                      <S.NumberInputContainer>
                        <S.CountUpButton
                          src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_up.gif"
                          onClick={() => handleIncrement(product.key)}
                        />
                        <S.CountDownButton
                          src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_down.gif"
                          onClick={() => handleDecrement(product.key)}
                        />
                      </S.NumberInputContainer>
                      <S.ProductCountDelete>
                        <Icon
                          size="1.2rem"
                          iconName="delete"
                          color={COLORS.GREY.상세페이지}
                          onClick={() => handleDelete(product.key)}
                        />
                      </S.ProductCountDelete>
                    </S.ProductCountRightInfo>
                  </S.ProductCountInfo>
                </React.Fragment>
              ))}
            </>
          )}
          <S.TotalPrice>
            총 상품 금액:{" "}
            {calculateTotalPrice(selectedProducts).toLocaleString()}원 (
            {calculateTotalCount(selectedProducts)}개)
          </S.TotalPrice>
          <S.Pay>
            <S.StyledBuyButton title="구매하기" type="shop" />
            <S.StyledPayButton title="장바구니에 담기" type="shop" />
            <S.StyledNpayButton title="N Pay 구매하기" type="shop" />
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
