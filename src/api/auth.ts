import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const authLogin = async (userLoginData: object) => {
  const { headers } = await unAuthorizationClient.post(
    API.LOGIN,
    userLoginData,
  );
  return headers;
};

export const authLogout = async () => {
  const { data } = await authorizationClient.post(API.LOGOUT);
  return data;
};

//회원가입
export const authSendEmail = async (emailData: object) => {
  const { data } = await unAuthorizationClient.post(
    API.EMAILCERTIFICATE,
    emailData,
  );
  return data;
};

export const authCheckCode = async (checkCodeData: object) => {
  const { data } = await unAuthorizationClient.post(
    API.EMAILCHECK,
    checkCodeData,
  );
  return data;
};

export const authCheckEmailDuplicate = async (emailData: object) => {
  const { data } = await unAuthorizationClient.get(
    `${API.EMAILDUPLICATE}${emailData}`,
    emailData,
  );
  return data;
};

export const authSignUp = async (userSignUpData: object) => {
  const { data } = await unAuthorizationClient.post(API.SIGNUP, userSignUpData);
  return data;
};
