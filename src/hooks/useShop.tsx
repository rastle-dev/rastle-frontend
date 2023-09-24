import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useInput from "@/hooks/useInput";
import { getMarketImages, loadCurrentMarket } from "@/api/shop";
import errorMsg from "@/components/Toast/error";
import toastMsg from "@/components/Toast";
import QUERYKEYS from "@/constants/querykey";

export default function useShop() {
  const [email, onChangeEmail] = useInput("");
  const queryClient = useQueryClient();
  const mutateMarketImages = useMutation(["getMarketImages"], getMarketImages, {
    onSuccess: (data) => {
      toastMsg("마켓 이미지 불러오기 성공 👏");
      console.log("👏", data);
      queryClient.invalidateQueries([QUERYKEYS.LOAD_MARKET_IMAGES]);
    },
    onError: ({
      response: {
        data: { errorCode, message },
      },
    }) => {
      toast.dismiss();
      errorMsg(errorCode);
      console.log(`${errorCode} / ${message}`);
    },
  });
  const mutateCurrentMarket = useMutation(
    ["loadCurrentMarket"],
    loadCurrentMarket,
    {
      onSuccess: (data) => {
        toastMsg("현재 마켓 정보 불러오기 성공 👏");
        console.log("👏", data);
        queryClient.invalidateQueries([QUERYKEYS.LOAD_MARKET_IMAGES]);
      },
      onError: ({
        response: {
          data: { errorCode, message },
        },
      }) => {
        toast.dismiss();
        console.log(`${errorCode} / ${message}`);
      },
    },
  );
  return {
    email,
    onChangeEmail,
    mutateMarketImages,
    mutateCurrentMarket,
  };
}
