import React, { useState } from "react";
import Input from "@/components/common/Input";
import * as S from "./index.styles";

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
const PriceInfo = [
  { meta: "상품 합계", data: "86,600원" },
  { meta: "할인 금액", data: "0원" },
];
export default function Order() {
  const DeliveryButtons = [
    { id: 1, clicked: false, default: "기본 배송지" },
    { id: 2, clicked: false, default: "신규 배송지" },
  ];
  const PaymentOptionsButtons = [
    { id: 1, clicked: false, default: "신용/체크 카드" },
    { id: 2, clicked: false, default: "카카오페이" },
    { id: 3, clicked: false, default: "토스페이" },
  ];
  const deliveryInputs = [
    { label: "받는 분", placeholder: "함민혁" },
    { label: "우편번호", size: 75, title: "검색하기" },
    { label: "상세 주소" },
    { label: "연락처", placeholder: "010-3009-2255" },
  ];
  const [clickedPaymentButtonIndex, setClickedPaymentButtonIndex] =
    useState(null);
  const [clickedDeliveryButtonIndex, setClickedDeliveryButtonIndex] =
    useState(null);

  const handleDeliveryButtonClick = (index: any) => {
    setClickedDeliveryButtonIndex(index);
  };
  const handlePaymentButtonClick = (index: any) => {
    setClickedPaymentButtonIndex(index);
  };
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
          <h2>배송 주소</h2>
          <S.AddressSettingBox>
            {DeliveryButtons.map((button, index) => (
              <S.AddressButton
                key={button.id}
                onClick={() => handleDeliveryButtonClick(index)}
              >
                <S.StyledCheckbox>
                  <S.ClickBox
                    isChecked={index === clickedDeliveryButtonIndex}
                  />
                </S.StyledCheckbox>
                <p>{button.default}</p>
              </S.AddressButton>
            ))}
          </S.AddressSettingBox>
          {deliveryInputs.map((input) => (
            <S.DeliveryBox key={input.label}>
              {input.size ? (
                <S.Postal>
                  <S.DeliveryInput label={input.label} size={input.size} />
                  <S.PostalButtonWrapper>
                    <S.PostalButton title={input.title} />
                  </S.PostalButtonWrapper>
                </S.Postal>
              ) : (
                <S.DeliveryInput
                  label={input.label}
                  placeholder={input.placeholder}
                  size={input.size}
                />
              )}
            </S.DeliveryBox>
          ))}
          <S.SettingDefaultAddress>
            <Input type="checkbox" />
            <p>기본 배송지로 설정하기</p>
          </S.SettingDefaultAddress>
          <S.OrderCommentWrapper>
            <h3>배송 시 요청 사항</h3>
            <Input />
            <p>
              제주 및 도서 산간 지역의 배송은 추가 배송비가 발생할 수 있습니다.
            </p>
          </S.OrderCommentWrapper>
          <S.PaymentInfoWrapper>
            <h2>결제 정보</h2>
            <S.PaymentInfoBox>
              {PriceInfo.map((info) => (
                <div>
                  <S.PriceCategory>{info.meta}</S.PriceCategory>
                  <S.Price>{info.data}</S.Price>
                </div>
              ))}
            </S.PaymentInfoBox>
            <S.Total>
              <S.TotalInfo>결제 금액</S.TotalInfo>
              <S.TotalPrice>86,600원</S.TotalPrice>
            </S.Total>
          </S.PaymentInfoWrapper>
          <h2>결제 방법</h2>
          <S.PaymentOptions>
            {PaymentOptionsButtons.map((button, index) => (
              <S.PaymentOptionsButton
                key={button.id}
                onClick={() => handlePaymentButtonClick(index)}
              >
                <S.PaymentOptionsCheckbox>
                  <S.PaymentOptionsClickBox
                    isChecked={index === clickedPaymentButtonIndex}
                  />
                </S.PaymentOptionsCheckbox>
                <p>{button.default}</p>
              </S.PaymentOptionsButton>
            ))}
          </S.PaymentOptions>
          <S.PaymentButton title="결제하기" />
        </S.InfoWrapper>
      </S.Container>
    </S.Temp>
  );
}