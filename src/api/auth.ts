import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const authLogin = async (userLoginData: object) => {
  const { headers } = await unAuthorizationClient.post(
    API.LOGIN,
    userLoginData,
  );
  return headers;
};
export const authSocialReissue = async () => {
  const { headers } = await unAuthorizationClient.post(API.REISSUE);
  return headers;
};
export const authLogout = async () => {
  const { data } = await authorizationClient.post(API.LOGOUT);
  return data;
};

// 회원가입
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
export const loadMe = async () => {
  const { data } = await authorizationClient.get(API.MEMBER);
  return data;
};

export const loadOrderDetail = async (
  orderNumber: string | string[] | undefined,
) => {
  const { data } = await authorizationClient.get(
    `${API.ORDERS}/${orderNumber}`,
  );
  return data;
};

export const changePassword = async (newPassword: { newPassword: string }) => {
  const { data } = await authorizationClient.put(
    API.CHANGEPASSWORD,
    newPassword,
  );
  return data;
};

export const deleteMe = async () => {
  const { data } = await authorizationClient.delete(API.MEMBER);
  return data;
};

export const authInitializePW = async (emailData: string) => {
  const { data } = await unAuthorizationClient.post(
    API.INITIALIZE_PASSWORD,
    { email: emailData }, // 데이터를 객체 형식으로 보냄
    {
      headers: {
        "Content-Type": "application/json", // Content-Type을 application/json으로 설정
      },
    },
  );
  return data;
};
