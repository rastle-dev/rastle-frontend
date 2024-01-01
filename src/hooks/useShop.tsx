import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { loadBundle, loadSelectBundle } from "@/api/shop";
import QUERYKEYS from "@/constants/querykey";
import { useState } from "react";
import Category from "@/interface/category";
import { useRouter } from "next/dist/client/router";
import ItemElementProps from "@/interface/itemElement";

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
  };
}
