import React, { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import ColorButton from "@/components/Common/ColorButton";
import COLORS from "@/constants/color";
import Icon from "@/components/Common/Icon";
import ImageSliderPage from "@/components/Swiper/ImageSliderPage";
import * as S from "@/styles/product/index.styles";
import useProduct from "@/hooks/useProduct";
import Dialog from "@/components/Common/Dialog";
import PATH from "@/constants/path";
import toastMsg from "@/components/Toast";
import IconButton from "@/components/Common/IconButton";
import { toast } from "react-toastify";
import useCart from "@/hooks/mypage/cart/useCart";
import useDialog from "@/hooks/useDialog";
import useScroll from "@/hooks/useScroll";

export default function Product() {
  const router = useRouter();
  const { mutateAddCartProduct } = useCart();
  const { openDialog, closeDialog, isDialogOpen } = useDialog();
  const { scrollToTop, scrollToBottom, showScrollButton, handleScroll } =
    useScroll();
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
    uniqueColors,
    uniqueSizes,
    cartProducts,
    onClickOrderButton,
  } = useProduct();
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <ImageSliderPage images={detailData?.data.mainImage.imageUrls} />
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
                color={COLORS[color as keyof typeof COLORS]}
                onClick={() => handleColorClick(color as keyof typeof COLORS)} // 클릭 핸들러 연결
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
              onClick={async () => {
                if (selectedProducts.length === 0) {
                  toast.dismiss();
                  toastMsg("구매하실 제품을 선택해주세요!");
                } else {
                  try {
                    await onClickOrderButton();
                  } catch (error) {
                    // onClickOrderButton이 프로미스를 reject할 경우의 처리
                    console.error(error);

                    // 추가적인 에러 처리 또는 사용자에게 알림을 보여줄 수 있습니다.
                  }
                }
              }}
              title="구매하기"
              type="shop"
            />
            <S.StyledPayButton
              onClick={() => {
                if (localStorage.getItem("accessToken")) {
                  if (selectedProducts.length === 0) {
                    toastMsg("장바구니에 담을 제품을 선택해주세요!");
                  } else {
                    mutateAddCartProduct.mutate(cartProducts);
                    openDialog();
                  }
                } else {
                  router.push(PATH.LOGIN);
                }
              }}
              title="장바구니에 담기"
              type="shop"
            />
            <S.StyledNpayButton title="N Pay 구매하기" type="shop" />
          </S.Pay>
        </S.ProductContent>
      </S.TopLayer>
      <S.ProductDetailList>
        {detailData?.data.detailImage.imageUrls?.map((img: string) => (
          <S.ProductDetail src={img} />
        ))}
      </S.ProductDetailList>
      <S.ScrollWrapper className={showScrollButton ? "show" : ""}>
        <IconButton
          onClick={scrollToTop}
          iconName="arrowUp"
          color={COLORS.블랙}
        />
        <IconButton
          onClick={scrollToBottom}
          iconName="arrowDown"
          color={COLORS.블랙}
        />
      </S.ScrollWrapper>
    </S.Wrapper>
  );
}
