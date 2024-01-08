import React, { useEffect } from "react";
import useCoupon from "@/hooks/mypage/coupon/useCoupon";
import * as S from "@/styles/mypage/coupon/index.styles";
import LoadingBar from "@/components/LoadingBar";
import Dialog from "@/components/Common/Dialog";
import PATH from "@/constants/path";
import { useRouter } from "next/dist/client/router";
import { CouponImage } from "@/styles/mypage/coupon/index.styles";
import useDialog from "@/hooks/useDialog";

export default function Coupon() {
  const { menuList, couponData, isLoading, timedOut, setTimedOut } =
    useCoupon();
  const { isDialogOpen, openDialog, closeDialog } = useDialog();
  const router = useRouter();
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

  return (
    <S.Wrap isLoading={isLoading}>
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
          size={40}
        />
      )}
      <h2>마이 쿠폰 목록</h2>
      {couponData?.data.couponInfos.length === 0 ? (
        <S.NODATA>보유 중인 쿠폰이 없어요.</S.NODATA>
      ) : (
        <>
          <S.TabMenu>
            {isLoading && <LoadingBar type={6} />}
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
