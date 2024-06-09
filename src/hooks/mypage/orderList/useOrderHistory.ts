import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadOrderList } from "@/api/cart";
import { useState } from "react";

export default function useOrderHistory() {
  const menuList = [
    "주문일자",
    "상품 정보",
    "수량",
    "상품구매금액",
    "주문처리상태",
  ];
  const [orderCurPage, setOrderCurPage] = useState(1);
  const ORDER_ITEM_SIZE = 3;
  const { data: orderListData, isLoading: orderLoading } = useQuery(
    [QUERYKEYS.LOAD_ORDER_LIST, orderCurPage],
    () => loadOrderList({ page: orderCurPage - 1, size: ORDER_ITEM_SIZE }),
    {
      keepPreviousData: true,
    },
  );
  const onChangeOrderPage = (page: number) => {
    setOrderCurPage(page);
  };
  const deliveryStatusText = {
    NOT_STARTED: "상품준비중",
    DELIVERY_STARTED: "배송중",
    DELIVERED: "배송완료",
    PAID: "결제완료",
    CANCELLED: "취소완료",
    CANCEL_REQUESTED: "취소요청",
    PARTIALLY_CANCELLED: "부분취소완료",
    DELIVERY_READY: "배송준비중",
  } as const;

  return {
    menuList,
    orderLoading,
    orderListData,
    orderCurPage,
    onChangeOrderPage,
    ORDER_ITEM_SIZE,
    deliveryStatusText,
  };
}
