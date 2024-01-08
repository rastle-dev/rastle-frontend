import React from "react";
import { NODATA } from "@/styles/mypage/cart/index.styles";

export default function OrderList() {
  return (
    <div>
      <h2>주문내역</h2>
      <NODATA>아직 주문하신 상품이 없어요! 😋</NODATA>
    </div>
  );
}
