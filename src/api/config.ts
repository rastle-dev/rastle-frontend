const BASE_URL = process.env.REACT_APP_BASE_URL;
const AUTH = "/auth/";
const LOGIN = "login";
const REFRESH = "refreshAccessToken";
const EMAILCERTIFICATE = "emailCertification";
const EMAILCHECK = "emailCertificationCheck";
const EMAILDUPLICATE = "checkEmail/";
const SIGNUP = "signup";
const LOGOUT = "logout";
const MARKET = "/market";
const PRODUCT = "/product";
const CURRENTMARKET = "/currentMarket";
const MEMBER = "/member";

const API = {
  BASE_URL: `${BASE_URL}`,
  AUTH: `${AUTH}`,
  LOGIN: `${AUTH}${LOGIN}`,
  REISSUE: `${AUTH}${REFRESH}`,
  EMAILCERTIFICATE: `${AUTH}${EMAILCERTIFICATE}`,
  EMAILCHECK: `${AUTH}${EMAILCHECK}`,
  EMAILDUPLICATE: `${AUTH}${EMAILDUPLICATE}`,
  SIGNUP: `${AUTH}${SIGNUP}`,
  LOGOUT: `${AUTH}${LOGOUT}`,
  MARKET: `${MARKET}`,
  PRODUCT: `${PRODUCT}`,
  CURRENTMARKET: `${PRODUCT}${CURRENTMARKET}`,
  MEMBER: `${MEMBER}`,
};
export default API;
