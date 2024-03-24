import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadEventHistory } from "@/api/cart";
import { useState } from "react";

export default function useEventHistory() {
  const eventMenuList = [
    "응모일자",
    "상품 정보",
    "수량",
    "응모상품금액",
    "응모 상태",
  ];
  const [eventCurPage, setEventCurPage] = useState(1);
  const EVENT_ITEM_SIZE = 3;
  const { data: eventHistoryData, isLoading: eventLoading } = useQuery(
    [QUERYKEYS.LOAD_EVENT_HISTORY, eventCurPage],
    () => loadEventHistory({ page: eventCurPage - 1, size: EVENT_ITEM_SIZE }),
    {
      keepPreviousData: true,
    },
  );
  const onChangeEventPage = (page: number) => {
    setEventCurPage(page);
  };
  const eventHistorySize = eventHistoryData?.data.totalElements;

  return {
    eventMenuList,
    eventCurPage,
    eventHistoryData,
    onChangeEventPage,
    eventLoading,
    EVENT_ITEM_SIZE,
    eventHistorySize,
  };
}
