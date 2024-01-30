import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadEventHistory } from "@/api/cart";
import { useEffect, useState } from "react";

export default function useEventHistory() {
  const eventMenuList = ["응모일자", "상품 정보", "수량", "금액", "응모 상태"];
  const [eventCurPage, setEventCurPage] = useState(2);
  const EVENT_ITEM_SIZE = 2;
  const {
    data: eventHistoryData,
    isLoading: eventLoading,
    refetch: eventHistoryDataRefetch,
  } = useQuery(
    [QUERYKEYS.LOAD_EVENT_HISTORY],
    () => loadEventHistory({ page: eventCurPage - 1, size: EVENT_ITEM_SIZE }),
    {
      keepPreviousData: true,
    },
  );
  useEffect(() => {
    eventHistoryDataRefetch();
  }, [eventCurPage]);
  const onChangeEventPage = (page: number) => {
    setEventCurPage(page);
  };

  return {
    eventMenuList,
    eventCurPage,
    eventHistoryData,
    onChangeEventPage,
    eventLoading,
    EVENT_ITEM_SIZE,
  };
}
