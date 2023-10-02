const BASE_URL = process.env.REACT_APP_BASE_URL;
const AUTH = "/auth/";
const LOGIN = "login";
const REFRESH = "refreshAccessToken";
const LOGOUT = "/logout";
const EMAILCERTIFICATE = "emailCertification";
const EMAILCHECK = "emailCertificationCheck";
const EMAILDUPLICATE = "checkEmail/";
const SIGNUP = "signup";
const ADMIN = "/admin/";
const CATEGORY = "category";
const MARKET = "market";
const IMAGES = "/images";
const PRODUCT = "product";
const MAINTHUMBNAIL = "/mainThumbnail";
const SUBTHUMBNAIL = "/subThumbnail";
const MAINIMAGES = "/mainImages";
const DETAILIMAGES = "/detailImages";
const UPDATECATEGORY = "/detailImages";
const BUNDLE = "bundle";
const LOGOUT = "logout";
const MARKET = "/market";
const PRODUCT = "/product";
const CURRENTMARKET = "/currentMarket";
const MEMBER = "/member";
const CHANGEPASSWORD = "/changePassword";
const ADMIN = "/admin/";
const MEMBERS = "members";

const API = {
  BASE_URL: `${BASE_URL}`,
  AUTH: `${AUTH}`,
  LOGIN: `${AUTH}${LOGIN}`,
  REISSUE: `${AUTH}${REFRESH}`,
  LOGOUT: `${LOGOUT}`,
  EMAILCERTIFICATE: `${AUTH}${EMAILCERTIFICATE}`,
  EMAILCHECK: `${AUTH}${EMAILCHECK}`,
  EMAILDUPLICATE: `${AUTH}${EMAILDUPLICATE}`,
  SIGNUP: `${AUTH}${SIGNUP}`,
  CATEGORY: `${ADMIN}${CATEGORY}`,
  BUNDLE: `${ADMIN}${BUNDLE}`,
  IMAGES: `${IMAGES}`,
  GETCATEGORY: `/${CATEGORY}`,
  GETBUNDLE: `/${BUNDLE}`,
  CREATEPRODUCT: `${ADMIN}${PRODUCT}`,
  MAINTHUMBNAIL: `${MAINTHUMBNAIL}`,
  SUBTHUMBNAIL: `${SUBTHUMBNAIL}`,
  MAINIMAGES: `${MAINIMAGES}`,
  DETAILIMAGES: `${DETAILIMAGES}`,
  LOGOUT: `${AUTH}${LOGOUT}`,
  MARKET: `${MARKET}`,
  PRODUCT: `${PRODUCT}`,
  CURRENTMARKET: `${PRODUCT}${CURRENTMARKET}`,
  MEMBER: `${MEMBER}`,
  CHANGEPASSWORD: `${MEMBER}${CHANGEPASSWORD}`,
  MEMBERSINFO: `${ADMIN}${MEMBERS}`,
};
export default API;
