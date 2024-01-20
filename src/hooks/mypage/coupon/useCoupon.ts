import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadCoupon } from "@/api/cart";

export default function useCoupon() {
  const menuList = ["쿠폰명", "쿠폰적용상품", "쿠폰혜택", "사용가능기간"];

  const { data: couponData, isLoading } = useQuery(
    [QUERYKEYS.LOAD_COUPON],
    loadCoupon,
  );
  return { menuList, couponData, isLoading };
}
