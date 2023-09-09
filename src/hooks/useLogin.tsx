import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";
import useInput from "@/hooks/useInput";
import { authLogin, authLogout } from "@/api/auth";
import PATH from "@/constants/path";
import API from "@/api/config";
import { unAuthorizationClient } from "@/api";

export default function useLogin() {
  const router = useRouter();
  const [password, onChangePassword] = useInput("");
  const [email, onChangeEmail] = useInput("");

  const mutateLogin = useMutation(["login"], authLogin, {
    onSuccess: (response) => {
      // HTTP 응답에서 "Authorization" 헤더 값을 추출
      const token = response;
      console.log(token);
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
      router.push(PATH.SHOP);
    } catch (err) {
      console.log(err);
    }
  };
  // const login = async () => {
  //   try {
  //     const response = await authLogin({ email, password });
  //     const authorizationHeader = response.headers.authorization;
  //     if (authorizationHeader) {
  //       const token = authorizationHeader.split(" ")[1]; // JWT 토큰 추출
  //       console.log("JWT Token:", token);
  //     } else {
  //       console.log("Authorization 헤더를 찾을 수 없습니다.");
  //     }
  //     // localStorage.clear();
  //     console.log("로그인!");
  //     router.push(PATH.SHOP);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const login = async () => {
  //   await unAuthorizationClient
  //     .post(API.LOGIN, { email, password })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         // 모든 헤더 이름은 소문자
  //         const accessToken = res.headers.authorization; // 응답헤더에서 토큰 받기
  //         console.log("access 토큰 :", accessToken);
  //         axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //       }
  //     });
  // };
  const login = async () => {
    await axios
      .post("https://rastledev.site/auth/login", { email, password })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          // 모든 헤더 이름은 소문자
          const accessToken = res.headers.authorization; // 응답헤더에서 토큰 받기
          console.log("access 토큰 :", accessToken);
          axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        }
      });
  };

  return {
    mutateLogin,
    password,
    onChangePassword,
    email,
    onChangeEmail,
    logout,
    login,
  };
}
