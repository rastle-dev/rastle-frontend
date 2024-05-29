import React from "react";
import * as S from "@/styles/orderDetail/index.styles";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadOrderDetail } from "@/api/auth";
import LoadingBar from "@/components/LoadingBar";
import PATH from "@/constants/path";

export default function OrderDetail() {
  const router = useRouter();
  const { orderId } = router.query;

  const { data: orderDetail } = useQuery(
    [QUERYKEYS.LOAD_ORDER_DETAIL],
    () => loadOrderDetail(orderId),
    {
      enabled: Boolean(orderId), // orderID가 있을 때만 쿼리 실행
      cacheTime: 60000, // 캐시 유지 시간 (예: 60초)
    },
  );
  console.log("order", orderDetail);

  // 주문처리상태 타입 정의
  type DeliveryStatus =
    | "NOT_STARTED"
    | "DELIVERY_STARTED"
    | "DELIVERED"
    | "PAID"
    | "CANCELLED"
    | "CANCEL_REQUESTED"
    | "PARTIALLY_CANCELLED";

  const deliveryStatusText = {
    NOT_STARTED: "배송준비중",
    DELIVERY_STARTED: "배송중",
    DELIVERED: "배송완료",
    PAID: "결제완료",
    CANCELLED: "취소완료",
    CANCEL_REQUESTED: "취소요청",
    PARTIALLY_CANCELLED: "부분취소완료",
  } as const;

  const paymentInfoList = [
    { label: "총 결제금액", value: orderDetail?.data.paymentAmount },
    {
      label: "상품구매금액",
      value:
        (orderDetail?.data?.paymentAmount ?? 0) -
        (orderDetail?.data?.deliveryPrice ?? 0),
    },
    { label: "배송비", value: orderDetail?.data.deliveryPrice },
    { label: "쿠폰할인금액", value: -3000 },
  ];

  const deliveryInfoList = [
    { label: "수취인", value: orderDetail?.data.receiverInfo.receiverName },
    { label: "주소", value: orderDetail?.data.receiverInfo.address },
    { label: "우편번호", value: orderDetail?.data.receiverInfo.postcode },
    { label: "휴대전화", value: orderDetail?.data.receiverInfo.tel },
    { label: "배송메세지", value: orderDetail?.data.receiverInfo.msg },
  ];

  const refundInfoList = [
    { label: "환불일자", value: orderDetail?.data.refundInfo.cancelTime },
    { label: "환불금액", value: orderDetail?.data.refundInfo.cancelAmount },
    {
      label: "환불수단",
      value: orderDetail?.data.refundInfo.paymentMethod,
    },
    {
      label: "쿠폰 복원 내역",
      value: orderDetail?.data.refundInfo.couponInfo,
    },
  ];

  if (orderDetail === undefined) {
    return <LoadingBar type={6} />;
  }

  return (
    <S.Temp>
      <S.Container>
        <S.MainTitle>주문 상세조회</S.MainTitle>
        <S.InfoWrapper>
          <S.Title>주문 상품</S.Title>
          {orderDetail?.data.productOrderInfos.map((item: any) => (
            <S.Product>
              <S.Thumbnail src={item.thumbnailUrl} alt={item.thumbnailUrl} />
              <S.Info>
                <S.ProductName>{item.name}</S.ProductName>
                <S.NumPrice>
                  {item.count}개 / {item.totalPrice}원
                </S.NumPrice>
                <S.SizeColor>
                  {item.size} / {item.color}
                </S.SizeColor>
                <S.OrderInner>
                  <p>{deliveryStatusText[item?.status as DeliveryStatus]}</p>
                </S.OrderInner>
              </S.Info>
            </S.Product>
          ))}
          <S.OrderTableDiv>
            <S.OrderInnerLeft>
              <p>주문일자 : </p>
            </S.OrderInnerLeft>
            <S.OrderInnerRight>
              {orderDetail?.data.orderDate.split("T")[0]}
            </S.OrderInnerRight>
          </S.OrderTableDiv>
          <S.OrderTableDiv>
            <S.OrderInnerLeft>
              <p>주문처리상태 : </p>
            </S.OrderInnerLeft>
            <S.OrderInnerRight>
              {
                deliveryStatusText[
                  orderDetail?.data.orderStatus as DeliveryStatus
                ]
              }
            </S.OrderInnerRight>
            {["PAID", "CANCEL_REQUESTED", "PARTIALLY_CANCELLED"].includes(
              orderDetail?.data.orderStatus,
            ) ? (
              <S.CancelButton
                onClick={() => {
                  router.push({
                    pathname: PATH.ORDERCANCEL,
                    query: { orderId },
                  });
                }}
                title="취소 요청"
              />
            ) : (
              orderDetail?.data.orderStatus === "DELIVERED" && (
                <S.CancelButton
                  onClick={() => {
                    router.push({
                      pathname: PATH.ORDERCANCEL,
                      query: { orderId },
                    });
                  }}
                  title="반품 요청"
                />
              )
            )}
          </S.OrderTableDiv>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.PriceTitle>결제 정보</S.PriceTitle>

          {paymentInfoList.map((item) =>
            item.label === "총 결제금액" ? (
              <S.TotalPrice key={item.label}>
                <S.InnerPriceLeft>{item.label}</S.InnerPriceLeft>
                <S.InnerPriceRight>{item.value}원</S.InnerPriceRight>
              </S.TotalPrice>
            ) : (
              <S.TableDiv key={item.label}>
                <S.InnerLeft>{item.label}</S.InnerLeft>
                <S.InnerRight>{item.value}원</S.InnerRight>
              </S.TableDiv>
            ),
          )}
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.DeliveryTitle>배송지 정보</S.DeliveryTitle>

          {deliveryInfoList.map((item) => (
            <S.DeliveryTableDiv key={item.label}>
              <S.DeliveryInnerLeft>{item.label}</S.DeliveryInnerLeft>
              <S.DeliveryInnerRight>{item.value}</S.DeliveryInnerRight>
            </S.DeliveryTableDiv>
          ))}
        </S.InfoWrapper>

        <S.InfoWrapper>
          <S.DeliveryTitle>환불정보</S.DeliveryTitle>

          {refundInfoList.map((item) => (
            <S.DeliveryTableDiv key={item.label}>
              <S.DeliveryInnerLeft>{item.label}</S.DeliveryInnerLeft>
              <S.DeliveryInnerRight>{item.value}</S.DeliveryInnerRight>
            </S.DeliveryTableDiv>
          ))}
        </S.InfoWrapper>
      </S.Container>
    </S.Temp>
  );
}
