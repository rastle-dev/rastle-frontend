import { useQueryClient } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import ItemElementProps from "@/interface/itemElement";

export default function useHome() {
  const queryClient = useQueryClient();
  const eventData = queryClient.getQueryData([
    QUERYKEYS.LOAD_EVENTPRODUCT_PAGING,
  ]) as {
    data: Array<ItemElementProps>;
  };
  const bestProductData = queryClient.getQueryData([
    QUERYKEYS.LOAD_BEST_PRODUCT_PAGING,
  ]) as {
    data: {
      content: Array<ItemElementProps>;
    };
  };
  return {
    eventData,
    bestProductData,
  };
}
