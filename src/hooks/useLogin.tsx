import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/dist/client/router";
import { toast } from "react-toastify";
import useInput from "@/hooks/useInput";
import { authLogin, authSocialReissue } from "@/api/auth";
import PATH from "@/constants/path";
import errorMsg from "@/components/Toast/error";

export default function useLogin() {
  const router = useRouter();
  const [password, onChangePassword] = useInput("");
  const [email, onChangeEmail] = useInput("");

  // yslim162@naver.com
  const mutateLogin = useMutation(["loadMutation"], authLogin, {
    onSuccess: async (response) => {
      // HTTP 응답에서 "Authorization" 헤더 값을 추출
      const token = response.authorization.replace("Bearer ", "");
      localStorage.setItem("accessToken", token);
      console.log(response);

      setTimeout(async () => {
        const cookies = document.cookie;
        console.log("click", cookies);
      }, 3000);
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
  const mutateSocialLogin = useMutation(["loadMutation"], authSocialReissue, {
    onSuccess: async (headers) => {
      // HTTP 응답에서 "Authorization" 헤더 값을 추출
      const token = headers.authorization.replace("Bearer ", "");
      localStorage.setItem("accessToken", token);
      console.log(headers);
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
  };
}
