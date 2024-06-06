import { useEffect, useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadMe } from "@/api/auth";
import { useRouter } from "next/dist/client/router";
import useInput from "@/hooks/useInput";
import PATH from "@/constants/path";
import { paymentConfirm, paymentPrepare } from "@/api/shop";
import useCart from "@/hooks/mypage/cart/useCart";
import {
  loadDefaultAddress,
  updateDefaultAddress,
  updatePhoneNumber,
} from "@/api/cart";
import useCoupon from "@/hooks/mypage/coupon/useCoupon";
import errorMsg from "@/components/Toast/error";
import { RequestPayResponse } from "../../portone";

type Address = {
  address: string | undefined | null;
  zonecode: string | number | undefined | null;
};
type CommonInputField = {
  label: string;
  size?: number;
  title?: string;
  onClick?: {
    clickButton: () => void;
    selectAddress: (addressData: any) => void;
  };
  value?: any;
  onChange?: any;
};

export default function useOrder() {
  const router = useRouter();
  const [receiver, onChangeReceiver, setReceiver] = useInput("");
  const [detailPostal, onChangeDetailPostal, setDetailPostal] = useInput("");
  const [phoneNumber, onChangePhoneNumber, setPhoneNumber] = useInput("");
  const [deliveryMsg, onChangeDeliveryMsg] = useInput("");
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  const { couponData } = useCoupon();

  const handleCheckboxChange = () => {
    setIsDefaultAddress(!isDefaultAddress);
    // 추가로 기본 배송지로 설정하는 로직을 여기에 추가할 수 있습니다.
  };

  const { data: myInfo, isSuccess } = useQuery([QUERYKEYS.LOAD_ME], loadMe);
  const { cartProduct } = useCart();
  useEffect(() => {
    // isSuccess가 true이고 myInfo.data가 존재할 때에만 setReceiver 호출
    if (isSuccess && myInfo?.data) {
      setReceiver(myInfo.data.userName);
      setPhoneNumber(myInfo.data.phoneNumber);
    }
  }, [isSuccess, myInfo]);
  const OrdererInfo = [
    { meta: "이름", data: myInfo?.data.userName },
    { meta: "연락처", data: myInfo?.data.phoneNumber },
    { meta: "이메일", data: myInfo?.data.email },
  ];
  const { orderList } = router.query;
  const { selectedProducts } = router.query;
  const orderProducts: string = String(orderList);
  let totalPriceSum = 0;
  if (cartProduct !== undefined) {
    totalPriceSum = cartProduct?.data.content
      .filter((v: any) =>
        orderProducts?.split(",").map(Number)?.includes(v.cartProductId),
      )
      .reduce(
        (sum: any, item: any) => sum + item.discountPrice * item.count,
        0,
      );
  }
  let totalPriceSumDirect = 0;
  if (typeof selectedProducts === "string") {
    totalPriceSumDirect = JSON.parse(selectedProducts).reduce(
      (sum: any, item: any) => sum + item.price * item.count,
      0,
    );
  }
  const [selectedCoupon, setSelectedCoupon] = useState<number>(0);
  // TODO: 쿠폰가격 변경
  const couponPrice = couponData?.data.couponInfos[0]?.discount ?? 0;

  const toggleCoupon = (couponId: number) => {
    // 쿠폰이 이미 선택된 경우 또는 선택 취소를 위해 동일한 쿠폰을 클릭한 경우
    if (selectedCoupon === couponId) {
      setSelectedCoupon(0); // 선택 취소
    } else {
      setSelectedCoupon(couponPrice);
    }
  };

  const [isCouponVisible, setIsCouponVisible] = useState(false);

  const handleCouponToggle = () => {
    setIsCouponVisible(!isCouponVisible);
  };

  const [totalPriceFinal, setTotalPriceFinal] = useState<number>(0);
  const [deliveryPrice] = useState<number>(3000);

  useEffect(() => {
    let calculatedTotalPrice = 0;

    if (totalPriceSum !== 0) {
      calculatedTotalPrice = totalPriceSum + deliveryPrice;
    } else {
      calculatedTotalPrice = totalPriceSumDirect + deliveryPrice;
    }
    setTotalPriceFinal(calculatedTotalPrice);
  }, [
    totalPriceSum,
    totalPriceSumDirect,
    deliveryPrice,
    selectedCoupon,
    couponPrice,
  ]);

  const PriceInfo = [
    {
      meta: "상품 금액",
      data:
        totalPriceSum !== 0
          ? `${totalPriceSum.toLocaleString()}원`
          : `${totalPriceSumDirect.toLocaleString()}원`,
    },
    {
      meta: "배송비",
      data: "3,000원",
    },
    {
      meta: "쿠폰할인",
      data: selectedCoupon ? `-${couponPrice}원` : "0원",
    },
    // Add other items in PriceInfo array as needed
  ];

  const queryClient = new QueryClient();

  const mutateUpdateAddressProduct = useMutation(
    ["updateDefaultAddress"],
    updateDefaultAddress,
    {
      onSuccess: async () => {
        console.log("주소 업데이트 성공");
        queryClient.invalidateQueries([QUERYKEYS.LOAD_DEFAULT_ADDRESS]);
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

  const mutateUpdatePhoneNumber = useMutation(
    ["updatePhoneNumber"],
    updatePhoneNumber,
    {
      onSuccess: async () => {
        console.log("핸드폰번호 업데이트 성공");
        queryClient.invalidateQueries([QUERYKEYS.UPDATE_DEFAULT_PHONENUMBER]);
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

  const [clickedPaymentButtonIndex, setClickedPaymentButtonIndex] =
    useState(null);
  const [clickedDeliveryButtonIndex, setClickedDeliveryButtonIndex] =
    useState<number>();
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [postalAddress, setAddress] = useState<Address>({
    address: undefined,
    zonecode: undefined,
  });

  const { data: defaultAddress, isLoading } = useQuery(
    [QUERYKEYS.LOAD_DEFAULT_ADDRESS],
    loadDefaultAddress,
  );

  type PgType = "kakaopay" | "card" | "vbank"; // 원하는 PG 사를 나열합니다.
  type PgMethod = "kakaopay" | "nice_v2"; // 원하는 PG 사를 나열합니다.

  const [pgData, setPgData] = useState<PgType | undefined>();
  const [pgMethod, setPgMethod] = useState<PgMethod | undefined>();

  const handleDeliveryButtonClick = (index: any) => {
    setClickedDeliveryButtonIndex(index);
  };

  const handlePaymentButtonClick = (index: any) => {
    setClickedPaymentButtonIndex(index);
    if (index === 0) {
      setPgData("kakaopay");
      setPgMethod("kakaopay");
    } else if (index === 1) {
      setPgData("card");
      setPgMethod("nice_v2");
    } else if (index === 2) {
      setPgData("vbank");
      setPgMethod("nice_v2");
    }
  };
  const handlePostal = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },
    // 주소 선택 이벤트
    selectAddress: (addressData: any) => {
      setAddress({
        address: addressData.address,
        zonecode: addressData.zonecode,
      });
      setOpenPostcode(false);
    },
  };
  const [DeliveryButtons] = useState([
    { id: 1, default: "기본 배송지" },
    { id: 2, default: "신규 배송지" },
  ]);

  useEffect(() => {
    if (!isLoading) {
      // 데이터가 있으면
      if (
        defaultAddress &&
        defaultAddress.data &&
        defaultAddress.data.detailAddress &&
        defaultAddress.data.roadAddress &&
        defaultAddress.data.zipCode
      ) {
        setAddress({
          address: defaultAddress.data.roadAddress,
          zonecode: defaultAddress.data.zipCode,
        });
        setDetailPostal(defaultAddress.data.detailAddress);

        setClickedDeliveryButtonIndex(0);
      } else {
        setClickedDeliveryButtonIndex(1);
      }
    }
  }, [defaultAddress, isLoading]);

  useEffect(() => {
    if (clickedDeliveryButtonIndex === 1) {
      setAddress(() => ({
        address: "",
        zonecode: "",
      }));
      setDetailPostal("");
      setReceiver("");
      setPhoneNumber("");
      console.log(receiver);
    } else if (clickedDeliveryButtonIndex === 0) {
      if (isSuccess && myInfo?.data) {
        setReceiver(myInfo.data.userName);
        setPhoneNumber(myInfo.data.phoneNumber);
      }
      if (defaultAddress) {
        setAddress((prevAddress) => ({
          ...prevAddress,
          address: defaultAddress.data.roadAddress,
          zonecode: defaultAddress.data.zipCode,
        }));
        setDetailPostal(defaultAddress.data.detailAddress);
      }
    }
  }, [clickedDeliveryButtonIndex]);

  const PaymentOptionsButtons = [
    { id: 0, clicked: false, default: "카카오페이" },
    { id: 1, clicked: false, default: "일반결제" },
    { id: 2, clicked: false, default: "무통장입금" },
  ];

  const commonInputFields: CommonInputField[] = [
    {
      label: "우편번호",
      size: 75,
      title: "검색하기",
      onClick: handlePostal,
      value: postalAddress.zonecode,
    },
    { label: "주소", value: postalAddress.address },
    { label: "상세 주소", value: detailPostal, onChange: onChangeDetailPostal },
  ];

  const deliveryInputs = [
    {
      label: "받는 분",
      onChange: onChangeReceiver,
      value: receiver,
    },
    {
      label: "연락처",
      onChange: onChangePhoneNumber,
      value: phoneNumber,
    },
    ...commonInputFields,
  ];
  const DefaultAddressInputs = [...commonInputFields];
  const currentDate = new Date();

  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);

  // Format the date as YYYY-MM-DD
  const formattedNextDay = `${nextDay.getFullYear()}-${(nextDay.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${nextDay.getDate().toString().padStart(2, "0")}`;

  const vbankDue = formattedNextDay;

  /* 3. 콜백 함수 정의하기 */
  async function callback(response: RequestPayResponse) {
    if (response.error_msg) {
      alert(
        `결제에 실패하였습니다. 결제를 다시 시도해주세요. ${response.error_msg}`,
      );
      console.log("response.error_msg", response.error_msg);
      router.replace(`/shop`);
      return;
    }

    if (response.imp_uid) {
      try {
        const paymentData = await paymentConfirm({
          imp_uid: response.imp_uid,
          merchant_uid: response.merchant_uid,
        });

        console.log(paymentData);

        if (paymentData.data.verified) {
          console.log(paymentData);
          try {
            await router.push({
              pathname: PATH.ORDERCONFIRM,
              query: {
                selectedProducts,
                orderInfo: JSON.stringify(response),
              },
            });
          } catch (error) {
            /* empty */
          }
        }
      } catch (err) {
        console.error(err);
        alert("결제에 실패했습니다.");
      }
    } else {
      alert("결제에 실패했습니다.");
    }
  }

  async function handlePaymentSubmit() {
    const { orderNumber } = router.query;

    if (typeof selectedProducts === "string") {
      console.log("selectedProducts", JSON.parse(selectedProducts));
    }

    let selectedItems;
    let parsedSelectedProducts;
    let directPurchase;

    console.log(cartProduct);

    if (
      !receiver ||
      !phoneNumber ||
      !postalAddress.zonecode ||
      !postalAddress.address ||
      !detailPostal
    ) {
      errorMsg("입력되지 않은 필드가 있습니다. 모든 필드를 입력해주세요.");
      return;
    }

    if (!pgMethod) {
      errorMsg("결제 방식을 선택해주세요.");
      return;
    }

    if (isDefaultAddress) {
      mutateUpdateAddressProduct.mutate({
        recipientName: receiver,
        zipCode: postalAddress.zonecode,
        roadAddress: postalAddress.address,
        detailAddress: detailPostal,
        recipientPhoneNumber: phoneNumber,
      });
      mutateUpdatePhoneNumber.mutate({ newPhoneNumber: phoneNumber });
    }

    if (
      cartProduct &&
      cartProduct?.data.content.filter((v: any) =>
        orderProducts?.split(",").map(Number)?.includes(v.cartProductId),
      ).length !== 0
    ) {
      directPurchase = false; // 장바구니에서 선택, 직접 구매한 제품이 아님
      // If the condition is true
      selectedItems = cartProduct?.data.content
        .filter((v: any) =>
          orderProducts?.split(",").map(Number)?.includes(v.cartProductId),
        )
        // eslint-disable-next-line array-callback-return
        .map((item: any) => {
          console.log("장바구니에서 선택된 제품", item);
          return item;
        });

      console.log("장바구니에서 선택된 제품 배열: ", selectedItems);
    } else {
      // If the condition is false
      console.log("구매하기에서 선택된 제품");
      directPurchase = true;

      if (typeof selectedProducts === "string") {
        parsedSelectedProducts = JSON.parse(selectedProducts);
        console.log("구매하기에서 선택된 제품:", parsedSelectedProducts);
      }
    }
    let values: any = {};
    console.log(directPurchase);
    console.log(totalPriceFinal);

    // 구매하기에서 온 동선
    if (directPurchase) {
      // 2) 카카오페이일때
      let name;
      if (parsedSelectedProducts.length === 1) {
        name = parsedSelectedProducts[0].title;
      } else if (parsedSelectedProducts.length > 1) {
        const additionalItems = parsedSelectedProducts.length - 1;
        name = `${parsedSelectedProducts[0].title} 외 ${additionalItems} 건`;
      }
      values = {
        pg: pgMethod,
        pay_method: pgData, // 생략가능
        merchant_uid: orderNumber, // 상점에서 생성한 고유 주문번호
        name,
        custom_data: { couponId: selectedCoupon, deliveryPrice, deliveryMsg },
        amount: totalPriceFinal,
        buyer_email: OrdererInfo.find((info) => info.meta === "이메일")?.data,
        buyer_name: receiver,
        buyer_tel: phoneNumber,
        buyer_addr: `${postalAddress.address} ${detailPostal}`,
        buyer_postcode: postalAddress.zonecode,
        vbank_due: vbankDue,
        m_redirect_url: `https://api.recordyslow.com/payments/completeMobile`,
      };
    } else {
      console.log("장바구니 동선");
      let name;
      if (selectedItems.length === 1) {
        name = selectedItems[0].productName;
      } else if (selectedItems.length > 1) {
        const additionalItems = selectedItems.length - 1;
        name = `${selectedItems[0].productName} 외 ${additionalItems} 건`;
      }
      values = {
        pg: pgMethod,
        pay_method: pgData, // 생략가능
        merchant_uid: orderNumber, // 상점에서 생성한 고유 주문번호
        name,
        amount: totalPriceFinal,
        buyer_email: OrdererInfo.find((info) => info.meta === "이메일")?.data,
        buyer_name: receiver,
        custom_data: { couponId: selectedCoupon, deliveryPrice, deliveryMsg },
        buyer_tel: phoneNumber,
        buyer_addr: `${postalAddress.address} ${detailPostal}`,
        buyer_postcode: postalAddress.zonecode,
        vbank_due: vbankDue,
        m_redirect_url: `https://api.recordyslow.com/payments/completeMobile`,
      };
    }

    console.log(values);
    // //사전검증
    try {
      const paymentData = await paymentPrepare({
        merchant_uid: orderNumber,
        ...(selectedCoupon !== undefined && { couponId: selectedCoupon }),
        deliveryPrice,
      });

      if (paymentData) {
        const { IMP } = window;
        IMP?.init("imp47805780"); // 가맹점 식별코드

        /* 4. 결제 창 호출하기 */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore

        IMP.request_pay({ ...values, niceMobileV2: true }, callback);
      }
      // Rest of your code handling paymentData
    } catch (error) {
      // Handle the error
      console.log(error);
      alert("결제에 실패하였습니다. 결제를 다시 시도해주세요.");
      router.replace(`/shop`);
    }

    // if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
  }

  return {
    clickedPaymentButtonIndex,
    clickedDeliveryButtonIndex,
    openPostcode,
    postalAddress,
    handleDeliveryButtonClick,
    handlePaymentButtonClick,
    handlePostal,
    deliveryInputs,
    PaymentOptionsButtons,
    DeliveryButtons,
    OrdererInfo,
    handlePaymentSubmit,
    totalPriceSum,
    orderProducts,
    totalPriceSumDirect,
    totalPriceFinal,
    PriceInfo,
    selectedProducts,
    toggleCoupon,
    selectedCoupon,
    DefaultAddressInputs,
    handleCouponToggle,
    isCouponVisible,
    handleCheckboxChange,
    isDefaultAddress,
    receiver,
    deliveryMsg,
    onChangeDeliveryMsg,
    couponData,
    isCouponLoading: isLoading,
    couponPrice,
  };
}
