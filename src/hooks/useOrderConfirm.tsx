import { useRouter } from "next/dist/client/router";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadReceiverInfo } from "@/api/shop";

type ProductItem = {
  productPrice?: string;
  productName?: string;
  cartProductId?: boolean;
  title: string | undefined;
  price: string | undefined;
  count: number;
  size: string;
  color: string;
  mainThumbnailImage: string;
};

type ParsedOrderInfo = {
  imp_uid: string;
  merchant_uid: string;
};

export default function useOrderConfirm() {
  const router = useRouter();

  const { selectedProducts, orderInfo } = router.query;
  let parsedSelectedProducts: ProductItem[] = [];
  let parsedOrderInfo: ParsedOrderInfo = {
    imp_uid: "",
    merchant_uid: "",
  };
  if (typeof selectedProducts === "string") {
    parsedSelectedProducts = JSON.parse(selectedProducts as string);
  }
  if (typeof selectedProducts === "string") {
    parsedOrderInfo = JSON.parse(orderInfo as string);
  }

  let ProductList: ProductItem[];
  console.log(parsedSelectedProducts);
  console.log(parsedOrderInfo);

  //장바구니 동선
  if (
    parsedSelectedProducts.length === 0 ||
    !parsedSelectedProducts[0]?.cartProductId
  ) {
    ProductList = parsedSelectedProducts?.map((product) => ({
      title: product.title,
      price: product.price,
      count: product.count,
      size: product.size,
      color: product.color,
      mainThumbnailImage: product.mainThumbnailImage,
    }));
  } else {
    ProductList = parsedSelectedProducts?.map((product) => ({
      title: product.productName,
      price: product.productPrice,
      count: product.count,
      size: product.size,
      color: product.color,
      mainThumbnailImage: product.mainThumbnailImage,
    }));
  }

  const OrdererInfo = [
    { meta: "받는사람", data: parsedOrderInfo.buyer_name },
    { meta: "연락처", data: parsedOrderInfo.buyer_tel },
    {
      meta: "받는주소",
      data: `(${parsedOrderInfo.buyer_postcode}) ${parsedOrderInfo.buyer_addr}`,
    },
    {
      meta: "배송요청사항",
      data: "부재시 경비실에 맡겨주세요 !",
    },
  ];

  console.log(parsedOrderInfo);
  console.log(OrdererInfo);

  return {
    ProductList,
    OrdererInfo,
    parsedOrderInfo,
  };
}
