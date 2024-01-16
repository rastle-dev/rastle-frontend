import React, { useEffect, useState } from "react";
import useLoginInfo from "@/hooks/mypage/loginInfo/useLoginInfo";
import LoadingBar from "@/components/LoadingBar";
import Dialog from "@/components/Common/Dialog";
import PATH from "@/constants/path";
import { useRouter } from "next/dist/client/router";
import * as S from "@/styles/mypage/defaultAddress/index.styles";
import DaumPostcode from "react-daum-postcode";
import useOrder from "@/hooks/useOrder";
import useDefaultAddress from "@/hooks/mypage/defaultAddress/useDefaultAddress";
import useDialog from "@/hooks/useDialog";

export default function DefaultAddress() {
  const {
    mutateUpdateAddressProduct,
    defaultAddressData,
    isLoading,
    openPostcode,
    handlePostal,
    DefaultAddressInputs,
    postalAddress,
    detailPostal,
  } = useDefaultAddress();
  const { deleteUser, logout } = useLoginInfo();
  const { openDialog, closeDialog, isDialogOpen } = useDialog();

  console.log("address", defaultAddressData?.data);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     mutateUpdateAddressProduct.mutate({
  //       zipCode: "12345",
  //       roadAddress: "서울특별시 강남구 테헤란로 427",
  //       detailAddress: "테헤란로 427",
  //     });
  //   }
  // }, []);
  const router = useRouter();
  const [timedOut, setTimedOut] = useState(false);
  let timeoutId: NodeJS.Timeout | undefined;
  useEffect(() => {
    if (isLoading && timedOut) {
      openDialog();
    }
  }, [timedOut]);
  useEffect(() => {
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setTimedOut(true);
      }, 5000);
    } else {
      setTimedOut(false);
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  if (isLoading && !timedOut) return <LoadingBar type={6} />;

  // const inputs = [
  //   {
  //     label: "우편번호",
  //     size: 75,
  //     title: "검색하기",
  //     onClick: handlePostal,
  //     value: postalAddress.zonecode,
  //   },
  //   { label: "주소", value: postalAddress.address },
  //   { label: "상세 주소", value: detailPostal, onChange: onChangeDetailPostal },
  // ];

  return (
    <div>
      {isDialogOpen && (
        <Dialog
          onClickBasketButton={() => {
            localStorage.clear();
            closeDialog();
            router.push(PATH.LOGIN);
          }}
          visible
          title="세션이 만료되어 로그아웃합니다."
          refuse="확인"
          confirm=""
          size={34}
        />
      )}
      <h2>기본 배송지</h2>
      <S.Wrapper>
        {DefaultAddressInputs.map((input) => (
          <S.DeliveryBox key={input.label}>
            {input.size ? (
              <S.Postal>
                <S.DeliveryInput
                  label={input.label}
                  size={input.size}
                  value={input.value}
                  onChange={input.onChange}
                />
                <S.PostalButtonWrapper>
                  <S.PostalButton
                    title={input.title}
                    onClick={() => handlePostal.clickButton()}
                  />
                </S.PostalButtonWrapper>
              </S.Postal>
            ) : (
              <S.DeliveryInput
                label={input.label}
                size={input.size}
                value={input.value}
                onChange={input.onChange}
              />
            )}
            {input.size && openPostcode && (
              <DaumPostcode
                onComplete={handlePostal.selectAddress}
                autoClose={false}
              />
            )}
          </S.DeliveryBox>
        ))}
      </S.Wrapper>
      <S.DeleteButtonWrapper>
        <S.DeleteButton
          title="수정하기"
          onClick={() => {
            mutateUpdateAddressProduct.mutate({
              zipCode: postalAddress.zonecode,
              roadAddress: postalAddress.address,
              detailAddress: detailPostal,
            });
          }}
        />
      </S.DeleteButtonWrapper>
    </div>
  );
}
// 첫 주문을 진행하고 기본 배송지를 등록해보세요.
