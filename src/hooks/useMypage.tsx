import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useInput from "@/hooks/useInput";
import { authLogin, authLogout } from "@/api/auth";
import PATH from "@/constants/path";
import errorMsg from "@/components/Toast/error";
import toastMsg from "@/components/Toast";

export default function useMypage() {
  const router = useRouter();
  const [password, onChangePassword] = useInput("");
  const [email, onChangeEmail] = useInput("");
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
    password,
    onChangePassword,
    email,
    onChangeEmail,
    logout,
  };
}
