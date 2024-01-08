import React from "react";
import * as S from "@/styles/orderconfirm/index.styles";

export default function OrderConfirmMobile() {
  type ProductItem = {
    productName: string;
    totalPrice: string;
    amount: number;
    size: string;
    color: string;
  };

  const ProductList: ProductItem[] = [
    {
      productName: "틴 워시드 버뮤다 데님 팬츠",
      totalPrice: "95,800원",
      amount: 3,
      size: "L",
      color: "인디고",
    },
    {
      productName:
        "트랙 샌딩 워시드 와이드 흑청 데님 틴 워시드 버뮤다 데님 팬츠",
      totalPrice: "35,800원",
      amount: 1,
      size: "M",
      color: "검정",
    },
  ];
  const OrdererInfo = [
    { meta: "받는사람", data: "홍레슬" },
    { meta: "연락처", data: "010-xxxx-xxxx" },
    {
      meta: "받는주소",
      data: "(00000) 서울특별시 송파구 xxx xx길 xx",
    },
    {
      meta: "배송요청사항",
      data: "부재시 경비실에 맡겨주세요 !",
    },
  ];

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
                src="/image/product1.jpg"
                alt="/image/product1.jpg"
              />
              <S.Info>
                <S.ProductName>{item.productName}</S.ProductName>
                <S.NumPrice>
                  {item.amount}개 / {item.totalPrice}
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
            <S.TotalPrice>86,600원</S.TotalPrice>
          </S.Total>
          <S.ButtonDiv>
            <S.StyledBuyButton title="쇼핑하러 가기" type="shop" />
          </S.ButtonDiv>
        </S.InfoWrapper>
      </S.Container>
    </S.Temp>
  );
}
