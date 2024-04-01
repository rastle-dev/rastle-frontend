import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyEvent } from "@/api/shop";
import { toast } from "react-toastify";
import errorMsg from "@/components/Toast/error";
import toastMsg from "@/components/Toast";
import QUERYKEYS from "@/constants/querykey";
import { useRecoilState } from "recoil";
import { eventDialogState, eventModalState } from "@/stores/atom/recoilState";
import useInput from "@/hooks/useInput";

export default function useEventModal() {
  const [, setIsEventModalOpen] = useRecoilState(eventModalState);
  const [, setIsEventDialogOpen] = useRecoilState(eventDialogState);
  const [eventPhoneNumber, onChangeEventPhoneNumber] = useInput("");
  const [instagramId, onChangeInstagramId] = useInput("");
  const queryClient = useQueryClient();

  const inputFields = [
    {
      label: "전화번호",
      id: "phone",
      onChange: onChangeEventPhoneNumber,
      value: eventPhoneNumber.replace(/\D/g, "").slice(0, 11),
    },
    {
      label: "인스타그램",
      id: "instagram",
      onChange: onChangeInstagramId,
      value: instagramId.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ""),
    },
  ];
  const mutateApplyEvent = useMutation(["applyEvent"], applyEvent, {
    onMutate: () => {
      // 뮤테이션이 시작될 때 로딩을 true로 설정합니다.
    },
    onError: ({
      response: {
        data: { errorCode, message },
      },
    }) => {
      toast.dismiss();
      errorMsg("응모 실패");
      console.log(`${errorCode} / ${message}`);
    },
    onSuccess: async () => {
      toast.dismiss();
      toastMsg("이벤트 응모가 완료되었습니다! 👏");
      queryClient.invalidateQueries([QUERYKEYS.LOAD_PRODUCT_DETAIL]);
      setIsEventModalOpen(false);
      setIsEventDialogOpen(true);
    },
  });
  return {
    mutateApplyEvent,
    inputFields,
    instagramId,
    eventPhoneNumber,
  };
}
