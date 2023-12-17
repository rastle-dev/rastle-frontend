import React, { useEffect } from "react";
import * as S from "@/styles/shop/index.styles";
import SwiperComponent from "@/components/Shop/codySwiper";
import DisplaySelectProduct from "@/components/Shop/DisplaySelectProduct";
import { useInfiniteQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadBundle } from "@/api/shop";
import {
  LoadingSpinner,
  LoadingSpinnerWrapper,
} from "@/components/LoadingSpinner";

export default function CodyProduct() {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [QUERYKEYS.LOAD_BUNDLE], // 쿼리 키
    ({ pageParam = 0 }) => loadBundle({ page: pageParam, size: 1 }),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.data.pageable.pageNumber + 1;
        return nextPage < lastPage.data.totalPages ? nextPage : undefined;
      },
    },
  );

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  // useEffect를 사용하여 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <>
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
