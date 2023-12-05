import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/dist/client/router";
import { toast } from "react-toastify";
import useInput from "@/hooks/useInput";
import { authLogin, authSocialReissue } from "@/api/auth";
import PATH from "@/constants/path";
import errorMsg from "@/components/Toast/error";
import { useRecoilState } from "recoil";
import { tokenState } from "@/stores/atom/recoilState";

export default function useLogin() {
  const router = useRouter();
  const [password, onChangePassword] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [accessToken, setToken] = useRecoilState(tokenState);

  // yslim162@naver.com
  const mutateLogin = useMutation(["loadMutation"], authLogin, {
    onSuccess: async (response) => {
      // HTTP 응답에서 "Authorization" 헤더 값을 추출
      const token = response.authorization.replace("Bearer ", "");
      localStorage.setItem("accessToken", token);
      console.log(response);
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
  };
}
