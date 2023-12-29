import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadMe } from "@/api/auth";
import useMypage from "@/hooks/useMypage";
import { useRouter } from "next/dist/client/router";

import useInput from "@/hooks/useInput";
import { paymentConfirm } from "@/api/shop";
import { RequestPayResponse } from "../../portone";
import PATH from "@/constants/path";

type Address = {
  address: string | undefined;
  zonecode: number | undefined;
};
export default function useOrder() {
  const router = useRouter();
  console.log(router.query);

  const { data } = useQuery([QUERYKEYS.LOAD_ME], loadMe);
  console.log(data);
  const { cartProduct } = useMypage();
  const OrdererInfo = [
    { meta: "이름", data: data?.data.userName },
    { meta: "연락처", data: data?.data.phoneNumber },
    { meta: "이메일", data: data?.data.email },
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

  type PgType = "kakaopay" | "naverpay" | "nice"; // 원하는 PG 사를 나열합니다.

  const [pgData, setPgData] = useState<PgType | undefined>();

  const handleDeliveryButtonClick = (index: any) => {
    setClickedDeliveryButtonIndex(index);
  };
  const [receiver, onChangeReceiver] = useInput("");
  const [detailPostal, onChangeDetailPostal] = useInput("");
  const [phoneNumber, onChangePhoneNumber] = useInput("");

  const handlePaymentButtonClick = (index: any) => {
    setClickedPaymentButtonIndex(index);
    if (index === 0) {
      setPgData("naverpay");
    } else if (index === 1) {
      setPgData("kakaopay");
    } else if (index === 2) {
      setPgData("nice");
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
    { id: 1, clicked: false, default: "네이버페이" },
    { id: 2, clicked: false, default: "카카오페이" },
    { id: 3, clicked: false, default: "일반결제" },
  ];
  interface NaverProduct {
    categoryType: string;
    categoryId: string;
    uid: string;
    name: string;
    count: number;
    // Add other properties as needed
  }

  const deliveryInputs = [
    {
      label: "받는 분",
      placeholder: "함민혁",
      onChange: onChangeReceiver,
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
    {
      label: "연락처",
      placeholder: "010-3009-2255",
      onChange: onChangePhoneNumber,
    },
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
      // try {
      //   const paymentData = await paymentConfirm({
      //     data: {
      //       imp_uid: response.imp_uid,
      //       merchant_uid: response.merchant_uid,
      //     },
      //   });
      //
      //   if (paymentData.verified) {
      //     console.log(paymentData);
      //     alert("결제 성공");
      //     //밑의 코드 추가
      //   }
      // } catch (err) {
      //   console.error(err);
      // }
      //   switch (res.status) {
      //     case: "vbankIssued":
      //       // 가상계좌 발급 시 로직
      //       break;
      //     case: "success":
      //       // 결제 성공 시 로직
      //       break;
      //   }
      // }
      // );

      const { selectedProducts } = router.query;

      router.push({
        pathname: PATH.ORDERCONFIRM,
        query: {
          selectedProducts: selectedProducts,
          orderInfo: JSON.stringify(response),
        },
      });
    } else {
      alert(error_msg);
      alert("결제 실패");
    }
  }

  console.log(cartProduct);

  async function handlePaymentSubmit() {
    const { orderList } = router.query; // 일반구매
    const { selectedProducts } = router.query;
    const { orderNumber } = router.query;
    // const { productOrderNumbers } = router.query;
    const orderProducts: string = String(orderList);

    console.log(clickedPaymentButtonIndex);

    if (typeof selectedProducts === "string") {
      console.log("selectedProducts", JSON.parse(selectedProducts));
    }
    // const directProducts: string = String(selectedProducts);
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
    console.log("price", totalPriceSum);
    const PriceInfo = [
      {
        meta: "상품 합계",
        data:
          totalPriceSum !== 0
            ? `${totalPriceSum >= 80000 ? totalPriceSum : totalPriceSum + 3000}`
            : `${
                totalPriceSumDirect >= 80000
                  ? totalPriceSumDirect
                  : totalPriceSumDirect + 3000
              }`,
      },
      { meta: "할인 금액", data: "0원" },
    ];

    console.log(PriceInfo);
    let selectedItems;
    let parsedSelectedProducts;
    let directPurchase;

    console.log(cartProduct);
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

    // 구매하기에서 온 동선
    if (directPurchase) {
      // 1) 네이버 페이 pg사 선택
      if (pgData === "naverpay") {
        const naverProducts: NaverProduct[] = [];

        parsedSelectedProducts.forEach((product: any) => {
          naverProducts.push({
            categoryType: "PRODUCT",
            categoryId: "GENERAL",
            uid: product.uid, // 상품id로 변경해야함
            name: product.title,
            count: product.count || 1,
          });
        });

        values.naverProducts = naverProducts;

        values = {
          pg: "naverpay",
          merchant_uid: orderNumber, // 상점에서 관리하는 주문 번호
          name: parsedSelectedProducts[0].title,
          amount: totalPriceSumDirect,
          buyer_email: OrdererInfo.find((info) => info.meta === "이메일"),
          buyer_name: receiver,
          buyer_tel: phoneNumber,
          buyer_addr: `${postalAddress.address} ${detailPostal}`,
          buyer_postcode: postalAddress.zonecode,
          naverPopupMode: false, // 팝업모드 활성화 -> redirecturl을 설정해야함
          m_redirect_url: "{결제 완료 후 리디렉션 될 URL}", // -> 어떻게 해야할지 결정
          // naverPurchaserName: "구매자이름",
          // naverPurchaserBirthday: "20151201",
          // naverChainId: "sAMplEChAINid",
          // naverMerchantUserKey: "가맹점의 사용자 키",
          // naverCultureBenefit: true, // 문화비 소득공제 적용여부,
        };
      }
      // 2) 카카오페이일때
      else if (pgData === "kakaopay") {
        let name;
        if (parsedSelectedProducts.length === 1) {
          name = parsedSelectedProducts[0].title;
        } else if (parsedSelectedProducts.length > 1) {
          const additionalItems = parsedSelectedProducts.length - 1;
          name = `${parsedSelectedProducts[0].title} 외 ${additionalItems} 건`;
        }
        values = {
          pg: "kakaopay",
          // pay_method: "card", // 생략가능
          merchant_uid: orderNumber, // 상점에서 생성한 고유 주문번호
          name,
          amount: totalPriceSumDirect,
          buyer_email: OrdererInfo.find((info) => info.meta === "이메일")?.data,
          buyer_name: receiver,
          buyer_tel: phoneNumber,
          buyer_addr: `${postalAddress.address} ${detailPostal}`,
          buyer_postcode: postalAddress.zonecode,
          m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}",
        };
      }
      // 2) 일반결제일때
      else if (pgData === "nice") {
        let name;
        if (parsedSelectedProducts.length === 1) {
          name = parsedSelectedProducts[0].title;
        } else if (parsedSelectedProducts.length > 1) {
          const additionalItems = parsedSelectedProducts.length - 1;
          name = `${parsedSelectedProducts[0].title} 외 ${additionalItems} 건`;
        }
        values = {
          pg: "nice",
          pay_method: "card", // 생략가능
          merchant_uid: orderNumber, // 상점에서 생성한 고유 주문번호
          name,
          amount: totalPriceSumDirect,
          buyer_email: OrdererInfo.find((info) => info.meta === "이메일")?.data,
          buyer_name: receiver,
          buyer_tel: phoneNumber,
          buyer_addr: `${postalAddress.address} ${detailPostal}`,
          buyer_postcode: postalAddress.zonecode,
          language: "ko", // 결제창 언어 선택 파라미터  ko: 한국어, en: 영문
          m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}",
        };
      }
    } else {
      console.log("장바구니 동선");

      // 1) 네이버 페이 pg사 선택
      if (pgData === "naverpay") {
        const naverProducts: NaverProduct[] = [];

        parsedSelectedProducts.forEach((product: any) => {
          naverProducts.push({
            categoryType: "PRODUCT",
            categoryId: "GENERAL",
            uid: product.uid, // 상품id로 변경해야함
            name: product.title,
            count: product.count || 1,
          });
        });

        values.naverProducts = naverProducts;

        values = {
          pg: "naverpay",
          merchant_uid: orderNumber, // 상점에서 관리하는 주문 번호
          name: parsedSelectedProducts[0].title,
          amount: totalPriceSum,
          buyer_email: OrdererInfo.find((info) => info.meta === "이메일"),
          buyer_name: receiver,
          buyer_tel: phoneNumber,
          buyer_addr: `${postalAddress.address} ${detailPostal}`,
          buyer_postcode: postalAddress.zonecode,
          naverPopupMode: false, // 팝업모드 활성화 -> redirecturl을 설정해야함
          m_redirect_url: "{결제 완료 후 리디렉션 될 URL}", // -> 어떻게 해야할지 결정
          // naverPurchaserName: "구매자이름",
          // naverPurchaserBirthday: "20151201",
          // naverChainId: "sAMplEChAINid",
          // naverMerchantUserKey: "가맹점의 사용자 키",
          // naverCultureBenefit: true, // 문화비 소득공제 적용여부,
        };
      }
      // 2) 카카오페이일때
      else if (pgData === "kakaopay") {
        let name;
        if (selectedItems.length === 1) {
          name = selectedItems[0].productName;
        } else if (selectedItems.length > 1) {
          const additionalItems = selectedItems.length - 1;
          name = `${selectedItems[0].productName} 외 ${additionalItems} 건`;
        }
        values = {
          pg: "kakaopay",
          // pay_method: "card", // 생략가능
          merchant_uid: orderNumber, // 상점에서 생성한 고유 주문번호
          name,
          amount: totalPriceSum,
          buyer_email: OrdererInfo.find((info) => info.meta === "이메일")?.data,
          buyer_name: receiver,
          buyer_tel: phoneNumber,
          buyer_addr: `${postalAddress.address} ${detailPostal}`,
          buyer_postcode: postalAddress.zonecode,
          m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}",
        };
      }
      // 2) 일반결제일때
      else if (pgData === "nice") {
        let name;
        if (selectedItems.length === 1) {
          name = selectedItems[0].productName;
        } else if (selectedItems.length > 1) {
          const additionalItems = selectedItems.length - 1;
          name = `${selectedItems[0].productName} 외 ${additionalItems} 건`;
        }
        values = {
          pg: "nice",
          pay_method: "card", // 생략가능
          merchant_uid: orderNumber, // 상점에서 생성한 고유 주문번호
          name,
          amount: totalPriceSum,
          buyer_email: OrdererInfo.find((info) => info.meta === "이메일")?.data,
          buyer_name: receiver,
          buyer_tel: phoneNumber,
          buyer_addr: `${postalAddress.address} ${detailPostal}`,
          buyer_postcode: postalAddress.zonecode,
          language: "ko", // 결제창 언어 선택 파라미터  ko: 한국어, en: 영문
          m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}",
        };
      }
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
  };
}
