// 관리자 api
import { authorizationClient } from "@/api/index";
import API from "@/api/config";

export const adminGetUserInfo = async (userData: any) => {
  const { page, size } = userData;
  const { data } = await authorizationClient.get(
    `${API.MEMBERSINFO}?page=${page}&size=${size}`,
  );
  return data;
};

export const adminSearchUserInfoByEmail = async () => {
  const { data } = await authorizationClient.get(API.MEMBERSINFO);
  return data;
};
