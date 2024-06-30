import React, { useEffect, useState } from "react";
import * as S from "@/styles/orderDetail/index.styles";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadOrderDetail } from "@/api/auth";
import LoadingBar from "@/components/LoadingBar";
import PATH from "@/constants/path";
import errorMsg from "@/components/Toast/error";

interface ProductOrderInfoItem {
  productId: number;
  color: string;
  name: string;
  price: number;
  cancelAmount: number;
  cancelRequestAmount: number;
  returnAmount: number;
  returnRequestAmount: number;
  count: number;
  thumbnailUrl: string;
  orderNumber: number;
  productOrderNumber: number;
  size: string;
  status: string;
  totalPrice: number;
}

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
  const cancelTotal = orderDetail?.data.productOrderInfos.reduce(
    (a: number, c: ProductOrderInfoItem) => {
      return a + c.count - c.cancelAmount - c.cancelRequestAmount;
    },
    0,
  );
  const returnTotal = orderDetail?.data.productOrderInfos.reduce(
    (a: number, c: ProductOrderInfoItem) => {
      return a + c.count - c.returnAmount - c.returnRequestAmount;
    },
    0,
  );
  const [refundMethod, setRefundMethod] = useState<string>("");
  // 주문처리상태 타입 정의
  type DeliveryStatus =
    | "DELIVERY_STARTED"
    | "DELIVERY_READY"
    | "DELIVERED"
    | "PAID"
    | "CANCELLED"
    | "CANCEL_REQUESTED"
    | "PARTIALLY_CANCELLED"
    | "RETURN_REQUESTED"
    | "PARTIALLY_RETURNED"
    | "RETURNED";

  const deliveryStatusText = {
    DELIVERY_STARTED: "배송중",
    DELIVERED: "배송완료",
    DELIVERY_READY: "배송준비중",
    PAID: "결제완료",
    CANCELLED: "취소완료",
    CANCEL_REQUESTED: "취소요청",
    PARTIALLY_CANCELLED: "부분취소완료",
    RETURN_REQUESTED: "반품요청",
    PARTIALLY_RETURNED: "부분반품완료",
    RETURNED: "반품완료",
  } as const;

  const paymentInfoList = [
    { label: "총 결제금액", value: orderDetail?.data.paymentAmount },
    {
      label: "상품금액",
      value:
        (orderDetail?.data?.paymentAmount ?? 0) -
        (orderDetail?.data?.deliveryPrice ?? 0) +
        (orderDetail?.data?.couponAmount ?? 0),
    },
    { label: "배송비", value: orderDetail?.data.deliveryPrice },
    { label: "쿠폰할인금액", value: orderDetail?.data.couponAmount },
  ];

  const deliveryInfoList = [
    { label: "수취인", value: orderDetail?.data.receiverInfo.receiverName },
    { label: "주소", value: orderDetail?.data.receiverInfo.address },
    { label: "우편번호", value: orderDetail?.data.receiverInfo.postcode },
    { label: "휴대전화", value: orderDetail?.data.receiverInfo.tel },
    { label: "배송메세지", value: orderDetail?.data.deliveryMsg },
  ];

  const refundInfoList = [
    {
      label: "환불일자",
      value: orderDetail?.data.refundInfo.cancelTime.split("-").includes("1970")
        ? ""
        : orderDetail?.data.refundInfo.cancelTime.split("T").join(" "),
    },
    {
      label: "환불금액",
      value: orderDetail?.data.refundInfo.cancelAmount
        ? `${orderDetail?.data.refundInfo.cancelAmount.toLocaleString()} 원`
        : "",
    },
    {
      label: "환불수단",
      value: orderDetail?.data.refundInfo.cancelAmount ? refundMethod : "",
    },
    {
      label: "쿠폰 복원 내역",
      value: orderDetail?.data.refundInfo.couponInfo
        ? `${orderDetail?.data.refundInfo.couponInfo.discount.toLocaleString()}원`
        : "",
    },
  ];

  useEffect(() => {
    if (orderDetail?.data.embPgProvider !== null) {
      setRefundMethod(orderDetail?.data.embPgProvider);
    } else if (orderDetail?.data.pgProvider !== "") {
      setRefundMethod(orderDetail?.data.pgProvider);
    } else {
      setRefundMethod(orderDetail?.data.paymentMethod);
    }
  }, [orderDetail]);

  if (orderDetail === undefined) {
    return <LoadingBar type={6} />;
  }
  return (
    <S.Temp>
      <S.Container>
        <S.MainTitle>주문 상세조회</S.MainTitle>
        <S.InfoWrapper>
          <S.Title>주문 상품</S.Title>
          {orderDetail?.data.productOrderInfos.map(
            (item: ProductOrderInfoItem) => (
              <S.Product>
                <S.Thumbnail
                  onClick={() => {
                    const { productId } = item;
                    router.push({
                      pathname: PATH.PRODUCT,
                      query: { productId },
                    });
                  }}
                  src={item.thumbnailUrl}
                  alt={item.thumbnailUrl}
                />
                <S.Info>
                  <S.ProductName
                    onClick={() => {
                      const { productId } = item;
                      router.push({
                        pathname: PATH.PRODUCT,
                        query: { productId },
                      });
                    }}
                  >
                    <p>{item.name}</p>
                  </S.ProductName>
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
            ),
          )}
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
            <>
              {orderDetail?.data.productOrderInfos.filter(
                (v: any) => v.status === "DELIVERY_READY",
              ).length !== 0 && (
                <S.ReturnButton
                  onClick={() => {
                    if (returnTotal) {
                      router.push({
                        pathname: PATH.ORDERRETURN,
                        query: { orderId },
                      });
                    } else {
                      errorMsg("반품 가능한 상품이 없습니다!");
                    }
                  }}
                  title="반품 요청"
                />
              )}

              {orderDetail?.data.productOrderInfos.filter(
                (v: any) =>
                  v.status === "PAID" ||
                  v.status === "CANCEL_REQUESTED" ||
                  v.status === "PARTIALLY_CANCELLED",
              ).length !== 0 && (
                <S.CancelButton
                  return={
                    orderDetail?.data.productOrderInfos.filter(
                      (v: any) => v.status === "DELIVERY_READY",
                    ).length > 0
                  }
                  onClick={() => {
                    if (cancelTotal) {
                      router.push({
                        pathname: PATH.ORDERCANCEL,
                        query: { orderId },
                      });
                    } else {
                      errorMsg("취소 가능한 상품이 없습니다!");
                    }
                  }}
                  title="취소 요청"
                />
              )}
            </>
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
        <S.InfoWrapper>
          <S.DeliveryTitle>반품 시 주의 사항</S.DeliveryTitle>
          <S.ReturnInfo>
            <p>제품은 반품 신청일 기준 다음날 14시에 수거할 예정이에요.</p>
            <p>그 전에 꼭 제품을 문 앞에 놔둬주세요!</p>
            <p>반품 신청하신 제품은 영업일 기준 2~3일 안에 환불될 예정이요.</p>
            <p>
              궁금하신 점은 카카오 채널(레코디 슬로우)로 문의 주시면
              감사하겠습니다.😊
            </p>
          </S.ReturnInfo>
        </S.InfoWrapper>
      </S.Container>
    </S.Temp>
  );
}
