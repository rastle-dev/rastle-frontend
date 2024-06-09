import React, { useEffect } from "react";
import * as S from "@/styles/mypage/orderList/index.styles";
import useOrderHistory from "@/hooks/mypage/orderList/useOrderHistory";
import useDialog from "@/hooks/useDialog";
import LoadingBar from "@/components/LoadingBar";
import PATH from "@/constants/path";
import useLoadingWithTimeout from "@/hooks/useLoadingWithTimeout";
import Pagination from "react-js-pagination";
import EventHistory from "@/components/Event/EventHistory";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import toastMsg from "@/components/Toast";

const Dialog = dynamic(() => import("@/components/Common/Dialog/index"), {
  ssr: false,
});
type DeliveryStatus =
  | "DELIVERY_STARTED"
  | "DELIVERY_READY"
  | "DELIVERED"
  | "PAID"
  | "CANCELLED"
  | "CANCEL_REQUESTED"
  | "PARTIALLY_CANCELLED";
export default function OrderHistory() {
  const router = useRouter();
  const {
    menuList,
    orderLoading,
    orderListData,
    orderCurPage,
    onChangeOrderPage,
    ORDER_ITEM_SIZE,
    deliveryStatusText,
  } = useOrderHistory();
  const { isDialogOpen, openDialog, closeDialog } = useDialog();
  const { timedOut } = useLoadingWithTimeout(orderLoading);
  useEffect(() => {
    if (orderLoading && timedOut) {
      openDialog();
    }
  }, [timedOut]);
  if (orderLoading && !timedOut) return <LoadingBar type={6} />;

  const openPopup = (trackingNumber: number, status: string) => {
    const url = `https://www.cjlogistics.com/ko/tool/parcel/tracking?gnbInvcNo=${trackingNumber}`;
    const width = 800;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    if (status === "DELIVERY_STARTED" || status === "DELIVERED") {
      window.open(
        url,
        "_blank",
        `width=${width}, height=${height}, left=${left}, top=${top}`,
      );
    } else if (status === "CANCELLED") {
      toastMsg("주문 취소된 상품이에요!");
    } else if (status === "CANCEL_REQUESTED") {
      toastMsg("주문 취소 요청된 상품이에요!");
    } else if (status === "DELIVERY_READY") {
      toastMsg("배송을 준비중이에요!");
    } else {
      toastMsg("상품을 준비중이에요!");
    }
  };

  return (
    <S.Wrap isLoading={orderLoading}>
      {isDialogOpen && (
        <Dialog
          onClickRefuseButton={() => {
            localStorage.removeItem("accessToken");
            closeDialog();
            router.push(PATH.LOGIN);
          }}
          visible
          title="세션이 만료되어 로그아웃합니다."
          refuse="확인"
          size={42}
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
                      <div>{item.orderInfo.orderDate?.split("T")[0]}</div>
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
                            <S.Img
                              src={product.thumbnailUrl}
                              onClick={() => {
                                const { productId } = product;
                                router.push({
                                  pathname: PATH.PRODUCT,
                                  query: { productId },
                                });
                              }}
                            />
                            <S.MobileTextInfo>
                              <S.TextInfo
                                onClick={() => {
                                  const { productId } = product;
                                  router.push({
                                    pathname: PATH.PRODUCT,
                                    query: { productId },
                                  });
                                }}
                              >
                                <h4>{product.name}</h4>
                                <h4>
                                  {product.size}/{product.color}
                                </h4>
                              </S.TextInfo>
                              <S.Count>{product.count}개</S.Count>
                              <S.Price>
                                <S.DiscountedPrice>
                                  {product?.totalPrice?.toLocaleString()}원
                                </S.DiscountedPrice>
                              </S.Price>
                            </S.MobileTextInfo>
                          </S.UpperBox>
                          <S.BottomBox>
                            <S.MobileDeliveryStatus>
                              <div>
                                {
                                  deliveryStatusText[
                                    product?.status as DeliveryStatus
                                  ]
                                }
                              </div>
                              <S.LoadDeliveryButton
                                type="default"
                                title="배송조회"
                                width="8rem"
                                onClick={() => {
                                  openPopup(
                                    product.trackingNumber,
                                    product.status,
                                  );
                                }}
                              />
                            </S.MobileDeliveryStatus>
                            <S.DeskTopDeliveryStatus
                              onClick={() => {
                                openPopup(
                                  product.trackingNumber,
                                  product.status,
                                );
                              }}
                            >
                              <div>
                                {
                                  deliveryStatusText[
                                    product?.status as DeliveryStatus
                                  ]
                                }
                              </div>
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
            hideFirstLastPages
            nextPageText=">"
          />
        </S.PagingWrapper>
      )}

      <EventHistory />
    </S.Wrap>
  );
}
