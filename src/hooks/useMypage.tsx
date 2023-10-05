import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useInput from "@/hooks/useInput";
import { authLogout, changePassword, deletMe } from "@/api/auth";
import PATH from "@/constants/path";
import toastMsg from "@/components/Toast";
import errorMsg from "@/components/Toast/error";
import QUERYKEYS from "@/constants/querykey";
import {
  addCartProduct,
  deleteAllCartProduct,
  deleteSelectedCartProduct,
  loadCartProduct,
} from "@/api/cart";

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

  const { data: cartProduct } = useQuery(
    [QUERYKEYS.LOAD_CART],
    loadCartProduct,
  );
  const mutateAddCartProduct = useMutation(["addCartProduct"], addCartProduct, {
    onSuccess: async (data) => {
      toastMsg("장바구니에 해당 상품이 담겼습니다!");
      console.log("담는다?", data);
    },
    onError: ({
      response: {
        data: { errorCode, message },
      },
    }) => {
      toast.dismiss();
      errorMsg("담기 실패");
      console.log(`${errorCode} / ${message}`);
    },
  });
  const queryClient = useQueryClient();

  const mutateDeleteCartProduct = useMutation(
    ["deleteSelectedCartProduct"],
    deleteSelectedCartProduct,
    {
      onSuccess: async () => {
        await deleteAllCartProduct();
        toastMsg("선택하신 상품이 삭제 되었습니다! 👏");
        queryClient.invalidateQueries([QUERYKEYS.LOAD_CART]);
      },
      onError: ({
        response: {
          data: { errorCode, message },
        },
      }) => {
        toast.dismiss();
        errorMsg("삭제 실패");
        console.log(`${errorCode} / ${message}`);
      },
    },
  );
  const deleteCart = async () => {
    try {
      await deleteAllCartProduct();
      toastMsg("삭제 되었습니다! 👏");
      queryClient.invalidateQueries([QUERYKEYS.LOAD_CART]);
    } catch (error) {
      errorMsg("전체 삭제 실패");
      console.log(error);
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
    cartProduct,
    mutateAddCartProduct,
    mutateDeleteCartProduct,
    deleteCart,
  };
}
