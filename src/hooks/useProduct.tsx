import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/dist/client/router";
import QUERYKEYS from "@/constants/querykey";
import { createOrder, loadProductDetail } from "@/api/shop";
import toastMsg from "@/components/Toast";
import PATH from "@/constants/path";
import { toast } from "react-toastify";

interface SelectedProduct {
  title?: string;
  price: number;
  color?: string | null;
  size?: string | null;
  count: number;
  key?: string;
  mainThumbnailImage: string;
  productId: number | undefined;
}
interface CartProduct {
  productId: number | undefined;
  color?: string | null;
  count: number;
  size?: string | null;
}
type Color = {
  color: string;
  sizes: Size[];
};
type Size = {
  count: number;
  size: string;
};

export default function useProduct() {
  // TODO: 의성) 실제 데이터 api호출로 추가 , 비동기처리 주의해야함
  const router = useRouter();
  const { productId } = router.query;
  const numericProductId = Number(productId);

  const { data: detailData } = useQuery(
    [QUERYKEYS.LOAD_PRODUCT_DETAIL, numericProductId],
    () => {
      if (productId) {
        return loadProductDetail(numericProductId);
      }
      return null;
    },
  );
  const uniqueColors = [
    ...new Set(
      detailData?.data.productColor.productColors.map(
        (item: Color) => item.color,
      ),
    ),
  ];
  const uniqueSizes = [
    ...new Set(
      detailData?.data.productColor.productColors.flatMap((item: Color) =>
        item.sizes.map((v: Size) => v.size),
      ),
    ),
  ];

  // TODO: 의성) title, price에 api에서 받아온 실제 제품의 정보 기입
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>({
    title: detailData?.data.name,
    price: detailData?.data.price,
    color: null,
    size: null,
    count: 0, // 기본 수량
    mainThumbnailImage: detailData?.data.mainThumbnailImage,
    productId: numericProductId,
  });

  // 선택된 제품 정보들을 관리하는 상태 변수
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  // 컬러 버튼 클릭 핸들러
  const handleColorClick = (color: string) => {
    console.log("무너데...", color);
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      color,
      size: null,
      count: 0,
    }));
  };

  // 사이즈 버튼 클릭 핸들러
  const handleSizeClick = (size: string) => {
    if (selectedProduct.color === null) {
      toast.dismiss();
      toastMsg("색상을 먼저 선택하세요");
    } else {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct,
        size,
        count: 1, // 사이즈를 고르면 count가 1 증가함
      }));

      const newProduct: SelectedProduct = {
        title: detailData?.data.name,
        price: detailData?.data.price,
        color: selectedProduct.color,
        size,
        count: 1, // 사이즈를 고르면 count가 1 증가함
        key: `${size}-${selectedProduct.color}`,
        mainThumbnailImage: detailData?.data.mainThumbnailImage, // 문자열로 결합
        productId: numericProductId,
      };

      // 이미 동일한 color와 size를 가진 제품이 있는지 확인

      const hasDuplicate = selectedProducts.some(
        (product) =>
          product.color === newProduct.color &&
          product.size === newProduct.size,
      );

      if (!hasDuplicate) {
        // 이전에 선택된 제품 정보들과 새로운 제품 정보를 합쳐서 새로운 배열 생성
        const updatedProducts = [...selectedProducts, newProduct];

        setSelectedProducts(updatedProducts);
      }
    }
  };

  const inputChangeHandler = (event: any) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      count: event.target.value,
    }));
  };

  const handleIncrement = (key: string | undefined) => {
    setSelectedProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.key === key) {
          return {
            ...product,
            count: product.count + 1,
          };
        }
        return product;
      });
    });
  };

  // TODO:의성) 1 미만일때 alert 창 띄우기
  const handleDecrement = (key: string | undefined) => {
    setSelectedProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.key === key && product.count > 1) {
          return {
            ...product,
            count: product.count - 1,
          };
        }
        return product;
      });
    });
  };

  const onClickOrderButton = async () => {
    const orderProducts = selectedProducts.map((product) => ({
      productId: product.productId,
      name: product.title,
      color: product.color,
      size: product.size,
      count: product.count,
      totalPrice: product.price, // totalPrice 값은 필요에 따라 설정해 주세요.
    }));

    try {
      const data = await createOrder({
        orderProducts,
      });

      if (data) {
        const productOrderNumbers: string[] = data.data.orderProducts.map(
          (product: { productOrderNumber: string }) =>
            product.productOrderNumber,
        );

        router.push({
          pathname: PATH.ORDER,
          query: {
            selectedProducts: JSON.stringify(selectedProducts),
            orderDetailId: data.data.orderDetailId,
            orderNumber: data.data.orderNumber,
            productOrderNumbers,
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (key: string | undefined) => {
    setSelectedProducts((prevProducts) => {
      return prevProducts.filter((product) => product.key !== key);
    });
  };

  function calculateTotalPrice(products: SelectedProduct[]) {
    return products.reduce(
      (total, product) => total + product.price * product.count,
      0,
    );
  }

  function calculateTotalCount(products: SelectedProduct[]) {
    return products.reduce(
      (totalCount, product) => totalCount + product.count,
      0,
    );
  }
  useEffect(() => {
    const newCartProducts: CartProduct[] = selectedProducts.map((product) => ({
      productId: numericProductId,
      color: product.color,
      size: product.size,
      count: product.count,
    }));
    setCartProducts(newCartProducts);
  }, [selectedProducts]);

  return {
    handleColorClick,
    handleSizeClick,
    inputChangeHandler,
    handleIncrement,
    handleDecrement,
    handleDelete,
    calculateTotalPrice,
    calculateTotalCount,
    selectedProduct,
    selectedProducts,
    detailData,
    uniqueColors,
    uniqueSizes,
    cartProducts,
    onClickOrderButton,
  };
}
