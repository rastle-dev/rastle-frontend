import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import ColorButton from "@/components/Common/ColorButton";
import COLORS from "@/constants/color";
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
import { GetServerSideProps } from "next";
import commonServerSideProps from "@/components/Product/commonServerSideProps";
import Head from "next/head";
import calculateDiscountPercentAndPrice from "@/utils/calculateDiscountedPrice";
import CountTable from "@/components/Product/CountTable";

export const getServerSideProps: GetServerSideProps = commonServerSideProps;

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

  const [isLoginModalVisible, setLoginModalVisible] = useState(false);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log(detailData);

  const { discountPercent } = calculateDiscountPercentAndPrice(
    detailData?.data.price,
    detailData?.data.discountPrice,
  );

  console.log(selectedProduct);

  return (
    <S.Wrapper>
      <Head>
        <title>{detailData?.data.name} | RECORDY SLOW</title>
        <meta name="description" content={detailData?.data.name} />
        <meta name="keywords" content={detailData?.data.name} />
      </Head>
      {isDialogOpen && (
        <Dialog
          title="해당 장바구니에 상품이 담겼습니다 🛒"
          confirm="쇼핑 계속하기"
          refuse="장바구니로 이동하기"
          size={45}
          onClickRefuseButton={() => {
            router.push({
              pathname: PATH.MYPAGE,
              query: { tab: "장바구니" },
            });
          }}
          onClickConfirmButton={() => {
            closeDialog();
          }}
          visible
        />
      )}
      <S.TopLayer>
        <S.ImageLayer>
          <ImageSliderPage
            images={detailData?.data.mainImage.imageUrls}
            alt={detailData?.data.name}
          />
        </S.ImageLayer>
        <S.ProductContent>
          <S.Title>{detailData?.data.name}</S.Title>
          {detailData?.data.price === detailData?.data.discountPrice ? (
            <S.Price>
              <h4>{detailData?.data.price.toLocaleString()}원</h4>
            </S.Price>
          ) : (
            <S.DiscountPrice>
              <h4>{detailData?.data.price.toLocaleString()}원</h4>
              <span>{discountPercent}%</span>
              {detailData?.data.discountPrice.toLocaleString()}원
            </S.DiscountPrice>
          )}
          <S.ColorText>색상</S.ColorText>
          <S.ColorList>
            {uniqueColors.map((color) => (
              <ColorButton
                clicked={color === selectedProduct.color}
                color={COLORS[color as keyof typeof COLORS]}
                onClick={() => handleColorClick(color as keyof typeof COLORS)} // 클릭 핸들러 연결
                dataCy="color-button"
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
                dataCy="size-button"
              />
            ))}
          </S.SizeButtonList>
          {selectedProducts.length > 0 && (
            <>
              <S.ProductCountText>수량</S.ProductCountText>
              {selectedProducts.map((product) => (
                <CountTable
                  product={product}
                  key={product.key}
                  inputChangeHandler={inputChangeHandler}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleDelete={handleDelete}
                />
              ))}
            </>
          )}
          <S.TotalPrice>
            총 상품 금액:{" "}
            {calculateTotalPrice(selectedProducts).toLocaleString()}원 (
            {calculateTotalCount(selectedProducts)}개)
          </S.TotalPrice>
          <S.Pay>
            {isLoginModalVisible && (
              <Dialog
                title="로그인 후에 이용 가능한 기능이에요!"
                confirm="쇼핑 계속하기"
                refuse="로그인 하러가기"
                size={45}
                onClickRefuseButton={() => {
                  setLoginModalVisible(false); // 모달 창 닫기
                  const returnUrl = `${router.pathname}?${router.asPath.split("?")[1]}`;
                  localStorage.setItem("returnUrl", returnUrl);
                  router.push({ pathname: PATH.LOGIN });
                }}
                onClickConfirmButton={() => {
                  setLoginModalVisible(false); // 모달 창 닫기
                }}
                visible
              />
            )}

            <S.StyledBuyButton
              onClick={async () => {
                if (selectedProducts.length === 0) {
                  toast.dismiss();
                  toastMsg("구매하실 제품을 선택해주세요!");
                } else if (localStorage.getItem("accessToken")) {
                  try {
                    await onClickOrderButton();
                  } catch (error) {
                    // onClickOrderButton이 프로미스를 reject할 경우의 처리
                    console.error(error);
                    // 추가적인 에러 처리 또는 사용자에게 알림을 보여줄 수 있습니다.
                  }
                } else {
                  setLoginModalVisible(true); // 로그인 모달 창 띄우기
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
                  setLoginModalVisible(true); // 로그인 모달 창 띄우기
                }
              }}
              title="장바구니에 담기"
              type="shop"
            />
          </S.Pay>
        </S.ProductContent>
      </S.TopLayer>
      <S.ProductDetailList>
        {detailData?.data.detailImage.imageUrls?.map((img: string) => (
          <S.ProductDetail
            src={img}
            alt={detailData?.data.name}
            layout="responsive"
            width={100}
            height={100}
          />
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
