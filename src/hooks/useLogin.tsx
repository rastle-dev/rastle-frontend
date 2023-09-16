import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useInput from "@/hooks/useInput";
import { authLogin, authLogout } from "@/api/auth";
import PATH from "@/constants/path";
import errorMsg from "@/components/Toast/error";
import toastMsg from "@/components/Toast";

export default function useLogin() {
  const router = useRouter();
  const [password, onChangePassword] = useInput("");
  const [email, onChangeEmail] = useInput("");

  // yslim162@naver.com
  const mutateLogin = useMutation(["login"], authLogin, {
    onSuccess: async (response) => {
      // HTTP 응답에서 "Authorization" 헤더 값을 추출
      const token = response.authorization.replace("Bearer ", "");
      localStorage.setItem("accessToken", token);
      // toastMsg("로그인 성공!");
      router.push(PATH.HOME);
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
  const logout = async () => {
    try {
      console.log("local", localStorage);
      await authLogout();
      localStorage.clear();
      toastMsg("로그아웃 되었습니다!");
      router.push(PATH.HOME);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    mutateLogin,
    password,
    onChangePassword,
    email,
    onChangeEmail,
    logout,
  };
}
