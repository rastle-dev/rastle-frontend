import React from "react";
import * as S from "@/styles/orderDetail/index.styles";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadOrderDetail } from "@/api/auth";

export default function OrderDetail() {
  const router = useRouter();
  const { orderId } = router.query;
  console.log(orderId);
  //
  const { data: orderDetail } = useQuery([QUERYKEYS.LOAD_PRODUCT_DETAIL], () =>
    loadOrderDetail(orderId),
  );

  console.log(orderDetail);

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
              </S.Info>
            </S.Product>
          ))}
          <p>
            주문처리상태{" "}
            <S.subText>{orderDetail?.data.deliveryStatus}</S.subText>
          </p>
          <p>
            주문일자{" "}
            <S.subText>{orderDetail?.data.orderDate.split("T")[0]}</S.subText>{" "}
          </p>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.Title>결제 정보</S.Title>
          <S.TotalPrice>
            총결제금액
            <S.subText>{orderDetail?.data.paymentAmount}원</S.subText>
          </S.TotalPrice>
          <S.TableDiv>
            <S.InnerLeft>총결제금액</S.InnerLeft>
            <S.InnerRight>{orderDetail?.data.paymentAmount}원</S.InnerRight>
          </S.TableDiv>
          <S.TableDiv>
            <S.InnerLeft>상품구매금액</S.InnerLeft>
            <S.InnerRight>{orderDetail?.data.paymentAmount}원</S.InnerRight>
          </S.TableDiv>
          <S.TableDiv>
            <S.InnerLeft>배송비</S.InnerLeft>
            <S.InnerRight>{orderDetail?.data.deliveryPrice}원</S.InnerRight>
          </S.TableDiv>
          <S.TableDiv>
            <S.InnerLeft>쿠폰할인금액</S.InnerLeft>
            <S.InnerRight>3000원</S.InnerRight>
          </S.TableDiv>
          <S.TableDiv>
            <S.InnerLeft>상품구매금액</S.InnerLeft>
            <S.InnerRight>{orderDetail?.data.paymentAmount}원</S.InnerRight>
          </S.TableDiv>

          <p>
            상품구매금액
            <S.subText>{orderDetail?.data.paymentAmount}원</S.subText>
          </p>
          <p>
            배송비<S.subText>{orderDetail?.data.deliveryPrice}원</S.subText>
          </p>
          <p>
            쿠폰할인금액 : <S.subText>3000원</S.subText>
          </p>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.Title>배송지 정보</S.Title>
          <p>수취인 : {orderDetail?.data.receiverInfo.receiverName}</p>
          <p>주소 : {orderDetail?.data.receiverInfo.address}</p>
          <p>우편번호 : {orderDetail?.data.receiverInfo.postcode}</p>
          <p>휴대전화 : {orderDetail?.data.receiverInfo.tel}</p>
          <p>배송메세지 :{orderDetail?.data.receiverInfo.msg}</p>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.Title>환불정보</S.Title>
          <p>환불일자</p>
          <p>환불금액</p>
          <p>환불수단</p>
          <p>쿠폰 복원 내역</p>
        </S.InfoWrapper>
      </S.Container>
    </S.Temp>
  );
}
