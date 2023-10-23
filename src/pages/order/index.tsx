import DaumPostcode from "react-daum-postcode";
import Input from "@/components/common/Input";
import * as S from "@/styles/order/index.styles";
import useMypage from "@/hooks/useMypage";
import { useRouter } from "next/dist/client/router";
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
  } = useOrder();
  const { cartProduct } = useMypage();
  const router = useRouter();
  const { orderList } = router.query;
  const { selectedProducts } = router.query;

  const orderProducts: string = String(orderList);
  console.log("order", orderProducts);
  if (typeof selectedProducts === "string") {
    console.log("selectedProducts", JSON.parse(selectedProducts));
  }
  // const directProducts: string = String(selectedProducts);
  const totalPriceSum = cartProduct?.data.content
    .filter(
      (v: any) =>
        orderProducts.split(",").map(Number)?.includes(v.cartProductId),
    )
    .reduce((sum: any, item: any) => sum + item.productPrice * item.count, 0);
  let totalPriceSumDirect = 0;
  if (typeof selectedProducts === "string") {
    totalPriceSumDirect = JSON.parse(selectedProducts).reduce(
      (sum: any, item: any) => sum + item.price * item.count,
      0,
    );
  }
  console.log("price", totalPriceSum);
  const PriceInfo = [
    {
      meta: "상품 합계",
      data:
        totalPriceSum !== 0
          ? `${(totalPriceSum + 3000).toLocaleString()}원`
          : `${(totalPriceSumDirect + 3000).toLocaleString()}원`,
    },
    { meta: "할인 금액", data: "0원" },
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
          <h1>배송/결제</h1>
        </S.Header>
        <S.InfoWrapper>
          <h2>제품 정보</h2>
          {cartProduct?.data.content.filter(
            (v: any) =>
              orderProducts.split(",").map(Number)?.includes(v.cartProductId),
          ).length !== 0
            ? cartProduct?.data.content
                .filter(
                  (v: any) =>
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
            : JSON.parse(selectedProducts as string).map(
                (item: ProductItem) => (
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
                ),
              )}
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
              <S.TotalPrice>
                {totalPriceSum !== 0
                  ? `${(totalPriceSum + 3000).toLocaleString()}원`
                  : `${(totalPriceSumDirect + 3000).toLocaleString()}원`}
              </S.TotalPrice>
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
