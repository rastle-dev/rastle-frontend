import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import useInput from "@/hooks/useInput";
import { authLogout, changePassword, deletMe } from "@/api/auth";
import PATH from "@/constants/path";
import toastMsg from "@/components/Toast";
import errorMsg from "@/components/Toast/error";

export default function useMypage() {
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [clickable, setClickable] = useState(false);

  const logout = async () => {
    try {
      await authLogout();
      localStorage.clear();
      toastMsg("로그아웃 되었습니다!");
      router.push(PATH.HOME);
    } catch (err) {
      console.log(err);
    }
  };

  const mutateChangePassword = useMutation(["changePassword"], changePassword, {
    onSuccess: async () => {
      toastMsg("비밀번호가 변경되었습니다!");
    },
    onError: ({
      response: {
        data: { errorCode, message },
      },
    }) => {
      toast.dismiss();
      errorMsg("새로운 비밀번호를 다시 입력해주세요.");
      console.log(`${errorCode} / ${message}`);
    },
  });
  const deleteUser = async () => {
    try {
      await deletMe();
      toastMsg("회원 탈퇴가 완료되었습니다.");
      localStorage.clear();
      router.push(PATH.HOME);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    email,
    onChangeEmail,
    logout,
    clickable,
    setClickable,
    mutateChangePassword,
    deleteUser,
  };
}