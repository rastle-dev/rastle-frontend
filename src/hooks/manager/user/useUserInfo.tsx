import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { adminGetUserInfo } from "@/api/admin";
import QUERYKEYS from "@/constants/querykey";

export default function useUserInfo() {
  const useLoadUserInfo = (UserData: object) => {
    const queryFn = () => adminGetUserInfo(UserData);
    const { data, refetch } = useQuery(
      [QUERYKEYS.ADMIN_LOAD_USERINFO],
      queryFn,
    );

    return { data, refetch };
  };

  const ITEM_SIZE = 5;
  const [curPage, setCurPage] = useState(1);

  const onChangePage = (page: number) => {
    setCurPage(page);
    console.log("클릭");
  };

  const [searchType, setSearchType] = useState("이메일 주소");
  const [searchValue, setSearchValue] = useState("");
  return {
    useLoadUserInfo,
    ITEM_SIZE,
    curPage,
    setCurPage,
    onChangePage,
    searchType,
    setSearchType,
    searchValue,
    setSearchValue,
  };
}
