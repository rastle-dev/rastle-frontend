import styled from "styled-components";
import Input from "@/components/Common/Input";
import COLORS from "@/constants/color";
import Button from "@/components/Common/Button";
import React from "react";
import useEventModal from "@/hooks/useEventModal";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadEventHistory } from "@/api/cart";

export const Wrapper = styled.div`
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
export const InputBox = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-bottom: 1.6rem;
`;
export const StyledInput = styled(Input)`
  border: 1px solid ${COLORS.BLACK};
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  font-size: 1.35rem;
  font-weight: 400;
`;
export const Label = styled.div`
  width: 8rem;
  font-weight: 300;
  font-size: 1.2rem;
`;

export const EnterButton = styled(Button)`
  float: right; /* 오른쪽으로 이동 */
  margin-right: 1.5rem;
  border: none;
  font-weight: 500;

  &:hover {
    border: none;
    background-color: transparent;
    font-weight: 600;
  }
  &:focus {
    border: none;
    background-color: transparent;
  }
  background-color: transparent;
`;

export default function EnterEventModal({
  eventProductId,
  productName,
}: {
  eventProductId: number;
  productName: string;
}) {
  const { mutateApplyEvent, inputFields, eventPhoneNumber, instagramId } =
    useEventModal();
  return (
    <Wrapper>
      <h2>응모하기</h2>
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
      <h3>* 인스타 아이디나 해당번호로 당첨 메시지가 전송될 예정이에요.</h3>
      <h4>이벤트 종료 전까지, 응모내역 상세조회에서 변경이 가능해요.</h4>
      <EnterButton
        title="응모하기"
        onClick={() => {
          mutateApplyEvent.mutate({
            instagramId,
            eventPhoneNumber,
            eventProductId,
          });
        }}
      />
    </Wrapper>
  );
}
