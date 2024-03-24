import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import errorMsg from "@/components/Toast/error";
import { createOrder } from "@/api/shop";
import PATH from "@/constants/path";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import {
  addCartProduct,
  deleteAllCartProduct,
  deleteSelectedCartProduct,
  loadCartProduct,
} from "@/api/cart";
import toastMsg from "@/components/Toast";
import { useRouter } from "next/dist/client/router";
import { ProductItem } from "@/interface/cartProductItem";

export default function useCart() {
  const router = useRouter();
  const [cartOrderProducts, setCartOrderProducts] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<ProductItem[]>([]);
  const [deleteProducts, setDeleteProducts] = useState<number[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const orderList = cartOrderProducts.join(",");
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const menuList = ["정보", "판매가", "수량", "선택", "배송비"];
  const queryClient = useQueryClient();
  const [timedOut, setTimedOut] = useState(false);
  const [loadingProps, setLoadingProps] = useState(false);
  useEffect(() => {
    const currentPath = router.asPath;
    if (typeof window !== "undefined") {
      if (localStorage.getItem("accessToken")) {
        if (currentPath.includes("/mypage")) {
          setIsDataLoading(true);
        }
      }
    }
  }, []);
  const {
    data: cartProduct,
    refetch,
    isLoading: isCartDataLoading,
  } = useQuery([QUERYKEYS.LOAD_CART], loadCartProduct, {
    enabled: isDataLoading,
  });
  const totalPrice =
    cartProduct?.data?.content
      ?.map((v: ProductItem) => v.discountPrice * v.count)
      ?.reduce((a: number, c: number) => a + c, 0) || 0;

  const deleteCart = async () => {
    try {
      await deleteAllCartProduct();
      toastMsg("삭제 되었습니다! 👏");
      await queryClient.invalidateQueries([QUERYKEYS.LOAD_CART]);
    } catch (error) {
      errorMsg("전체 삭제 실패");
      console.log(error);
    }
  };
  const mutateAddCartProduct = useMutation(["addCartProduct"], addCartProduct, {
    onSuccess: async () => {
      toastMsg("장바구니에 해당 상품이 담겼습니다!");
      queryClient.invalidateQueries([QUERYKEYS.LOAD_CART]);
    },
    onError: ({
      response: {
        data: { errorCode, message },
      },
    }) => {
      toast.dismiss();
      errorMsg("담기 실패");
      console.log(`${errorCode} / ${message}`);
    },
  });

  // 컴포넌트에 로딩 상태가 있다고 가정합니다.

  const mutateDeleteCartProduct = useMutation(
    ["deleteSelectedCartProduct"],
    deleteSelectedCartProduct,
    {
      onMutate: () => {
        // 뮤테이션이 시작될 때 로딩을 true로 설정합니다.
        setIsLoading(true);
        setDeleteButtonDisabled(true);
      },
      onError: ({
        response: {
          data: { errorCode, message },
        },
      }) => {
        toast.dismiss();
        errorMsg("삭제 실패");
        console.log(`${errorCode} / ${message}`);
      },
      onSuccess: async () => {
        toast.dismiss();
        toastMsg("선택하신 상품이 삭제 되었습니다! 👏");
        setIsLoading(false);
        setDeleteButtonDisabled(false);
        await queryClient.invalidateQueries([QUERYKEYS.LOAD_CART]);
        // 쿼리 무효화
      },
    },
  );

  const handleProductCheckboxChange = (item: ProductItem) => {
    // 항목이 이미 선택되었는지 확인
    const isSelected = selectedItems.includes(item);

    // 이미 선택된 경우 선택 해제하고, 그렇지 않은 경우 selectedItems 배열에 추가합니다.
    if (isSelected) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item),
      );
      setCartOrderProducts(
        cartOrderProducts.filter((v: number) => v !== item.cartProductId),
      );
      setDeleteProducts(
        deleteProducts.filter((v: number) => v !== item.cartProductId),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
      setDeleteProducts([...deleteProducts, item.cartProductId]);
      setCartOrderProducts([...cartOrderProducts, item.cartProductId]);
    }
  };
  const handleHeaderCheckboxChange = () => {
    // 모든 항목이 이미 선택된 경우, selectedItems를 비웁니다. 그렇지 않으면 모든 항목을 선택합니다.
    if (selectedItems.length === cartProduct?.data?.content?.length) {
      setSelectedItems([]);
      setCartOrderProducts([]);
      setDeleteProducts([]);
    } else {
      setSelectedItems(cartProduct?.data?.content);
      const cartProductIds = cartProduct?.data?.content?.map(
        (item: ProductItem) => item.cartProductId,
      );
      const productIds = cartProduct?.data?.content?.map(
        (item: ProductItem) => item.cartProductId,
      );
      setDeleteProducts(cartProductIds);
      setCartOrderProducts(productIds);
    }
  };
  const totalPriceSum =
    cartProduct?.data?.content?.reduce(
      (sum: number, item: ProductItem) => sum + item.productPrice * item.count,
      0,
    ) ?? 0;

  const onClickOrderButton = async () => {
    const orderProducts = selectedItems.map((product: ProductItem) => ({
      productId: product.productId,
      name: product.productName,
      color: product.color,
      size: product.size,
      count: product.count,
      totalPrice: product.productPrice, // totalPrice 값은 필요에 따라 설정해 주세요.
    }));
    if (orderProducts.length === 0) {
      toast.dismiss();
      errorMsg("주문하실 상품을 선택해주세요");
    } else {
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
              orderList,
              selectedProducts: JSON.stringify(selectedItems),
              orderDetailId: data.data.orderDetailId,
              orderNumber: data.data.orderNumber,
              productOrderNumbers,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onClickWholeOrderButton = async () => {
    const orderProducts = cartProduct?.data?.content?.map(
      (product: ProductItem) => ({
        productId: product.productId,
        name: product.productName,
        color: product.color,
        size: product.size,
        count: product.count,
        totalPrice: product.productPrice, // totalPrice 값은 필요에 따라 설정해 주세요.
      }),
    );
    const whole = cartProduct?.data?.content?.map(
      (product: ProductItem) => product.cartProductId,
    );
    const wholeOrderList = whole.join(",");
    console.log(orderProducts);
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
            orderList: wholeOrderList,
            selectedProducts: JSON.stringify(cartProduct?.data?.content),
            orderDetailId: data.data.orderDetailId,
            orderNumber: data.data.orderNumber,
            productOrderNumbers,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(selectedItems);
  const onClickSelectedOrderButton = async (item: ProductItem) => {
    setSelectedItems([...selectedItems, item]);

    const orderProducts = [
      {
        productId: item.productId,
        name: item.productName,
        color: item.color,
        size: item.size,
        count: item.count,
        totalPrice: item.productPrice, // totalPrice 값은 필요에 따라 설정해 주세요.
      },
    ];

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
            orderList: item.cartProductId,
            selectedProducts: JSON.stringify(selectedItems),
            orderDetailId: data.data.orderDetailId,
            orderNumber: data.data.orderNumber,
            productOrderNumbers,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return {
    onClickSelectedOrderButton,
    onClickWholeOrderButton,
    onClickOrderButton,
    setIsDataLoading,
    isCouponLoading: isLoading,
    deleteButtonDisabled,
    handleProductCheckboxChange,
    handleHeaderCheckboxChange,
    deleteCart,
    mutateAddCartProduct,
    mutateDeleteCartProduct,
    totalPriceSum,
    cartProduct,
    selectedItems,
    deleteProducts,
    setCartOrderProducts,
    setDeleteProducts,
    menuList,
    setSelectedItems,
    refetch,
    isDataLoading,
    totalPrice,
    timedOut,
    setTimedOut,
    isCartDataLoading,
    setLoadingProps,
    loadingProps,
    isLoading,
  };
}
