import React, { useState } from "react";
import useInput from "@/hooks/useInput";
import {
  authSendEmail,
  authCheckCode,
  authCheckEmailDuplicate,
  authSignUp,
} from "@/api/auth";
import { useRouter } from "next/dist/client/router";

import PATH from "@/constants/path";
import toastMsg from "@/components/Toast";
import errorMsg from "@/components/Toast/error";

type InputProps = {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  message?: string;
  placeholder?: string;
  readOnly?: boolean;
  isCertification?: {
    title?: string;
    size?: "large" | "medium" | "small";
    disabled?: boolean;
    theme?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  };
  inValid?: boolean;
};

export default function useSignup() {
  const router = useRouter();
  const [username, onChangeUserName] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [code, onChangeCode] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [phoneNumber, onChangePhoneNumber] = useInput("");
  const [codeMatch, setCodeMatch] = useState(false);
  const [showText, setShowText] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailButton, setEmailButton] = useState("인증");
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  const [codeMessage, setCodeMessage] = useState("");
  const [privateChecked, setPrivateChecked] = useState(false);
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const resetEmailMessage = () => {
    if (duplicateCheck) {
      setEmailMessage(""); // Reset the message
      setDuplicateCheck(false);
    }
  };

  const onChangeEmailHandler = (newEmail: string) => {
    onChangeEmail(newEmail);
    resetEmailMessage();
  };

  const checkEmailDuplicated = async () => {
    const data = await authCheckEmailDuplicate(email);
    if (data.data) {
      return true;
    }

    return false;
  };

  const sendEmailCode = async () => {
    const duplicated = await checkEmailDuplicated();
    if (!duplicated) {
      setEmailButton("재전송");
      setShowText(true);
      const data = await authSendEmail({ email });
      if (data) {
        setDuplicateCheck(false);
      }
    } else {
      setDuplicateCheck(true);
      setEmailMessage("이미 가입된 이메일입니다");
    }
  };

  const checkEmailCode = async () => {
    const data = await authCheckCode({ email, code });
    if (data.data) {
      setCodeMatch(true);
      setCodeMessage("이메일 인증이 완료되었습니다!");
    } else {
      setCodeMatch(false);
      setCodeMessage("코드가 일치하지 않습니다");
    }
  };

  /** 이메일 형태와 일치할 시에 true를 반환합니다 */
  const isValidEmail = (emailData: string) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailData);
  };

  const validatePassword = (password: string) => {
    const hasRequiredLength = password.length >= 8 && password.length <= 16;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasRequiredLength && hasLetters && hasNumbers && hasSpecialChars;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    onChangePassword(e);
    setPasswordMessage(
      validatePassword(newPassword)
        ? ""
        : "비밀번호는 8자에서 16자 사이의 영문, 숫자, 특수문자를 조합하여 입력해주세요.",
    );
  };

  const signUp = async () => {
    const data = await authSignUp({ email, password, username, phoneNumber });
    if (data.data) {
      toastMsg("회원가입이 완료되었습니다 !");
      router.push(PATH.LOGIN);
    } else {
      errorMsg("입력한 항목이 맞는지 확인해주세요.");
    }
  };

  const togglePrivate = () => {
    setPrivateChecked(!privateChecked);
  };

  const inputData: InputProps[] = [
    {
      label: "이름",
      placeholder: "예) 홍레슬",
      onChange: onChangeUserName,
    },
    {
      label: "휴대폰 번호",
      placeholder: "예) 01012345678",
      onChange: onChangePhoneNumber,
      inValid:
        phoneNumber.length > 0 &&
        !/^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/.test(phoneNumber),
      message:
        phoneNumber.length > 0 &&
        !/^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/.test(phoneNumber)
          ? "유효하지 않은 전화번호입니다"
          : "",
    },
    {
      label: "이메일주소",
      placeholder: "예) rastle@rastle.com",
      // buttonTitle: "전송",
      onChange: onChangeEmailHandler,
      message:
        email.length > 0 && !isValidEmail(email)
          ? "이메일 형식이 틀렸습니다"
          : emailMessage,
      inValid: email.length > 0 && (!isValidEmail(email) || duplicateCheck),
      isCertification: {
        title: emailButton,
        disabled: (email.length > 0 && !isValidEmail(email)) || codeMatch,
        onClick: () => {
          if (email.length === 0) errorMsg("이메일을 먼저 입력해주세요!");
          else sendEmailCode();
        },
      },
    },
    {
      label: "인증번호",
      placeholder: "",
      onChange: onChangeCode,
      message: codeMessage,
      inValid: codeMessage === "코드가 일치하지 않습니다" && !codeMatch,
      isCertification: {
        title: "확인",
        disabled: codeMatch,
        onClick: () => {
          checkEmailCode();
        },
      },
    },
    {
      label: "비밀번호",
      type: "password",
      placeholder: "영문,숫자,특수문자 조합 8~16자",
      onChange: handlePasswordChange,
      message: passwordMessage,
      inValid: !!passwordMessage,
    },
    {
      label: "비밀번호 확인",
      type: "password",
      onChange: onChangePasswordCheck,
      message:
        password !== passwordCheck && passwordCheck.length > 0
          ? "비밀번호가 일치하지 않습니다."
          : "",
      inValid: password !== passwordCheck && passwordCheck.length > 0,
    },
  ];

  const handleLinkClick = () => {
    setIsViewMoreModalOpen(true);
    // router.push(PATH.AGREEMENT, undefined, { shallow: true });
  };

  return {
    username,
    password,
    passwordCheck,
    phoneNumber,
    showText,
    codeMatch,
    signUp,
    togglePrivate,
    privateChecked,
    inputData,
    onChangePasswordCheck,
    onChangePassword,
    handleLinkClick,
    isViewMoreModalOpen,
    setIsViewMoreModalOpen,
    validatePassword,
    passwordMessage,
  };
}
