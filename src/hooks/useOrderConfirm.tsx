type ProductItem = {
  productName: string;
  totalPrice: string;
  amount: number;
  size: string;
  color: string;
};

export default function useOrderConfirm() {
  const ProductList: ProductItem[] = [
    {
      productName: "틴 워시드 버뮤다 데님 팬츠",
      totalPrice: "95,800원",
      amount: 3,
      size: "L",
      color: "인디고",
    },
    {
      productName:
        "트랙 샌딩 워시드 와이드 흑청 데님 틴 워시드 버뮤다 데님 팬츠",
      totalPrice: "35,800원",
      amount: 1,
      size: "M",
      color: "검정",
    },
  ];
  const OrdererInfo = [
    { meta: "받는사람", data: "홍레슬" },
    { meta: "연락처", data: "010-xxxx-xxxx" },
    {
      meta: "받는주소",
      data: "(00000) 서울특별시 송파구 xxx xx길 xx",
    },
    {
      meta: "배송요청사항",
      data: "부재시 경비실에 맡겨주세요 !",
    },
  ];

  return {
    ProductList,
    OrdererInfo,
  };
}
