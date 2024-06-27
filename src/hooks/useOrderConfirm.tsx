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
  discountPrice?: string | undefined;
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

  const { selectedProducts, orderInfo, errorMsg } = router.query;
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

  const { data: receiverData } = useQuery(
    [QUERYKEYS.LOAD_RECEIVERINFO_MERCHANTID],
    () => loadReceiverInfo(parsedOrderInfo.merchant_uid),
    {
      enabled: Boolean(parsedOrderInfo.merchant_uid), // orderID가 있을 때만 쿼리 실행
    },
  );
  // 장바구니 동선
  if (
    parsedSelectedProducts.length === 0 ||
    !parsedSelectedProducts[0]?.cartProductId
  ) {
    console.log("parsedSelectedProducts", parsedSelectedProducts);
    ProductList = parsedSelectedProducts?.map((product) => ({
      title: product.title,
      price: product.price,
      discountPrice: product.discountPrice,
      count: product.count,
      size: product.size,
      color: product.color,
      mainThumbnailImage: product.mainThumbnailImage,
    }));
  } else {
    console.log("parsedSelectedProducts", parsedSelectedProducts);
    ProductList = parsedSelectedProducts?.map((product) => ({
      title: product.productName,
      price: product.productPrice,
      discountPrice: product.discountPrice,
      count: product.count,
      size: product.size,
      color: product.color,
      mainThumbnailImage: product.mainThumbnailImage,
    }));
  }

  const OrdererInfo = [
    { meta: "받는사람", data: receiverData?.data.receiverInfo.receiverName },
    { meta: "연락처", data: receiverData?.data.receiverInfo.tel },
    {
      meta: "받는주소",
      data: `(${receiverData?.data.receiverInfo.postcode}) ${receiverData?.data.receiverInfo.address}`,
    },
    {
      meta: "배송요청사항",
      data: "부재시 경비실에 맡겨주세요 !",
    },
  ];

  return {
    ProductList,
    OrdererInfo,
    parsedOrderInfo,
    receiverData,
    errorMsg,
  };
}
