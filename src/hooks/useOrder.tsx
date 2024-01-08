import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadMe } from "@/api/auth";
import useMypage from "@/hooks/mypage/useMypage";
import { useRouter } from "next/dist/client/router";

import useInput from "@/hooks/useInput";
import PATH from "@/constants/path";
import { paymentConfirm } from "@/api/shop";
import { RequestPayResponse } from "../../portone";
import useCart from "@/hooks/mypage/cart/useCart";

type Address = {
  address: string | undefined;
  zonecode: number | undefined;
};
export default function useOrder() {
  const router = useRouter();
  console.log(router.query);
  const [receiver, onChangeReceiver, setReceiver] = useInput("");
  const [detailPostal, onChangeDetailPostal] = useInput("");
  const [phoneNumber, onChangePhoneNumber, setPhoneNumber] = useInput("");

  const { data: myInfo, isSuccess } = useQuery([QUERYKEYS.LOAD_ME], loadMe);
  const { cartProduct } = useCart();
  useEffect(() => {
    // isSuccess가 true이고 myInfo.data가 존재할 때에만 setReceiver 호출
    if (isSuccess && myInfo?.data) {
      setReceiver(myInfo.data.userName);
      setPhoneNumber(myInfo.data.phoneNumber);
    }
  }, [isSuccess, myInfo]);
  console.log(myInfo);
  const OrdererInfo = [
    { meta: "이름", data: myInfo?.data.userName },
    { meta: "연락처", data: myInfo?.data.phoneNumber },
    { meta: "이메일", data: myInfo?.data.email },
  ];
  const { orderList } = router.query;
  const { selectedProducts } = router.query;
  const orderProducts: string = String(orderList);
  const totalPriceSum = cartProduct?.data.content
    .filter(
      (v: any) =>
        orderProducts.split(",").map(Number)?.includes(v.cartProductId),
    )
    .reduce((sum: any, item: any) => sum + item.productPrice * item.count, 0);
  let totalPriceSumDirect = 0;
  if (typeof selectedProducts === "string") {
    totalPriceSumDirect = JSON.parse(selectedProducts).reduce(
      (sum: any, item: any) => sum + item.price * item.count,
      0,
    );
  }

  console.log(totalPriceSum);
  let totalPriceFinal: any;

  if (totalPriceSum !== 0) {
    totalPriceFinal =
      totalPriceSum >= 80000 ? totalPriceSum : totalPriceSum + 3000;
  } else {
    totalPriceFinal =
      totalPriceSumDirect >= 80000
        ? totalPriceSumDirect
        : totalPriceSumDirect + 3000;
  }

  const PriceInfo = [
    {
      meta: "상품 금액",
      data:
        totalPriceSum !== 0 ? `${totalPriceSum}원` : `${totalPriceSumDirect}원`,
    },
    {
      meta: "배송비",
      data:
        totalPriceSum !== 0
          ? `+ ${totalPriceSum >= 80000 ? 0 : 3000}원`
          : `+ ${totalPriceSumDirect >= 80000 ? 0 : 3000}원`,
    },
    {
      meta: "쿠폰할인",
      data: "-0원",
    },
  ];

  const [clickedPaymentButtonIndex, setClickedPaymentButtonIndex] =
    useState(null);
  const [clickedDeliveryButtonIndex, setClickedDeliveryButtonIndex] =
    useState(null);
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [postalAddress, setAddress] = useState<Address>({
    address: undefined,
    zonecode: undefined,
  });

  type PgType = "kakaopay" | "card" | "vbank"; // 원하는 PG 사를 나열합니다.

  const [pgData, setPgData] = useState<PgType | undefined>();

  const handleDeliveryButtonClick = (index: any) => {
    setClickedDeliveryButtonIndex(index);
  };

  const handlePaymentButtonClick = (index: any) => {
    setClickedPaymentButtonIndex(index);
    if (index === 0) {
      setPgData("kakaopay");
    } else if (index === 1) {
      setPgData("card");
    } else if (index === 2) {
      setPgData("vbank");
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
  const DeliveryButtons = [
    { id: 1, clicked: false, default: "기본 배송지" },
    { id: 2, clicked: false, default: "신규 배송지" },
  ];
  const PaymentOptionsButtons = [
    { id: 0, clicked: false, default: "카카오페이" },
    { id: 1, clicked: false, default: "일반결제" },
    { id: 2, clicked: false, default: "무통장입금" },
  ];

  console.log(myInfo);

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
    {
      label: "우편번호",
      size: 75,
      title: "검색하기",
      onClick: handlePostal,
      value: postalAddress.zonecode,
    },
    { label: "주소", value: postalAddress.address },
    { label: "상세 주소", onChange: onChangeDetailPostal },
  ];

  /* 3. 콜백 함수 정의하기 */
  async function callback(response: RequestPayResponse) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { success, error_msg } = response;

    console.log(response);

    if (!success) {
      alert(`결제에 실패하였습니다. 에러 내용: ${error_msg}`);
      return;
    }

    if (success) {
      // TODO: api 현재 401 unauthorized가 뜨면서 실패, 성공됐다고 가정하고 짜겠음
      alert(`결제에 성공했습니다. 결제검증을 구현하세요`);
      router.push({
        pathname: PATH.ORDERCONFIRM,
        query: {
          selectedProducts,
          orderInfo: JSON.stringify(response),
        },
      });
      // try {
      //   const paymentData = await paymentConfirm({
      //     imp_uid: response.imp_uid,
      //     merchant_uid: response.merchant_uid,
      //   });
      //
      //   console.log(paymentData);
      //
      //   if (paymentData.verified) {
      //     console.log(paymentData);
      //     alert("결제 성공");
      //     router.push({
      //       pathname: PATH.ORDERCONFIRM,
      //       query: {
      //         selectedProducts,
      //         orderInfo: JSON.stringify(response),
      //       },
      //     });
      //   }
      // } catch (err) {
      //   console.error(err);
      // }
    } else {
      alert(error_msg);
      alert("결제 실패");
    }
  }

  console.log(cartProduct);

  async function handlePaymentSubmit() {
    const { orderNumber } = router.query;
    // const { productOrderNumbers } = router.query;

    if (typeof selectedProducts === "string") {
      console.log("selectedProducts", JSON.parse(selectedProducts));
    }
    // const directProducts: string = String(selectedProducts);

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
      alert("입력되지 않은 필드가 있습니다. 모든 필드를 입력해주세요.");
      return;
    }

    if (
      cartProduct?.data.content.filter(
        (v: any) =>
          orderProducts.split(",").map(Number)?.includes(v.cartProductId),
      ).length !== 0
    ) {
      directPurchase = false; // 장바구니에서 선택, 직접 구매한 제품이 아님
      // If the condition is true
      selectedItems = cartProduct?.data.content
        .filter(
          (v: any) =>
            orderProducts.split(",").map(Number)?.includes(v.cartProductId),
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
    totalPriceFinal = 100;

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
        pg: "nice",
        pay_method: pgData, // 생략가능
        merchant_uid: orderNumber, // 상점에서 생성한 고유 주문번호
        name,
        // amount: totalPriceFinal,
        amount: totalPriceFinal,
        buyer_email: OrdererInfo.find((info) => info.meta === "이메일")?.data,
        buyer_name: receiver,
        buyer_tel: phoneNumber,
        buyer_addr: `${postalAddress.address} ${detailPostal}`,
        buyer_postcode: postalAddress.zonecode,
        m_redirect_url: `https://recordyslow.com/orderConfirmMobile`,
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
        pg: "nice",
        pay_method: pgData, // 생략가능
        merchant_uid: orderNumber, // 상점에서 생성한 고유 주문번호
        name,
        // amount: totalPriceFinal,
        amount: totalPriceFinal,
        buyer_email: OrdererInfo.find((info) => info.meta === "이메일")?.data,
        buyer_name: receiver,
        buyer_tel: phoneNumber,
        buyer_addr: `${postalAddress.address} ${detailPostal}`,
        buyer_postcode: postalAddress.zonecode,
        m_redirect_url: `https://recordyslow.com/orderConfirmMobile`,
        custom_data: 3000,
      };
    }

    console.log(values);

    console.log(pgData);
    console.log(OrdererInfo.find((info) => info.meta === "이메일")?.data);

    // if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    IMP.init("imp47805780"); // 가맹점 식별코드

    /* 4. 결제 창 호출하기 */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    IMP.request_pay(values, callback);
  }
  const [selectedCoupons, setSelectedCoupons] = useState<number[]>([]);

  const toggleCoupon = (couponId: number) => {
    // 쿠폰 ID가 이미 선택된 목록에 있는지 확인
    const isSelected = selectedCoupons.includes(couponId);

    // 선택되지 않은 경우 추가, 선택된 경우 제거
    if (!isSelected) {
      setSelectedCoupons((prev) => [...prev, couponId]);
    } else {
      setSelectedCoupons((prev) => prev.filter((id) => id !== couponId));
    }
  };

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
    cartProduct,
    toggleCoupon,
    selectedCoupons,
  };
}
