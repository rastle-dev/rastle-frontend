import { useQuery } from "@tanstack/react-query";
import { loadSelectBundle } from "@/api/shop";
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

  return {
    useLoadSelectBundle,
  };
}
