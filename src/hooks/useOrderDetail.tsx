import { useRouter } from "next/dist/client/router";

type ProductItem = {
  title: string;
  price: string;
  count: number;
  size: string;
  color: string;
  mainThumbnailImage: string;
};

export default function useOrderDetail() {
  const router = useRouter();
  console.log(router);

  const { selectedProducts, orderInfo } = router.query;
  let parsedSelectedProducts = [];
  let parsedOrderInfo = [];
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
    ProductList = parsedSelectedProducts?.map((product: any) => ({
      title: product.title,
      price: product.price,
      count: product.count,
      size: product.size,
      color: product.color,
      mainThumbnailImage: product.mainThumbnailImage,
    }));
  } else {
    ProductList = parsedSelectedProducts?.map((product: any) => ({
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

  return {
    ProductList,
    OrdererInfo,
    parsedOrderInfo,
  };
}
