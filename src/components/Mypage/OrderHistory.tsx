import React, { useEffect } from "react";
import * as S from "@/styles/mypage/orderList/index.styles";
import useOrderHistory from "@/hooks/mypage/orderList/useOrderHistory";
import useDialog from "@/hooks/useDialog";
import LoadingBar from "@/components/LoadingBar";
import Dialog from "@/components/Common/Dialog";
import PATH from "@/constants/path";
import useLoadingWithTimeout from "@/hooks/useLoadingWithTimeout";
import Pagination from "react-js-pagination";
import EventHistory from "@/components/Event/EventHistory";
import { useRouter } from "next/dist/client/router";

export default function OrderHistory() {
  const router = useRouter();
  const {
    menuList,
    orderLoading,
    orderListData,
    orderCurPage,
    onChangeOrderPage,
    ORDER_ITEM_SIZE,
  } = useOrderHistory();
  const { isDialogOpen, openDialog, closeDialog } = useDialog();
  const { timedOut } = useLoadingWithTimeout(orderLoading);
  useEffect(() => {
    if (orderLoading && timedOut) {
      openDialog();
    }
  }, [timedOut]);
  if (orderLoading && !timedOut) return <LoadingBar type={6} />;

  console.log(orderListData);

  return (
    <S.Wrap isLoading={orderLoading}>
      {isDialogOpen && (
        <Dialog
          onClickBasketButton={() => {
            localStorage.clear();
            closeDialog();
            router.push(PATH.LOGIN);
          }}
          visible
          title="세션이 만료되어 로그아웃합니다."
          refuse="확인"
          confirm=""
          size={40}
        />
      )}
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
                return (
                  <S.ProductInfo>
                    <S.OrderDateNum>
                      <div>{item.orderInfo.orderDate.split("T")[0]}</div>
                      <S.OrderDetail
                        onClick={() => {
                          router.push({
                            pathname: PATH.ORDERDETAIL,
                            query: { orderId: item.orderInfo.orderId },
                          });
                        }}
                      >
                        주문상세조회 {">"}
                      </S.OrderDetail>
                      <S.OrderNum
                        onClick={() => {
                          router.push({
                            pathname: PATH.ORDERDETAIL,
                            query: { orderId: item.orderInfo.orderId },
                          });
                        }}
                      >
                        [{item.orderInfo.orderNumber}]
                      </S.OrderNum>
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
                              <div>{item.orderInfo.deliveryStatus}</div>
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
      {orderListData?.data.content.length !== 0 && (
        <S.PagingWrapper>
          <Pagination
            activePage={orderCurPage}
            itemsCountPerPage={ORDER_ITEM_SIZE}
            totalItemsCount={orderListData?.data.totalElements || 1}
            pageRangeDisplayed={2}
            onChange={onChangeOrderPage}
            prevPageText="<"
            nextPageText=">"
          />
        </S.PagingWrapper>
      )}

      <EventHistory />
    </S.Wrap>
  );
}
