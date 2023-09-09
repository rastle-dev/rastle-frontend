import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

// eslint-disable-next-line import/prefer-default-export
export const authLogin = async (userLoginData: object) => {
  const { headers } = await unAuthorizationClient.post(
    API.LOGIN,
    userLoginData,
  );
  return headers;
};
export const authLogout = async () => {
  const { data } = await authorizationClient.get(API.LOGOUT);
  return data;
};
