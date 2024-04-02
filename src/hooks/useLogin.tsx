import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/dist/client/router";
import { toast } from "react-toastify";
import useInput from "@/hooks/useInput";
import { authLogin, authSocialReissue } from "@/api/auth";
import PATH from "@/constants/path";
import errorMsg from "@/components/Toast/error";
import { useRecoilState } from "recoil";
import React, { useState } from "react";
import { tokenState } from "@/stores/atom/recoilState";
import toastMsg from "@/components/Toast";

export default function useLogin() {
  const router = useRouter();
  const [password, onChangePassword] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [accessToken, setToken] = useRecoilState(tokenState);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const passwordMailInitializeButton = () => {
    setPasswordModalOpen(true);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };
  const bottomButtons = [
    {
      productName: "이메일 가입",
      width: "12.3rem",
      onClick: () => router.push(PATH.SIGNUP),
    },
    {
      productName: "비밀번호 찾기",
      width: "12.3rem",
      onClick: () => passwordMailInitializeButton(),
    },
    {
      productName: "비회원 주문 조회",
      width: "12.3rem",
      onClick: () => {
        toastMsg("준비중인 기능입니다!");
      },
    },
  ];
  const loginFormInputs = [
    {
      placeholder: "예) rastle@rastle.com",
      label: "이메일 주소",
      value: email,
      onChange: onChangeEmail,
    },
    {
      label: "비밀번호",
      type: "password",
      value: password,
      onChange: onChangePassword,
    },
  ];
  const mutateLogin = useMutation(["loadMutation"], authLogin, {
    onSuccess: async (response) => {
      // HTTP 응답에서 "Authorization" 헤더 값을 추출
      const token = response.authorization.replace("Bearer ", "");
      localStorage.setItem("accessToken", token);
      console.log(response);
      const returnUrl = localStorage.getItem("returnUrl") || "/";
      console.log("return", returnUrl);
      router.push(returnUrl);
    },
    onError: ({
      response: {
        data: { errorCode, message },
      },
    }) => {
      toast.dismiss();
      errorMsg("이메일 및 비밀번호를 확인해주세요");
      console.log(`${errorCode} / ${message}`);
    },
  });
  const mutateSocialLogin = useMutation(["loadMutation"], authSocialReissue, {
    onSuccess: async (headers) => {
      // HTTP 응답에서 "Authorization" 헤더 값을 추출
      const token = headers.authorization.replace("Bearer ", "");
      localStorage.setItem("accessToken", token);
      setToken(token);
      router.push(PATH.HOME);
    },
    onError: ({
      response: {
        data: { errorCode, message },
      },
    }) => {
      toast.dismiss();
      errorMsg("로그인을 다시 시도해주세요.");
      console.log(`${errorCode} / ${message}`);
    },
  });

  return {
    mutateLogin,
    password,
    onChangePassword,
    email,
    onChangeEmail,
    mutateSocialLogin,
    accessToken,
    bottomButtons,
    loginFormInputs,
    handleSubmit,
    passwordModalOpen,
    setPasswordModalOpen,
  };
}
