import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { loadBundle, loadSelectBundle } from "@/api/shop";
import QUERYKEYS from "@/constants/querykey";

export default function useShop() {
  const useLoadSelectBundle = (bundleId: number) => {
    const queryFn = () => loadSelectBundle(bundleId);
    const { data, refetch } = useQuery(
      [QUERYKEYS.LOAD_BUNDLE_PRODUCT],
      queryFn,
    );
    return { data, refetch };
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

  const handleScroll = () => {
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
    handleScroll,
    isFetchingNextPage,
  };
}
