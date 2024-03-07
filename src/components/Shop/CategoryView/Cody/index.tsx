import React, { useEffect } from "react";
import * as S from "@/styles/shop/index.styles";
import SwiperComponent from "@/components/Shop/CategoryView/Cody/codySwiper";
import DisplaySelectProduct from "@/components/Shop/DisplaySelectProduct";
import {
  LoadingSpinner,
  LoadingSpinnerWrapper,
} from "@/components/LoadingSpinner";
import useShop from "@/hooks/useShop";
import Head from "next/head";

export default function Cody() {
  const { infiniteData, infiniteHandleScroll, isFetchingNextPage } = useShop();
  // useEffect를 사용하여 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", infiniteHandleScroll);
    return () => {
      window.removeEventListener("scroll", infiniteHandleScroll);
    };
  }, [infiniteHandleScroll]);
  return (
    <>
      <Head>
        <title>코디 상품 | RECORDY SLOW</title>
      </Head>
      <S.SetBox>
        {infiniteData?.pages.flatMap((page: any, idx: number) =>
          page.data.content.map((item: any) => (
            <S.CurrentMarketWrapper key={item.id}>
              <S.FirstMarketDescription>
                RECORDY {idx + 1}: {item.name}
              </S.FirstMarketDescription>
              <SwiperComponent imgUrls={item.imageUrls} />
              <h2>제품 정보</h2>
              {item.id && <DisplaySelectProduct id={item.id} />}
            </S.CurrentMarketWrapper>
          )),
        )}
      </S.SetBox>
      {isFetchingNextPage && (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      )}
    </>
  );
}
