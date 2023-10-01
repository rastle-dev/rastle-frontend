// 관리자 api
import { authorizationClient } from "@/api/index";
import API from "@/api/config";

export const adminGetUserInfo = async () => {
  const { data } = await authorizationClient.get(API.MEMBERSINFO);
  return data;
};

export const adminSearchUserInfoByEmail = async () => {
  const { data } = await authorizationClient.get(API.MEMBERSINFO);
  return data;
};
