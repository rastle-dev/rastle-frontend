import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toastMsg from "@/components/Toast";
import QUERYKEYS from "@/constants/querykey";
import {
  loadCartProduct,
  loadDefaultAddress,
  updateDefaultAddress,
} from "@/api/cart";
import { toast } from "react-toastify";
import errorMsg from "@/components/Toast/error";
import useInput from "@/hooks/useInput";
import { useEffect, useState } from "react";

type Address = {
  address: string | undefined;
  zonecode: number | undefined;
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

export default function useDefaultAddress() {
  const queryClient = useQueryClient();
  const [receiver, onChangeReceiver, setReceiver] = useInput("");
  const [phoneNumber, onChangePhoneNumber, setPhoneNumber] = useInput("");
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const { data: defaultAddressData, isLoading } = useQuery(
    [QUERYKEYS.LOAD_CART],
    loadDefaultAddress,
    {
      enabled: isDataLoading,
    },
  );
  const [postalAddress, setAddress] = useState<Address>({
    address: defaultAddressData?.data.roadAddress,
    zonecode: defaultAddressData?.data.zipCode,
  });
  const [detailPostal, onChangeDetailPostal] = useInput(
    defaultAddressData?.data.detailAddress,
  );
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
  const mutateUpdateAddressProduct = useMutation(
    ["updateDefaultAddress"],
    updateDefaultAddress,
    {
      onSuccess: async () => {
        toastMsg("업데이트 성공");
        queryClient.invalidateQueries([QUERYKEYS.LOAD_DEFAULT_ADDRESS]);
      },
      onError: ({
        response: {
          data: { errorCode, message },
        },
      }) => {
        toast.dismiss();
        errorMsg("업데이트 실패");
        console.log(`${errorCode} / ${message}`);
      },
    },
  );
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

  const OrderInputs = [
    ...commonInputFields,
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
  ];
  const DefaultAddressInputs = [...commonInputFields];

  // onChange도중에는 useQuery불리지 않게 하기 커서 들어가는 순간 false로 막기 ref써서
  // useEffect(() => {
  //   setIsDataLoading(false);
  // }, []);
  return {
    mutateUpdateAddressProduct,
    defaultAddressData,
    isLoading,
    openPostcode,
    DefaultAddressInputs,
    OrderInputs,
    handlePostal,
    postalAddress,
    detailPostal,
  };
}
