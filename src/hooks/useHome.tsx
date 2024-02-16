import { useQueryClient } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import ItemElementProps from "@/interface/itemElement";

export default function useHome() {
  const queryClient = useQueryClient();
  const productData = queryClient.getQueryData([
    QUERYKEYS.LOAD_PRODUCT_PAGING,
  ]) as {
    data: {
      content: Array<ItemElementProps>;
    };
  };
  const eventData = queryClient.getQueryData([
    QUERYKEYS.LOAD_EVENTPRODUCT_PAGING,
  ]) as {
    data: Array<ItemElementProps>;
  };
  return {
    productData,
    eventData,
  };
}
