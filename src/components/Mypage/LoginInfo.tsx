import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { StyledInput } from "@/styles/login/index.styles";
import useLoginInfo from "@/hooks/mypage/loginInfo/useLoginInfo";
import QUERYKEYS from "@/constants/querykey";
import { loadMe } from "@/api/auth";
import useSignup from "@/hooks/useSignup";
import LoadingBar from "@/components/LoadingBar";
import PATH from "@/constants/path";
import { useRouter } from "next/dist/client/router";
import * as S from "@/styles/mypage/loginInfo/index.styles";
import useDialog from "@/hooks/useDialog";
import useLoadingWithTimeout from "@/hooks/useLoadingWithTimeout";
import Modal from "@/components/Common/Modal";
import EnterDeleteUserModal from "@/components/DeleteUser/EnterDeleteUserModal";
import dynamic from "next/dynamic";

const Dialog = dynamic(() => import("@/components/Common/Dialog/index"), {
  ssr: false,
});
export default function LoginInfo() {
  const { passwordCheck, onChangePasswordCheck, password, onChangePassword } =
    useSignup();
  const { mutateChangePassword, logout } = useLoginInfo();
  const { isDialogOpen, openDialog, closeDialog } = useDialog();
  const { data, isLoading } = useQuery({
    queryKey: [QUERYKEYS.LOAD_ME],
    queryFn: loadMe,
  });
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const router = useRouter();

  const [isSocial, setIsSocial] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("loginType") === "social") {
        setIsSocial(true);
      }
    }
  }, []);

  const { timedOut } = useLoadingWithTimeout(isLoading);

  useEffect(() => {
    if (isLoading && timedOut) {
      openDialog();
    }
  }, [timedOut]);

  if (isLoading && !timedOut) return <LoadingBar type={6} />;

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

  const deleteUserButton = () => {
    setIsDeleteUserModalOpen(true);
  };

  return (
    <div>
      {isDeleteUserModalOpen && (
        <Modal
          closeModal={() => {
            setIsDeleteUserModalOpen(false);
            // openDialog();
          }}
          width={60}
        >
          <EnterDeleteUserModal />
        </Modal>
      )}
      {isDialogOpen && (
        <Dialog
          onClickRefuseButton={() => {
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
        <S.Wrapper isLoading={isLoading}>
          {input.buttonTitle ? (
            <S.Box inValid={input.inValid}>
              <S.PasswordInput
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
              <S.PasswordChangeButton
                title="변경"
                onClick={() => {
                  mutateChangePassword.mutate({ newPassword: password });
                }}
                disabled={
                  !(password === passwordCheck && passwordCheck.length > 0)
                }
              />
            </S.Box>
          ) : (
            <StyledInput
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
        </S.Wrapper>
      ))}
      <S.DeleteButtonWrapper>
        <S.MobileLogoutButton title="로그아웃" onClick={logout} />
        <S.DeleteButton title="탈퇴하기" onClick={deleteUserButton} />
      </S.DeleteButtonWrapper>
    </div>
  );
}
