import styled from "styled-components";
import COLORS from "@/constants/color";
import React, { useState } from "react";
import useInput from "@/hooks/useInput";
import * as S from "@/components/Event/EnterEventModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyEvent } from "@/api/shop";
import { toast } from "react-toastify";
import errorMsg from "@/components/Toast/error";
import toastMsg from "@/components/Toast";
import QUERYKEYS from "@/constants/querykey";
import { useRecoilState } from "recoil";
import { eventModalState } from "@/stores/atom/recoilState";
import dayjs from "dayjs";

const Wrapper = styled.div`
  width: 89%;
  padding-top: 2rem;
  h2 {
    margin-bottom: 2rem;
  }
  p {
    font-weight: 300;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  h3 {
    margin-top: 3.6rem;
    font-size: 1.4rem;
    font-weight: 300;
  }
  h4 {
    font-size: 1.2rem;
    color: ${COLORS.RED};
  }
`;
export default function EnterUpdateEventModal({
  eventProductId,
  productName,
  eventPhoneNumber,
  eventInstagramId,
  endDate,
  startDate,
}: {
  eventProductId: number | undefined;
  productName: string | undefined;
  eventPhoneNumber: number | undefined;
  eventInstagramId: string | undefined;
  endDate: string | undefined;
  startDate: string | undefined;
}) {
  const [phoneNumber, onChangeEventPhoneNumber] = useInput(
    eventPhoneNumber?.toString().replace(/\D/g, "").slice(0, 11) || "",
  );
  const [instagramId, onChangeInstagramId] = useInput(eventInstagramId);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [, setIsEventModalOpen] = useRecoilState(eventModalState);
  const queryClient = useQueryClient();
  const inputFields = [
    {
      label: "전화번호",
      id: "phone",
      onChange: onChangeEventPhoneNumber,
      value: phoneNumber.replace(/\D/g, "").slice(0, 11),
    },
    {
      label: "인스타그램",
      id: "instagram",
      onChange: onChangeInstagramId,
      value: instagramId.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ""),
    },
  ];
  const mutateUpdateApplyEvent = useMutation(["applyEvent"], applyEvent, {
    onMutate: () => {
      // 뮤테이션이 시작될 때 로딩을 true로 설정합니다.
    },
    onError: ({
      response: {
        data: { errorCode, message },
      },
    }) => {
      toast.dismiss();
      errorMsg("수정 실패");
      console.log(`${errorCode} / ${message}`);
    },
    onSuccess: async () => {
      toast.dismiss();
      toastMsg("수정되었습니다! 👏");
      queryClient.invalidateQueries([QUERYKEYS.LOAD_PRODUCT_DETAIL]);
      setIsEventModalOpen(false);
    },
  });
  return (
    <Wrapper>
      <h2>응모 내역</h2>
      <p>제품명: {productName}</p>
      {inputFields.map((field) => (
        <S.InputBox key={field.id}>
          <S.Label>{field.label}</S.Label>
          <S.StyledInput
            size={71}
            onChange={field.onChange}
            value={field.value}
          />
        </S.InputBox>
      ))}
      <h3>* 해당번호와 아이디로 당첨 메시지가 전송될 예정이에요.</h3>
      <h4>* 이벤트 종료 전까지만, 수정이 가능해요.</h4>
      <S.EnterButton
        title="수정하기"
        onClick={() => {
          if (dayjs().isBefore(startDate) || dayjs().isAfter(endDate)) {
            toastMsg("이벤트가 종료되었어요!");
            setDisabled(true);
          } else {
            mutateUpdateApplyEvent.mutate({
              instagramId,
              eventPhoneNumber: phoneNumber,
              eventProductId,
            });
          }
        }}
        disabled={disabled}
      />
    </Wrapper>
  );
}
