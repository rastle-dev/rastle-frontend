import styled from "styled-components";
import Input from "@/components/Common/Input";
import COLORS from "@/constants/color";
import Button from "@/components/Common/Button";
import React from "react";
import useInput from "@/hooks/useInput";
import { authCheckEmailDuplicate, authInitializePW } from "@/api/auth";
import { toast } from "react-toastify";
import errorMsg from "@/components/Toast/error";
import { useMutation } from "@tanstack/react-query";
import PATH from "@/constants/path";
import toastMsg from "@/components/Toast";
import { useRouter } from "next/dist/client/router";

export const Wrapper = styled.div`
  width: 89%;
  h2 {
    color: ${COLORS.BLUE};
    font-size: 2rem;
    padding-bottom: 1rem;
  }
  p {
    font-weight: 300;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  h3 {
    margin-top: 3.6rem;
    font-size: 1.2rem;
    font-weight: 300;
    margin-bottom: 0;
    padding-bottom: 0.2rem;
  }
  h4 {
    font-size: 1.2rem;
    font-weight: 300;
    margin: 0;
  }
`;
export const InputBox = styled.div`
  display: flex;
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
    font-weight: 600;
  }
  &:focus {
    border: none;
  }
`;

export default function PWInitializeModal() {
  const [email, onChangeEmail] = useInput("");
  const router = useRouter();

  const isValidEmail = (emailData: string) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailData);
  };
  const checkEmailDuplicated = async () => {
    if (email.length === 0) {
      toast.dismiss();
      errorMsg("이메일을 입력해주세요!");
      return false;
    }
    const data = await authCheckEmailDuplicate(email);
    return !!data.data;
  };
  const mutateInitializePW = useMutation(["loadMutation"], authInitializePW, {
    onSuccess: async () => {
      toastMsg("메일로 임시 비밀번호를 보내드렸어요!");
      router.push(PATH.LOGIN).then(() => router.reload());
    },
    onError: ({
      response: {
        data: { errorCode, message },
      },
    }) => {
      toast.dismiss();
      errorMsg("오류가 발생했어요.");
      console.log(`${errorCode} / ${message}`);
    },
  });
  const sendEmailCode = async () => {
    const duplicated = await checkEmailDuplicated();
    if (!duplicated && !isValidEmail(email) && email.length > 0) {
      toast.dismiss();
      errorMsg("해당 메일로 가입된 계정이 없습니다!");
    } else if (email.length > 0) {
      await mutateInitializePW.mutate(email);
    }
  };
  return (
    <Wrapper>
      <h2>비밀번호 초기화 메일 전송</h2>
      <InputBox>
        <Label>이메일</Label>
        <StyledInput size={80} onChange={onChangeEmail} />
      </InputBox>
      <h3>* 입력하신 이메일로 새로운 비밀번호를 보내드릴게요.</h3>
      <h4>* 내 정보 페이지에서 원하시는 비밀번호로 재설정하실 수 있어요.</h4>
      <EnterButton title="전송하기" onClick={sendEmailCode} />
    </Wrapper>
  );
}
