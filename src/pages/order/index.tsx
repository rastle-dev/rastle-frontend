import DaumPostcode from "react-daum-postcode";
import Input from "@/components/Common/Input";
import * as S from "@/styles/order/index.styles";
import LoadingBar from "@/components/LoadingBar";
import React from "react";
import { CouponImage } from "@/styles/mypage/coupon/index.styles";
import useCoupon from "@/hooks/mypage/coupon/useCoupon";
import COLORS from "@/constants/color";
import Icon from "@/components/Common/Icon";
import useOrder from "../../hooks/useOrder";

type ProductItem = {
  productName: string;
  title: string;
  productPrice: string;
  price: string;
  count: number;
  size: string;
  color: string;
  mainThumbnailImage: string;
};
export default function Order() {
  const {
    clickedPaymentButtonIndex,
    clickedDeliveryButtonIndex,
    openPostcode,
    handleDeliveryButtonClick,
    handlePaymentButtonClick,
    handlePostal,
    deliveryInputs,
    PaymentOptionsButtons,
    DeliveryButtons,
    OrdererInfo,
    handlePaymentSubmit,
    totalPriceSum,
    orderProducts,
    totalPriceSumDirect,
    totalPriceFinal,
    PriceInfo,
    selectedProducts,
    cartProduct,
    toggleCoupon,
    selectedCoupon,
    handleCouponToggle,
    isCouponVisible,
    isDefaultAddress,
    handleCheckboxChange,
  } = useOrder();

  const { couponData, isLoading } = useCoupon();

  let parsedProducts;
  if (selectedProducts) {
    parsedProducts = JSON.parse(selectedProducts as string);
  }

  if (totalPriceSumDirect === undefined) {
    return <LoadingBar type={6} />;
  }

  if (totalPriceSum === undefined) {
    return <LoadingBar type={6} />;
  }

  if (parsedProducts === undefined) {
    return <LoadingBar type={6} />;
  }

  return (
    <S.Temp>
      <S.Container>
        <S.Header>
          <h1>배송/결제</h1>
        </S.Header>
        <S.InfoWrapper>
          <h2>제품 정보</h2>
          {cartProduct &&
          cartProduct?.data.content.filter((v: any) =>
            orderProducts.split(",").map(Number)?.includes(v.cartProductId),
          ).length !== 0
            ? cartProduct?.data.content
                .filter((v: any) =>
                  orderProducts
                    .split(",")
                    .map(Number)
                    ?.includes(v.cartProductId),
                )
                .map((item: ProductItem) => (
                  <S.Product>
                    <S.Thumbnail
                      src={item.mainThumbnailImage}
                      alt={item.mainThumbnailImage}
                    />
                    <S.Info>
                      <S.ProductName>{item.productName}</S.ProductName>
                      <S.NumPrice>
                        {item.count}개 /{" "}
                        {`${item.productPrice.toLocaleString()}원`}
                      </S.NumPrice>
                      <S.SizeColor>
                        {item.size} / {item.color}
                      </S.SizeColor>
                    </S.Info>
                  </S.Product>
                ))
            : parsedProducts.map((item: ProductItem) => (
                <S.Product>
                  <S.Thumbnail
                    src={item.mainThumbnailImage}
                    alt={item.mainThumbnailImage}
                  />
                  <S.Info>
                    <S.ProductName>{item.title}</S.ProductName>
                    <S.NumPrice>
                      {item.count}개 / {`${item.price.toLocaleString()}원`}
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
                    onChange={input.onChange}
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
                  size={input.size}
                  value={input.value}
                  onChange={input.onChange}
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
            <Input
              type="checkbox"
              checked={isDefaultAddress}
              onChange={handleCheckboxChange}
            />
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
            <S.CouponTittleWrapper>
              <S.CouponTittleInner1>할인쿠폰</S.CouponTittleInner1>
              <S.CouponTittleInner2>
                보유쿠폰 {couponData?.data.couponInfos.length}장
              </S.CouponTittleInner2>
            </S.CouponTittleWrapper>
            <S.CouponToggleWrapper onClick={handleCouponToggle}>
              <S.CouponToggleInner1>
                <Icon
                  iconSize="2rem"
                  border={0.1}
                  iconName="ticket"
                  color={COLORS.BLACK}
                />
                <S.CouponToggleText>
                  사용가능한 쿠폰이 1장 있어요.
                </S.CouponToggleText>
              </S.CouponToggleInner1>
              <Icon
                iconSize="2rem"
                border={0.1}
                iconName="toggleDown"
                color={COLORS.BLACK}
              />
            </S.CouponToggleWrapper>
            {isCouponVisible && (
              <div>
                {couponData?.data.couponInfos.length === 0 ? (
                  <S.NODATA>사용 가능한 쿠폰이 없어요.</S.NODATA>
                ) : (
                  <>
                    <S.TabMenu>
                      {isLoading && <LoadingBar type={6} />}
                    </S.TabMenu>
                    <S.Table>
                      <S.TableContent>
                        {couponData?.data.couponInfos.map((item: any) => (
                          <S.ProductInfo key={item.id}>
                            <S.MobileTextInfo>
                              <S.TextInfo onClick={() => toggleCoupon(item.id)}>
                                <S.CouponWrapper>
                                  <S.CouponImgWrapper>
                                    <CouponImage
                                      src="/image/coupon.png"
                                      alt="/image/coupon.png"
                                      layout="fill"
                                      objectFit="cover"
                                    />
                                  </S.CouponImgWrapper>
                                  <S.CouponTextWrapper>
                                    <S.CouponText>{item.name}</S.CouponText>
                                    <S.CouponSubText>
                                      2024/03/29까지 전상품 적용
                                    </S.CouponSubText>
                                  </S.CouponTextWrapper>
                                </S.CouponWrapper>
                                {selectedCoupon === item.id ? (
                                  <Icon
                                    iconSize="2rem"
                                    border={0.1}
                                    iconName="checkCircleFill"
                                    color={COLORS.BLACK}
                                  />
                                ) : (
                                  <Icon
                                    iconSize="2rem"
                                    border={0.1}
                                    iconName="checkCircle"
                                    color={COLORS.BLACK}
                                  />
                                )}
                              </S.TextInfo>
                            </S.MobileTextInfo>
                          </S.ProductInfo>
                        ))}
                      </S.TableContent>
                    </S.Table>
                  </>
                )}
              </div>
            )}
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
              <S.TotalPrice>{totalPriceFinal}원</S.TotalPrice>
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
          <S.PaymentButton onClick={handlePaymentSubmit} title="결제하기" />
        </S.InfoWrapper>
      </S.Container>
    </S.Temp>
  );
}
