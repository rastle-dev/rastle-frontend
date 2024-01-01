import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import * as S from "@/styles/login/index.styles";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import useMypage from "@/hooks/mypage/useMypage";
import QUERYKEYS from "@/constants/querykey";
import { loadMe } from "@/api/auth";
import useSignup from "@/hooks/useSignup";
import LoadingBar from "@/components/LoadingBar";
import Dialog from "@/components/common/Dialog";
import PATH from "@/constants/path";
import { useRouter } from "next/dist/client/router";

interface ButtonProps {
  inValid: boolean;
}
const Wrapper = styled.div<{ isLoading?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 4rem;
  //height: 100%;
  width: 55rem;
  height: ${({ isLoading }) => (isLoading ? "50rem" : "auto")};
  @media (max-width: 1007px) {
    width: 94%;
  }
`;
const Box = styled.div<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: ${({ inValid }) => (inValid ? "center" : "flex-end")};
`;
const PasswordInput = styled(Input)`
  width: 95%;
  height: 4rem;
  font-size: 1.2rem;
  &::placeholder {
    font-size: 1.2rem;
    border: none;
    font-weight: 400;
  }
  &:focus {
    border-bottom: 2px solid;
  }
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  @media (max-width: 1007px) {
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
      border: none;
      font-weight: 400;
    }
  }
`;
const PasswordChangeButton = styled(Button)`
  border-radius: 0.625rem;
  width: 5.3rem;
  height: 3rem;
  padding: 0.62rem;
  font-size: 1rem;
`;
const DeleteButtonWrapper = styled.div`
  padding-top: 5rem;
  display: flex;
  justify-content: flex-end; /* 오른쪽 끝으로 이동 */
  width: 55.7rem;
  @media (max-width: 1007px) {
    width: 95%;
  }
`;
const MobileLogoutButton = styled(Button)`
  border: none;
  border-radius: 0;
  width: 8rem;
  height: 3rem;
  padding: 0.62rem;
  color: red;
  font-weight: 300;
  font-size: 1.4rem;

  @media (min-width: 1007px) {
    display: none;
  }
  &:hover {
    border: none;
    color: red;
    font-weight: 500;
  }
  &:focus {
    font-weight: 500;
  }
`;
const DeleteButton = styled(Button)`
  border: none;
  border-radius: 0;
  width: 6rem;
  height: 3rem;
  padding: 0.62rem;
  font-size: 1rem;
  @media (max-width: 1007px) {
    width: 8rem;
    font-size: 1.4rem;
  }
  &:hover {
    border: none;
    color: red;
    font-weight: 500;
  }
  &:focus {
    font-weight: 500;
  }
`;
export default function LoginInfo() {
  const { passwordCheck, onChangePasswordCheck, password, onChangePassword } =
    useSignup();
  const { mutateChangePassword, deleteUser, logout } = useMypage();
  const { data, isLoading } = useQuery({
    queryKey: [QUERYKEYS.LOAD_ME],
    queryFn: loadMe,
  });
  const router = useRouter();

  const [isSocial, setIsSocial] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("loginType") === "social") {
        setIsSocial(true);
      }
    }
  }, []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  const [timedOut, setTimedOut] = useState(false);
  let timeoutId: NodeJS.Timeout | undefined;
  useEffect(() => {
    if (isLoading && timedOut) {
      openDialog();
    }
  }, [timedOut]);
  useEffect(() => {
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setTimedOut(true);
      }, 5000);
    } else {
      setTimedOut(false);
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  if (isLoading && !timedOut) return <LoadingBar type={6} />;
  console.log("/////////////////", isLoading, timedOut);

  const inputs = [
    {
      label: "이름",
      value: data?.data.userName,
      readOnly: true,
    },
    {
      label: "이메일 주소",
      value: data?.data.email,
      readOnly: true,
    },
    {
      placeholder: isSocial
        ? "소셜 로그인된 상태에서는 비밀번호를 변경할 수 없습니다."
        : "새로운 비밀번호를 입력해주세요!",
      label: "비밀번호",
      type: "password",
      onChange: onChangePassword,
      readOnly: isSocial,
      message:
        password.length > 0 && password.length < 8
          ? "영문, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하 입력해주세요."
          : "",
      inValid: password.length > 0 && password.length < 8,
    },
    {
      label: "비밀번호 확인",
      type: "password",
      buttonTitle: "변경",
      onChange: onChangePasswordCheck,
      readOnly: isSocial,
      message:
        password !== passwordCheck && passwordCheck.length > 0
          ? "비밀번호가 일치하지 않습니다."
          : "",
      inValid: password !== passwordCheck && passwordCheck.length > 0,
    },
    {
      label: "전화번호",
      value: data?.data.phoneNumber,
      onChange: onChangePassword,
    },
  ];

  return (
    <div>
      {isDialogOpen && (
        <Dialog
          onClickBasketButton={() => {
            localStorage.clear();
            closeDialog();
            router.push(PATH.LOGIN);
          }}
          visible
          title="세션이 만료되어 로그아웃합니다."
          refuse="확인"
          confirm=""
          size={34}
        />
      )}
      <h2>로그인 정보</h2>
      {inputs.map((input) => (
        <Wrapper isLoading={isLoading}>
          {input.buttonTitle ? (
            <Box inValid={input.inValid}>
              <PasswordInput
                key={input.label}
                placeholder={input.placeholder}
                label={input.label}
                type={input.type}
                value={input.value}
                onChange={input.onChange}
                message={input.message}
                invalid={input.inValid}
                disabled={isSocial}
                readOnly={isSocial}
              />
              <PasswordChangeButton
                title="변경"
                onClick={() => {
                  mutateChangePassword.mutate({ newPassword: password });
                }}
                disabled={
                  !(password === passwordCheck && passwordCheck.length > 0)
                }
              />
            </Box>
          ) : (
            <S.StyledInput
              key={input.label}
              placeholder={input.placeholder}
              label={input.label}
              type={input.type}
              value={input.value}
              onChange={input.onChange}
              message={input.message}
              readOnly={input.readOnly}
            />
          )}
        </Wrapper>
      ))}
      <DeleteButtonWrapper>
        <MobileLogoutButton title="로그아웃" onClick={logout} />
        <DeleteButton title="탈퇴하기" onClick={deleteUser} />
      </DeleteButtonWrapper>
    </div>
  );
}
