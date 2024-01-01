import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { loadBundle, loadSelectBundle } from "@/api/shop";
import QUERYKEYS from "@/constants/querykey";
import React, { useState } from "react";
import Category from "@/interface/category";
import { useRouter } from "next/dist/client/router";
import ItemElementProps from "@/interface/itemElement";
import * as S from "@/styles/shop/index.styles";
import ItemElement from "@/components/ItemElement";

export default function useShop() {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [activeCategoryId, setActiveCategoryId] = useState<Category>();
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const router = useRouter();
  const productData = queryClient.getQueryData([
    QUERYKEYS.LOAD_PRODUCT_PAGING,
  ]) as {
    data: {
      content: Array<ItemElementProps>;
    };
  };
  const eventData = queryClient.getQueryData([
    QUERYKEYS.LOAD_EVENTPRODUCT_PAGING,
  ]) as {
    data: Array<ItemElementProps>;
  };
  const categoryData = queryClient.getQueryData([
    QUERYKEYS.ADMIN_GET_CATEGORY,
  ]) as { data: Array<Category> };
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveCategoryId(
      categoryData?.data.find((item: Category) => item.name === category),
    );

    // 업데이트하기: 선택된 탭을 세션 스토리지에 저장
    sessionStorage.setItem("activeTab", category);

    router.replace(`/shop?tab=${encodeURIComponent(category)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const useLoadSelectBundle = (bundleId: number) => {
    const queryFn = () => loadSelectBundle(bundleId);
    const { data } = useQuery(
      [QUERYKEYS.LOAD_BUNDLE_PRODUCT, { bundleId }],
      queryFn,
    );
    return { data };
  };
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
  const infiniteHandleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  // shop페이지 view
  let categoryView: React.ReactNode;

  if (activeCategory === "전체") {
    categoryView = (
      <S.ProductList>
        {productData?.data.content.map((item: ItemElementProps) => (
          <ItemElement
            key={item.id}
            mainThumbnail={item.mainThumbnail}
            subThumbnail={item.subThumbnail}
            name={item.name}
            price={item.price}
            discountPrice={item.discountPrice}
            id={item.id}
            isEvent={!!item.eventId}
          />
        ))}
      </S.ProductList>
    );
  } else if (activeCategory === "이벤트") {
    categoryView = (
      <S.ProductList>
        {eventData?.data.map((item: ItemElementProps) => (
          <ItemElement
            key={item.id}
            mainThumbnail={item.mainThumbnail}
            subThumbnail={item.subThumbnail}
            name={item.name}
            price={item.price}
            discountPrice={0}
            id={item.id}
            isEvent={!!item.eventId}
          />
        ))}
      </S.ProductList>
    );
  } else {
    const filteredProducts = productData?.data.content.filter(
      (item: ItemElementProps) => item.categoryId === activeCategoryId?.id,
    );

    categoryView =
      filteredProducts?.length === 0 ? (
        <S.ProductList>
          <S.NOPRODUCT>
            제품 준비 중이에요. 빠른 시일 내로 준비해서 찾아뵐게요! 🙇🏻
          </S.NOPRODUCT>
        </S.ProductList>
      ) : (
        <S.ProductList>
          {filteredProducts?.map((item: ItemElementProps) => (
            <ItemElement
              key={item.id}
              mainThumbnail={item.mainThumbnail}
              subThumbnail={item.subThumbnail}
              name={item.name}
              price={item.price}
              discountPrice={item.discountPrice}
              id={item.id}
              isEvent={!!item.eventId}
            />
          ))}
        </S.ProductList>
      );
  }

  return {
    useLoadSelectBundle,
    infiniteData,
    infiniteHandleScroll,
    isFetchingNextPage,
    activeCategory,
    activeCategoryId,
    categoryList,
    setCategoryList,
    productData,
    eventData,
    handleCategoryChange,
    setActiveCategoryId,
    categoryData,
    setActiveCategory,
    categoryView,
  };
}
