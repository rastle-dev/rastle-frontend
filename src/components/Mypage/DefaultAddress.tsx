import React, { useEffect } from "react";
import LoadingBar from "@/components/LoadingBar";
import PATH from "@/constants/path";
import { useRouter } from "next/dist/client/router";
import * as S from "@/styles/mypage/defaultAddress/index.styles";
import DaumPostcode from "react-daum-postcode";
import useDefaultAddress from "@/hooks/mypage/defaultAddress/useDefaultAddress";
import useDialog from "@/hooks/useDialog";
import useLoadingWithTimeout from "@/hooks/useLoadingWithTimeout";
import dynamic from "next/dynamic";

const Dialog = dynamic(() => import("@/components/Common/Dialog/index"), {
  ssr: false,
});
export default function DefaultAddress() {
  const {
    mutateUpdateAddressProduct,
    isLoading,
    openPostcode,
    handlePostal,
    DefaultAddressInputs,
    postalAddress,
    detailPostal,
    defaultAddressData,
    setAddress,
    setDetailPostal,
  } = useDefaultAddress();
  const { openDialog, closeDialog, isDialogOpen } = useDialog();
  const router = useRouter();
  const { timedOut } = useLoadingWithTimeout(isLoading);
  useEffect(() => {
    if (isLoading && timedOut) {
      openDialog();
    }
  }, [timedOut]);
  useEffect(() => {
    setAddress({
      address: defaultAddressData?.data.roadAddress,
      zonecode: defaultAddressData?.data.zipCode,
    });
    setDetailPostal(defaultAddressData?.data.detailAddress);
  }, [defaultAddressData]);

  if (isLoading && !timedOut) return <LoadingBar type={6} />;

  return (
    <div>
      {isDialogOpen && (
        <Dialog
          onClickRefuseButton={() => {
            // localStorage.clear();
            localStorage.removeItem("accessToken");
            closeDialog();
            router.push(PATH.LOGIN);
          }}
          visible
          title="세션이 만료되어 로그아웃합니다."
          refuse="확인"
          size={42}
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
