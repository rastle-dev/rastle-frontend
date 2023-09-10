import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useInput from "@/hooks/useInput";
import { authLogin, authLogout } from "@/api/auth";
import PATH from "@/constants/path";

export default function useLogin() {
  const router = useRouter();
  const [password, onChangePassword] = useInput("");
  const [email, onChangeEmail] = useInput("");
  // yslim162@naver.com
  const mutateLogin = useMutation(["login"], authLogin, {
    onSuccess: (response) => {
      // HTTP 응답에서 "Authorization" 헤더 값을 추출
      const token = response.authorization.replace("Bearer ", "");
      console.log(token);
      router.push(PATH.HOME);
    },
    onError: ({
      response: {
        data: { errorCode, message },
      },
    }) => {
      console.log(`${errorCode} / ${message}`);
    },
  });
  const logout = async () => {
    try {
      await authLogout();
      localStorage.clear();
      console.log("로그아웃");
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
