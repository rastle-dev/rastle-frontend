import { useState } from "react";
import useInput from "@/hooks/useInput";
import {
  authSendEmail,
  authCheckCode,
  authCheckEmailDuplicate,
  authSignUp,
} from "@/api/auth";

export default function useSignup() {
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
  const [emailValid, setEmailValid] = useState(false);
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  const [codeMessage, setCodeMessage] = useState("");
  const [privateChecked, setPrivateChecked] = useState(false);
  // yslim162@naver.com

  // Function to reset emailMessage
  const resetEmailMessage = () => {
    if (duplicateCheck) {
      setEmailMessage(""); // Reset the message
      setDuplicateCheck(false);
    }
  };

  // Attach the resetEmailMessage function to the onChangeEmail handler
  const onChangeEmailHandler = (newEmail: string) => {
    onChangeEmail(newEmail); // Assuming onChangeEmail is provided by useInput
    resetEmailMessage(); // Reset emailMessage
  };

  /** TODO:) 백엔드 data 수정하면 고쳐야함 */
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
        console.log(data);
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
      console.log("코드 일치");
      setCodeMatch(true);
      setCodeMessage("이메일 인증이 완료되었습니다!");
    } else {
      console.log("코드 불일치");
      setCodeMatch(false);
      setCodeMessage("코드가 일치하지 않습니다");
    }
  };

  /** 이메일 형태와 일치할 시에 true를 반환합니다 */
  const isValidEmail = (emailData: string) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailData);
  };

  const signUp = async () => {
    console.log(email, password, username, phoneNumber);
    const data = await authSignUp({ email, password, username, phoneNumber });
    if (data.data) {
      console.log(data);
    } else {
      console.log(data);
    }
  };

  const togglePrivate = () => {
    setPrivateChecked(!privateChecked);
  };

  return {
    username,
    onChangeUserName,
    onChangeEmailHandler,
    email,
    onChangeEmail,
    code,
    onChangeCode,
    password,
    onChangePassword,
    passwordCheck,
    onChangePasswordCheck,
    phoneNumber,
    onChangePhoneNumber,
    sendEmailCode,
    showText,
    setShowText,
    codeMatch,
    setCodeMatch,
    checkEmailCode,
    checkEmailDuplicated,
    isValidEmail,
    emailMessage,
    setEmailMessage,
    emailButton,
    setEmailButton,
    emailValid,
    setEmailValid,
    duplicateCheck,
    codeMessage,
    signUp,
    togglePrivate,
    privateChecked,
  };
}
