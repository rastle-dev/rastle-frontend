import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { loadBundle, loadSelectBundle } from "@/api/shop";
import QUERYKEYS from "@/constants/querykey";
import { useEffect, useState } from "react";
import Category from "@/interface/category";
import { useRouter } from "next/dist/client/router";
import ItemElementProps from "@/interface/itemElement";

type FilterButtonType = "NEW" | "BEST";

export default function useShop() {
  const filterButtons: FilterButtonType[] = ["NEW", "BEST"];
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [activeCategoryId, setActiveCategoryId] = useState<Category>();
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterButtonType>("NEW"); // 클릭된 버튼의 인덱스를 저장할 상태
  const queryClient = useQueryClient();
  const router = useRouter();
  const productData = queryClient.getQueryData([
    QUERYKEYS.LOAD_PRODUCT_PAGING_SHOP,
  ]) as {
    data: {
      content: Array<ItemElementProps>;
    };
  };
  const bestProductData = queryClient.getQueryData([
    QUERYKEYS.LOAD_BEST_PRODUCT_PAGING_SHOP,
  ]) as {
    data: {
      content: Array<ItemElementProps>;
    };
  };
  const eventData = queryClient.getQueryData([
    QUERYKEYS.LOAD_EVENTPRODUCT_PAGING_SHOP,
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
      [QUERYKEYS.LOAD_SELECT_BUNDLE, { bundleId }],
      queryFn,
      {
        staleTime: Infinity, // 데이터가 변경될 때까지 유효
      },
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
    ({ pageParam = 0 }) => loadBundle({ page: pageParam, size: 5 }),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.data.pageable.pageNumber + 1;
        return nextPage < lastPage.data.totalPages ? nextPage : undefined;
      },
      staleTime: Infinity, // 데이터가 변경될 때까지 유효
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

  const handleFilterClick = (menu: FilterButtonType) => {
    setSelectedFilter(menu);
  };
  useEffect(() => {
    const filter = sessionStorage.getItem("selectedFilter") || "NEW" || null;
    if (filter === "BEST") setSelectedFilter(filter);
    sessionStorage.removeItem("selectedFilter");
  }, []);
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
    selectedFilter,
    handleFilterClick,
    filterButtons,
    bestProductData,
  };
}
