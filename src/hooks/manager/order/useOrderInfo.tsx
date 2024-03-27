import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { adminGetOrderInfo } from "@/api/admin";
import QUERYKEYS from "@/constants/querykey";

export default function useOrderInfo() {
  const useLoadOrderInfo = (orderData: object) => {
    const queryFn = () => adminGetOrderInfo(orderData);
    const { data, refetch } = useQuery(
      [QUERYKEYS.ADMIN_LOAD_ORDERINFO],
      queryFn,
    );

    return { data, refetch };
  };

  const ITEM_SIZE = 100;
  const [curPage, setCurPage] = useState(1);

  const onChangePage = (page: number) => {
    setCurPage(page);
  };

  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  return {
    ITEM_SIZE,
    curPage,
    setCurPage,
    onChangePage,
    searchType,
    setSearchType,
    searchValue,
    useLoadOrderInfo,
    setSearchValue,
  };
}
