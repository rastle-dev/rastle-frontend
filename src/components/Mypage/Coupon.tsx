import React, { useEffect } from "react";
import useCoupon from "@/hooks/mypage/coupon/useCoupon";
import * as S from "@/styles/mypage/coupon/index.styles";
import LoadingBar from "@/components/LoadingBar";
import PATH from "@/constants/path";
import { useRouter } from "next/dist/client/router";
import { CouponImage } from "@/styles/mypage/coupon/index.styles";
import useDialog from "@/hooks/useDialog";
import useLoadingWithTimeout from "@/hooks/useLoadingWithTimeout";
import dynamic from "next/dynamic";

const Dialog = dynamic(() => import("@/components/Common/Dialog/index"), {
  ssr: false,
});

export default function Coupon() {
  const { menuList, couponData, isCouponLoading } = useCoupon();
  const { isDialogOpen, openDialog, closeDialog } = useDialog();
  const { timedOut } = useLoadingWithTimeout(isCouponLoading);

  const router = useRouter();
  useEffect(() => {
    if (isCouponLoading && timedOut) {
      openDialog();
    }
  }, [timedOut]);

  if (isCouponLoading && !timedOut) return <LoadingBar type={6} />;
  return (
    <S.Wrap isLoading={isCouponLoading}>
      {isDialogOpen && (
        <Dialog
          onClickRefuseButton={() => {
            localStorage.clear();
            closeDialog();
            router.push(PATH.LOGIN);
          }}
          visible
          title="세션이 만료되어 로그아웃합니다."
          refuse="확인"
          confirm=""
          size={40}
        />
      )}
      <h2>마이 쿠폰 목록</h2>
      {couponData?.data.couponInfos.length === 0 ? (
        <S.NODATA>보유 중인 쿠폰이 없어요.</S.NODATA>
      ) : (
        <>
          <S.TabMenu>
            {isCouponLoading && <LoadingBar type={6} />}
            <p>사용 가능 쿠폰 {couponData?.data.couponInfos.length}장</p>
          </S.TabMenu>
          <S.Table>
            <S.TableHeader>
              {menuList.map((menu) => (
                <p>{menu}</p>
              ))}
            </S.TableHeader>
            <S.TableContent>
              {couponData?.data.couponInfos.map((item: any) => {
                return (
                  <S.ProductInfo>
                    <S.MobileTextInfo>
                      <S.TextInfo>
                        <S.CouponWrapper>
                          <CouponImage
                            src="/image/coupon.png"
                            alt="/image/coupon.png"
                            layout="fill"
                            objectFit="cover"
                          />
                        </S.CouponWrapper>
                        <h4>{item.name}</h4>
                      </S.TextInfo>
                      <p>전 상품 적용</p>
                      <p>{item.discount?.toLocaleString()}원 할인</p>
                      <p>~2024.04.17</p>
                      <S.MobileDescription>
                        2024.04.17까지 사용 가능
                      </S.MobileDescription>
                    </S.MobileTextInfo>
                  </S.ProductInfo>
                );
              })}
            </S.TableContent>
          </S.Table>
        </>
      )}
    </S.Wrap>
  );
}
