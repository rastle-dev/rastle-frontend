import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadOrderList } from "@/api/cart";
import { useEffect, useState } from "react";

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
  // useEffect(() => {
  //   orderDataRefetch();
  // }, [orderCurPage]);
  const onChangeOrderPage = (page: number) => {
    setOrderCurPage(page);
  };
  return {
    menuList,
    orderLoading,
    orderListData,
    orderCurPage,
    onChangeOrderPage,
    ORDER_ITEM_SIZE,
  };
}
