import React, { useState } from "react";
import * as S from "./index.styles";
import Input from "@/components/common/Input";
import { DeliveryInput } from "./index.styles";
import Button from "@/components/common/Button";

type ProductCategory = "전체" | "1차 마켓" | "이전 마켓" | "이벤트";

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
    productName: "트랙 샌딩 워시드 와이드 흑청 데님 틴 워시드 버뮤다 데님 팬츠",
    totalPrice: "35,800원",
    amount: 1,
    size: "M",
    color: "검정",
  },
];
const OrdererInfo = [
  { meta: "이름", data: "함민혁" },
  { meta: "연락처", data: "010-3009-2255" },
  { meta: "이메일", data: "ham9893@naver.com" },
];
export default function Order() {
  return (
    <S.Temp>
      <S.Container>
        <S.Header>
          <h1>배송/결제</h1>
        </S.Header>
        <S.InfoWrapper>
          <h2>제품 정보</h2>
          {ProductList.map((item) => (
            <S.Product>
              <S.Thumbnail src="/example_1.png" alt="/example_1.png" />
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
          <h2>주문자 정보</h2>
          <S.OrdererInfo>
            {OrdererInfo.map((info) => (
              <S.Box>
                <S.Meta>{info.meta}</S.Meta>
                <S.Data>{info.data}</S.Data>
              </S.Box>
            ))}
          </S.OrdererInfo>
        </S.InfoWrapper>
      </S.Container>
    </S.Temp>
  );
}
