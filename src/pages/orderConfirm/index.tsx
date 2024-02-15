import React from "react";
import * as S from "@/styles/orderconfirm/index.styles";
import useOrderConfirm from "@/hooks/useOrderConfirm";
import PATH from "@/constants/path";
import { router } from "next/client";

export default function Order() {
  const { ProductList, OrdererInfo, parsedOrderInfo } = useOrderConfirm();
  return (
    <S.Temp>
      <style>
        {`
          @media (min-width: 1px) and (max-width: 767px) {
            html{
              font-size: 11px;
            }
          }
        `}
      </style>
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
                  {item.count}개 / {item.price}원
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
              {parsedOrderInfo.paid_amount
                ? `${parsedOrderInfo.paid_amount}`
                : `${parsedOrderInfo.amount}`}
              원
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
    </S.Temp>
  );
}
