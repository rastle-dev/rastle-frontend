// 관리자 api
import { authorizationClient } from "@/api/index";
import API from "@/api/config";

// eslint-disable-next-line import/prefer-default-export
export const adminGetUserInfo = async (userData: any) => {
  const { page, size } = userData;
  const { data } = await authorizationClient.get(
    `${API.MEMBERSINFO}?page=${page}&size=${size}`,
  );
  return data;
};
