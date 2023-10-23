import { useState } from "react";

type Address = {
  address: string | undefined;
  zonecode: number | undefined;
};
export default function useOrder() {
  const OrdererInfo = [
    { meta: "이름", data: "함민혁" },
    { meta: "연락처", data: "010-3009-2255" },
    { meta: "이메일", data: "ham9893@naver.com" },
  ];
  const PriceInfo = [
    { meta: "상품 합계", data: "86,600원" },
    { meta: "할인 금액", data: "0원" },
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
  const handleDeliveryButtonClick = (index: any) => {
    setClickedDeliveryButtonIndex(index);
  };

  const handlePaymentButtonClick = (index: any) => {
    setClickedPaymentButtonIndex(index);
  };
  const handlePostal = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },
    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setAddress({ address: data.address, zonecode: data.zonecode });
      setOpenPostcode(false);
    },
  };
  const DeliveryButtons = [
    { id: 1, clicked: false, default: "기본 배송지" },
    { id: 2, clicked: false, default: "신규 배송지" },
  ];
  const PaymentOptionsButtons = [
    { id: 1, clicked: false, default: "신용/체크 카드" },
    { id: 2, clicked: false, default: "카카오페이" },
    { id: 3, clicked: false, default: "토스페이" },
  ];

  const deliveryInputs = [
    { label: "받는 분", placeholder: "함민혁" },
    {
      label: "우편번호",
      size: 75,
      title: "검색하기",
      onClick: handlePostal,
      value: postalAddress.zonecode,
    },
    { label: "주소", value: postalAddress.address },
    { label: "상세 주소" },
    { label: "연락처", placeholder: "010-3009-2255" },
  ];
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
    PriceInfo,
    OrdererInfo,
  };
}
