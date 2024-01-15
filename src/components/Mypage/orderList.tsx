import React from "react";
import * as S from "@/styles/mypage/orderList/index.styles";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadOrderList } from "@/api/cart";
import useOrderList from "@/hooks/mypage/orderList/useOrderList";

export default function OrderList() {
  const { menuList } = useOrderList();
  const { data: orderListData, isLoading } = useQuery(
    [QUERYKEYS.LOAD_ORDER_LIST],
    loadOrderList,
  );
  return (
    <S.Wrap>
      <h2>주문내역</h2>
      {orderListData?.data.content.length === 0 ? (
        <S.NODATA>아직 주문하신 상품이 없어요! 😋</S.NODATA>
      ) : (
        <S.CartBox>
          <S.Table>
            <S.TableHeader>
              {menuList.map((menu) => (
                <p>{menu}</p>
              ))}
            </S.TableHeader>
            <S.TableContent>
              {orderListData?.data.content.map((item: any) => {
                // 제품 가격과 수량을 곱하고 3,000원을 더한 값을 계산
                return (
                  <S.ProductInfo>
                    <S.OrderDateNum>
                      <div>{item.orderInfo.orderDate.split("T")[0]}</div>
                      <S.OrderDetail>주문상세조회 {">"}</S.OrderDetail>
                      <S.OrderNum>[{item.orderInfo.orderNumber}]</S.OrderNum>
                    </S.OrderDateNum>
                    <S.Box>
                      {item.productOrderInfos.map((product: any) => (
                        <S.ProductBox>
                          <S.UpperBox>
                            <S.Img src={product.thumbNailUrl} />
                            <S.MobileTextInfo>
                              <S.TextInfo>
                                <h4>{product.name}</h4>
                                <h4>
                                  {product.size}/{product.color}
                                </h4>
                              </S.TextInfo>
                              <S.Count>{product.count}개</S.Count>
                              <S.Price>
                                <S.DiscountedPrice>
                                  {product?.totalPrice.toLocaleString()}원
                                </S.DiscountedPrice>
                              </S.Price>
                            </S.MobileTextInfo>
                          </S.UpperBox>
                          <S.BottomBox>
                            <S.MobileDeliveryStatus>
                              <div>{item.orderInfo.deliveryStatus}22</div>
                              <S.LoadDeliveryButton
                                type="default"
                                title="배송조회"
                                width="8rem"
                              />
                            </S.MobileDeliveryStatus>
                            <S.DeskTopDeliveryStatus>
                              {item.orderInfo.deliveryStatus}
                            </S.DeskTopDeliveryStatus>
                          </S.BottomBox>
                        </S.ProductBox>
                      ))}
                    </S.Box>
                  </S.ProductInfo>
                );
              })}
            </S.TableContent>
          </S.Table>
        </S.CartBox>
      )}
    </S.Wrap>
  );
}
