import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadOrderDetail } from "@/api/auth";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { SelectedItem } from "@/interface/Cancel/SelectedItem";
import { toast } from "react-toastify";
import errorMsg from "@/components/Toast/error";
import { requestUserOrderCancel } from "@/api/cart";
import useInput from "@/hooks/useInput";
import toastMsg from "@/components/Toast";
import PATH from "@/constants/path";

interface CancelInfo {
  orderNumber: number;
  productOrderCancelRequests: ProductOrderCancelRequest[];
  reason: "string";
}
interface ProductOrderCancelRequest {
  productOrderNumber: number;
  cancelAmount: number;
}
export default function useOrderCancel() {
  const router = useRouter();
  const { orderId } = router.query;
  const queryClient = useQueryClient();
  const [reason, onChangeReason] = useInput("");
  const [cancelCount, setCancelCount] = useState(0);

  const { data: orderDetail } = useQuery(
    [QUERYKEYS.LOAD_ORDER_DETAIL],
    () => loadOrderDetail(orderId),
    {
      enabled: Boolean(orderId), // orderID가 있을 때만 쿼리 실행
      cacheTime: 60000, // 캐시 유지 시간 (예: 60초)
    },
  );
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]); // 전체 주문 상품
  const [selectedCancelItems, setSelectedCancelItems] = useState<
    SelectedItem[]
  >([]);
  const handleProductCheckboxChange = (item: SelectedItem) => {
    // 항목이 이미 선택되었는지 확인
    const isSelected = selectedCancelItems.some((selectedItem) => {
      // 각 항목의 수량을 제외하고 동일한 항목을 찾습니다.
      const { count, ...restItem } = item;
      const { count: selectedCount, ...restSelectedItem } = selectedItem;
      return JSON.stringify(restItem) === JSON.stringify(restSelectedItem);
    });

    // 이미 선택된 경우 선택 해제하고, 그렇지 않은 경우 selectedItems 배열에 추가합니다.
    if (isSelected) {
      setSelectedCancelItems(
        selectedCancelItems.filter((v) => {
          // 각 항목의 수량을 제외하고 동일한 항목을 제거합니다.
          const { count, ...restItem } = item;
          const { count: selectedCount, ...restSelectedItem } = v;
          return JSON.stringify(restItem) !== JSON.stringify(restSelectedItem);
        }),
      );
    } else {
      setSelectedCancelItems([
        ...selectedCancelItems,
        { ...item, count: item.prevCount },
      ]);
    }
  };
  const inputChangeHandler = (event: any, productOrderNumber: number) => {
    setSelectedCancelItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.productOrderNumber === productOrderNumber) {
          return {
            ...item,
            count: event.target.value,
          };
        }
        return item;
      });
    });
  };
  const handleIncrement = (key: string | undefined | number) => {
    setSelectedCancelItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.productOrderNumber === key && item.count < item.prevCount) {
          return {
            ...item,
            count: item.count + 1,
          };
        }
        if (item.productOrderNumber === key && item.count >= item.prevCount) {
          toast.dismiss();
          errorMsg("최대 수량입니다!");
        }
        return item;
      });
    });
  };
  const handleDecrement = (key: string | undefined | number) => {
    setSelectedCancelItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.productOrderNumber === key && item.count > 1) {
          return {
            ...item,
            count: item.count - 1,
          };
        }
        if (item.productOrderNumber === key && item.count <= 1) {
          toast.dismiss();
          errorMsg("최소 수량입니다!");
        }
        return item;
      });
    });
  };
  const handleDelete = (key: string | undefined | number) => {
    setSelectedCancelItems((prevItems) => {
      return prevItems.filter((item) => item.productOrderNumber !== key);
    });
  };
  const syncItemCount = () => {
    setSelectedItems((prevSelectedItems) => {
      // 선택된 항목들의 수량을 취소된 항목들의 수량과 동일하게 설정
      return prevSelectedItems.map((selectedItem) => {
        const cancelItem = selectedCancelItems.find(
          (item) => item.productOrderNumber === selectedItem.productOrderNumber,
        );
        if (cancelItem) {
          return { ...selectedItem, count: cancelItem.count };
        }
        return selectedItem;
      });
    });
  };

  const mutateRequestUserCancel = useMutation(
    ["requestUserOrderCancel"],
    requestUserOrderCancel,
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QUERYKEYS.LOAD_ORDER_LIST]);
        toastMsg("취소 신청이 완료되었습니다!");
        router.push({
          pathname: PATH.MYPAGE,
          query: { tab: "주문내역" },
        });
      },
      onError: ({
        response: {
          data: { errorCode, message },
        },
      }) => {
        console.log(`${errorCode} / ${message}`);
      },
    },
  );
  console.log("cancel", selectedCancelItems);
  // const [productOrderCancelRequests, setProductOrderCancelRequests] =
  //   useState<ProductOrderCancelRequest[]>();
  const [cancelInfo, setCancelInfo] = useState<CancelInfo>({
    orderNumber: orderDetail?.data.orderNumber,
    productOrderCancelRequests: [],
    reason,
  });
  useEffect(() => {
    setCancelInfo((info) => ({ ...info, reason }));
  }, [reason]);
  useEffect(() => {
    const productOrderCancelRequests = selectedCancelItems.map((item) => ({
      productOrderNumber: item.productOrderNumber,
      cancelAmount: item.count,
    }));
    setCancelCount(productOrderCancelRequests.length);
    setCancelInfo((info) => ({
      ...info,
      productOrderCancelRequests,
    }));
  }, [selectedCancelItems]);
  return {
    handleProductCheckboxChange,
    selectedItems,
    setSelectedItems,
    orderDetail,
    selectedCancelItems,
    syncItemCount,
    inputChangeHandler,
    handleIncrement,
    handleDecrement,
    handleDelete,
    mutateRequestUserCancel,
    onChangeReason,
    reason,
    cancelInfo,
    cancelCount,
    setCancelInfo,
  };
}
