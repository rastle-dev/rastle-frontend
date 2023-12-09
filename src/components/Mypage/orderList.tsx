import React from "react";
import { NODATA } from "@/components/Mypage/cart";

export default function OrderList() {
  return (
    <div>
      <h2>주문내역</h2>
      <NODATA>아직 주문하신 상품이 없어요! 😋</NODATA>
    </div>
  );
}
