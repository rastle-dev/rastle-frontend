import React, { useEffect } from "react";
import * as S from "@/styles/cody/index.styles";
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
    <S.Wrapper>
      <Head>
        <title>코디 보기 | RECORDY SLOW</title>
        <meta name="description" content="제품을 활용한 코디 모음집" />
      </Head>
      <S.SetBox>
        {infiniteData?.pages.flatMap((page: any) =>
          page.data.content.map((item: any) => (
            <S.CurrentMarketWrapper key={item.id}>
              <S.FirstMarketDescription>{item.name}</S.FirstMarketDescription>
              <S.MarketIMG
                src={item.imageUrls.slice(0, -1)}
                alt="ak"
                width={500}
                height={500}
              />
              <h2>제품 정보</h2>
              {item.id && <DisplaySelectProduct id={item.id} />}
              <S.Line />
            </S.CurrentMarketWrapper>
          )),
        )}
      </S.SetBox>
      {isFetchingNextPage && (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      )}
    </S.Wrapper>
  );
}
