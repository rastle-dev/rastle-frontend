import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadCoupon } from "@/api/cart";

export default function useOrderList() {
  const menuList = [
    "주문일자",
    "상품 정보",
    "수량",
    "상품구매금액",
    "주문처리상태",
  ];

  const { data: couponData, isLoading } = useQuery(
    [QUERYKEYS.LOAD_COUPON],
    loadCoupon,
  );
  return { menuList, couponData, isLoading };
}
