import styled from "styled-components";
import Input from "@/components/Common/Input";
import COLORS from "@/constants/color";
import Button from "@/components/Common/Button";
import { useRecoilState } from "recoil";
import { eventDialogState, eventModalState } from "@/stores/atom/recoilState";
import React from "react";

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
  padding-left: 1rem;
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

const inputFields = [
  { label: "전화번호", id: "phone" },
  { label: "인스타그램", id: "instagram" },
];
export default function EnterEventModal() {
  const [, setIsEventModalOpen] = useRecoilState(eventModalState);
  const [, setIsEventDialogOpen] = useRecoilState(eventDialogState);
  return (
    <Wrapper>
      <h2>응모하기</h2>
      <p>제품명: 틴 워시드 버뮤다 데님 팬츠 블랙 컬러</p>
      {inputFields.map((field) => (
        <InputBox key={field.id}>
          <Label>{field.label}</Label>
          <StyledInput size={71} />
        </InputBox>
      ))}
      <h3>* 해당번호와 아이디로 당첨 메시지가 전송될 예정이에요.</h3>
      <h4>응모하기 버튼을 누르시면 정보를 바꿀 수 없어요!</h4>
      <EnterButton
        title="응모하기"
        onClick={() => {
          setIsEventModalOpen(false);
          setIsEventDialogOpen(true);
        }}
      />
    </Wrapper>
  );
}
