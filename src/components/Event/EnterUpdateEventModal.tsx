import styled from "styled-components";
import Input from "@/components/Common/Input";
import COLORS from "@/constants/color";
import Button from "@/components/Common/Button";
import { useRecoilState } from "recoil";
import { eventDialogState, eventModalState } from "@/stores/atom/recoilState";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import errorMsg from "@/components/Toast/error";
import toastMsg from "@/components/Toast";
import { applyEvent } from "@/api/shop";
import useInput from "@/hooks/useInput";
import QUERYKEYS from "@/constants/querykey";

const Wrapper = styled.div`
  width: 89%;
  h2 {
    text-align: center;
    font-size: 2.5rem;
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
const InputBox = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-bottom: 1.6rem;
`;
const StyledInput = styled(Input)`
  border: 1px solid ${COLORS.BLACK};
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  font-size: 1.35rem;
  font-weight: 400;
`;
const Label = styled.div`
  width: 8rem;
  font-weight: 300;
  font-size: 1.2rem;
`;

const EnterButton = styled(Button)`
  float: right; /* 오른쪽으로 이동 */
  margin-right: 1.5rem;
  border: none;
  font-weight: 500;

  &:hover {
    border: none;
    font-weight: 600;
  }
  &:focus {
    border: none;
  }
`;

export default function EnterUpdateEventModal({
  eventProductId,
  productName,
  eventPhoneNumber,
  eventInstagramId,
}: {
  eventProductId?: number;
  productName?: string;
  eventPhoneNumber?: number;
  eventInstagramId?: string;
}) {
  console.log(eventPhoneNumber);
  console.log(eventInstagramId);
  const [, setIsEventModalOpen] = useRecoilState(eventModalState);
  const [, setIsEventDialogOpen] = useRecoilState(eventDialogState);
  // const [phoneNumber, onChangeEventPhoneNumber] = useInput("");
  const [phoneNumber, onChangeEventPhoneNumber] = useInput(
    eventPhoneNumber?.toString().replace(/\D/g, "").slice(0, 11) || "",
  );
  // const [instagramId, onChangeInstagramId] = useInput("");
  const [instagramId, onChangeInstagramId] = useInput(eventInstagramId || "");
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

  return (
    <Wrapper>
      <h2>응모 내역</h2>
      <p>제품명: {productName}</p>
      {inputFields.map((field) => (
        <InputBox key={field.id}>
          <Label>{field.label}</Label>
          <StyledInput
            size={71}
            onChange={field.onChange}
            value={field.value}
          />
        </InputBox>
      ))}
      <h3>* 해당번호와 아이디로 당첨 메시지가 전송될 예정이에요.</h3>
      <h4>응모하기 버튼을 누르시면 정보를 바꿀 수 없어요!</h4>
      <EnterButton
        title="수정하기"
        onClick={() => {
          mutateApplyEvent.mutate({
            instagramId,
            eventPhoneNumber: phoneNumber,
            eventProductId,
          });
        }}
      />
    </Wrapper>
  );
}
