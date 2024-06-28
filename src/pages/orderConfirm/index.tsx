import React from "react";
import * as S from "@/styles/orderconfirm/index.styles";
import useOrderConfirm from "@/hooks/useOrderConfirm";
import PATH from "@/constants/path";
import { useRouter } from "next/router";
import OrderFail from "@/components/Order/OrderFail";
import useLoadingWithTimeout from "@/hooks/useLoadingWithTimeout";
import LoadingBar from "@/components/LoadingBar";

export default function OrderConfirm() {
  const router = useRouter();
  const { ProductList, OrdererInfo, receiverData, errorMsg } =
    useOrderConfirm();
  const { timedOut } = useLoadingWithTimeout();
  if (!receiverData && !timedOut) return <LoadingBar type={6} />;

  return (
    <S.Temp>
      {errorMsg ? (
        <OrderFail />
      ) : (
        <S.Container>
          <S.Header>
            <h1>주문이 완료되었습니다! 😄</h1>
          </S.Header>
          <S.InfoWrapper>
            <h2>제품 정보</h2>
            {ProductList.map((item) => (
              <S.Product>
                <S.Thumbnail
                  src={item.mainThumbnailImage}
                  alt={item.mainThumbnailImage}
                />
                <S.Info>
                  <S.ProductName>{item.title}</S.ProductName>
                  <S.NumPrice>
                    {item.count}개
                    {item.discountPrice !== undefined ? (
                      <S.PriceDiv>
                        <S.DiscountPrice>
                          {item.price?.toLocaleString()}원
                        </S.DiscountPrice>
                        <S.DiscountedPrice>
                          {item.discountPrice.toLocaleString()}원
                        </S.DiscountedPrice>
                      </S.PriceDiv>
                    ) : (
                      <S.Price>{item.price?.toLocaleString()}원</S.Price>
                    )}
                  </S.NumPrice>

                  <S.SizeColor>
                    {item.size} / {item.color}
                  </S.SizeColor>
                </S.Info>
              </S.Product>
            ))}
            <h2>주문 정보</h2>
            <S.OrdererInfo>
              {OrdererInfo.map((info) => (
                <S.Box>
                  <S.Meta>{info.meta}</S.Meta>
                  <S.Data>{info.data}</S.Data>
                </S.Box>
              ))}
            </S.OrdererInfo>
            <S.Total>
              <S.TotalInfo>결제 금액</S.TotalInfo>
              <S.TotalPrice>
                {receiverData?.data.paymentAmount.toLocaleString()}원
              </S.TotalPrice>
            </S.Total>
            <S.ButtonDiv>
              <S.StyledBuyButton
                title="쇼핑하러 가기"
                type="shop"
                onClick={() => {
                  router.push(PATH.SHOP);
                }}
              />
            </S.ButtonDiv>
          </S.InfoWrapper>
        </S.Container>
      )}
    </S.Temp>
  );
}
