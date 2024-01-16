import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toastMsg from "@/components/Toast";
import QUERYKEYS from "@/constants/querykey";
import { loadDefaultAddress, updateDefaultAddress } from "@/api/cart";
import { toast } from "react-toastify";
import errorMsg from "@/components/Toast/error";

export default function useDefaultAddress() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [QUERYKEYS.LOAD_DEFAULT_ADDRESS],
    queryFn: loadDefaultAddress,
  });
  const mutateUpdateAddressProduct = useMutation(
    ["updateDefaultAddress"],
    updateDefaultAddress,
    {
      onSuccess: async () => {
        toastMsg("업데이트 성공");
        queryClient.invalidateQueries([QUERYKEYS.LOAD_DEFAULT_ADDRESS]);
      },
      onError: ({
        response: {
          data: { errorCode, message },
        },
      }) => {
        toast.dismiss();
        errorMsg("업데이트 실패");
        console.log(`${errorCode} / ${message}`);
      },
    },
  );
  return {
    mutateUpdateAddressProduct,
    data,
    isLoading,
  };
}
