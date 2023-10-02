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
const BUNDLE = "/bundle";
const MEMBER = "/member";
const CHANGEPASSWORD = "/changePassword";
const ADMIN = "/admin/";
const MEMBERS = "members";

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
  PRODUCT: `${PRODUCT}`,
  BUNDLE_PRODUCT: `${PRODUCT}${BUNDLE}`,
  BUNDLE: `${BUNDLE}`,
  MEMBER: `${MEMBER}`,
  CHANGEPASSWORD: `${MEMBER}${CHANGEPASSWORD}`,
  MEMBERSINFO: `${ADMIN}${MEMBERS}`,
};
export default API;
