import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import ColorButton from "@/components/common/ColorButton";
import COLORS from "@/constants/color";
import Icon from "@/components/common/Icon";
import ImageSliderPage from "@/components/Swiper/ImageSliderPage";
import * as S from "@/styles/product/index.styles";
import useProduct from "@/hooks/useProduct";
import useMypage from "@/hooks/useMypage";
import Dialog from "@/components/common/Dialog";
import PATH from "@/constants/path";

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
    detailData,
    imageData,
    uniqueColors,
    uniqueSizes,
    cartProducts,
  } = useProduct();
  const router = useRouter();
  const { mutateAddCartProduct } = useMypage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <S.Wrapper>
      {isDialogOpen && (
        <Dialog
          onClickBasketButton={() => {
            router.push({
              pathname: PATH.MYPAGE,
              query: { tab: "장바구니" },
            });
          }}
          onClickShopButton={() => {
            closeDialog();
          }}
          visible
        />
      )}
      <S.TopLayer>
        <S.ImageLayer>
          <ImageSliderPage images={imageData?.data.mainImages} />
        </S.ImageLayer>
        <S.ProductContent>
          <S.Title>{detailData?.data.name}</S.Title>
          <S.DiscountPrice>
            <h4>{detailData?.data.price.toLocaleString()}원</h4>
            <span>10% </span>
            {detailData?.data.discountPrice.toLocaleString()}원
          </S.DiscountPrice>
          <S.ColorText>색상</S.ColorText>
          <S.ColorList>
            {uniqueColors.map((color) => (
              <ColorButton
                clicked={color === selectedProduct.color}
                /* eslint-disable @typescript-eslint/ban-ts-comment */
                // @ts-ignore
                color={COLORS[color]}
                onClick={() => handleColorClick(color)} // 클릭 핸들러 연결
              />
            ))}
          </S.ColorList>
          <S.SizeText>사이즈</S.SizeText>
          <S.SizeButtonList>
            {uniqueSizes.map((size: any) => (
              <S.SizeButton
                key={size}
                title={size}
                type="size"
                onClick={() => handleSizeClick(size)}
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
            <S.StyledBuyButton
              onClick={() => {
                router.push({
                  pathname: PATH.ORDER, // 이동할 페이지 경로
                  query: { selectedProducts: JSON.stringify(selectedProducts) },
                });
              }}
              title="구매하기"
              type="shop"
            />
            <S.StyledPayButton
              onClick={() => {
                mutateAddCartProduct.mutate(cartProducts);
                openDialog();
              }}
              title="장바구니에 담기"
              type="shop"
            />
            <S.StyledNpayButton title="N Pay 구매하기" type="shop" />
          </S.Pay>
        </S.ProductContent>
      </S.TopLayer>
      <S.ProductDetailList>
        {imageData?.data.detailImages?.map((img: string) => (
          <S.ProductDetail src={img} />
        ))}
      </S.ProductDetailList>
    </S.Wrapper>
  );
}
