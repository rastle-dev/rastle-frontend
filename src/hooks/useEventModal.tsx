import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyEvent } from "@/api/shop";
import { toast } from "react-toastify";
import errorMsg from "@/components/Toast/error";
import toastMsg from "@/components/Toast";
import QUERYKEYS from "@/constants/querykey";
import { useRecoilState } from "recoil";
import { eventDialogState, eventModalState } from "@/stores/atom/recoilState";
import useInput from "@/hooks/useInput";
import { useEffect } from "react";
import { loadEventHistory } from "@/api/cart";

export default function useEventModal() {
  const [, setIsEventModalOpen] = useRecoilState(eventModalState);
  const [, setIsEventDialogOpen] = useRecoilState(eventDialogState);
  const { data: eventHistoryData } = useQuery(
    [QUERYKEYS.LOAD_EVENT_HISTORY],
    () => loadEventHistory({ page: 0, size: 24 }),
    {
      staleTime: 5 * 60 * 1000, // 데이터가 신선한 상태로 유지될 시간 (5분)
      cacheTime: 10 * 60 * 1000, // 캐시가 유지될 시간 (10분)
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리패치 비활성화
    },
  );
  const lastContentItem =
    eventHistoryData?.data.content[eventHistoryData.data.content.length - 1];
  const [eventPhoneNumber, onChangeEventPhoneNumber, setEventPhoneNumber] =
    useInput(lastContentItem?.eventPhoneNumber);
  const [instagramId, onChangeInstagramId, setInstagramId] = useInput(
    lastContentItem?.instagramId,
  );
  const queryClient = useQueryClient();
  const inputFields = [
    {
      label: "전화번호",
      id: "phone",
      onChange: onChangeEventPhoneNumber,
      value: eventPhoneNumber?.replace(/\D/g, "").slice(0, 11),
    },
    {
      label: "인스타그램",
      id: "instagram",
      onChange: onChangeInstagramId,
      value: instagramId?.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ""),
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
      queryClient.invalidateQueries([QUERYKEYS.LOAD_EVENT_HISTORY]);
      setIsEventModalOpen(false);
      setIsEventDialogOpen(true);
    },
  });

  useEffect(() => {
    if (lastContentItem) {
      setEventPhoneNumber(lastContentItem?.eventPhoneNumber);
      setInstagramId(lastContentItem?.instagramId);
    }
  }, [lastContentItem, setIsEventModalOpen]);
  return {
    mutateApplyEvent,
    inputFields,
    instagramId,
    eventPhoneNumber,
  };
}
