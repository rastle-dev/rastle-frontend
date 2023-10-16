import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { loadBundle } from "@/api/shop";
import QUERYKEYS from "@/constants/querykey";

export default function useShop() {
  const useLoadBundle = (BundleData: object) => {
    const queryFn = () => loadBundle(BundleData);
    const { data, refetch } = useQuery([QUERYKEYS.LOAD_BUNDLE], queryFn);

    return { data, refetch };
  };

  const ITEM_SIZE = 2;
  const [curPage, setCurPage] = useState(1);

  const onChangePage = (page: number) => {
    setCurPage(page);
    console.log("클릭");
  };
  return {
    useLoadBundle,
    onChangePage,
    curPage,
    ITEM_SIZE,
  };
}
