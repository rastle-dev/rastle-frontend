import React from "react";
import DaumPostcode from "react-daum-postcode";
import Input from "@/components/common/Input";
import * as S from "./index.styles";
import useOrder from "../../hooks/useOrder";

export default function Order() {
  const {
    clickedPaymentButtonIndex,
    clickedDeliveryButtonIndex,
    openPostcode,
    handleDeliveryButtonClick,
    handlePaymentButtonClick,
    handlePostal,
    ProductList,
    deliveryInputs,
    PaymentOptionsButtons,
    DeliveryButtons,
    PriceInfo,
    OrdererInfo,
  } = useOrder();
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
          <h1>배송/결제</h1>
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
                  <S.DeliveryInput
                    label={input.label}
                    size={input.size}
                    value={input.value}
                  />
                  <S.PostalButtonWrapper>
                    <S.PostalButton
                      title={input.title}
                      onClick={() => handlePostal.clickButton()}
                    />
                  </S.PostalButtonWrapper>
                </S.Postal>
              ) : (
                <S.DeliveryInput
                  label={input.label}
                  placeholder={input.placeholder}
                  size={input.size}
                  value={input.value}
                />
              )}
              {input.size && openPostcode && (
                <DaumPostcode
                  onComplete={handlePostal.selectAddress}
                  autoClose={false}
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
