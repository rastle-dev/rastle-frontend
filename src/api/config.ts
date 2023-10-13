const BASE_URL = process.env.REACT_APP_BASE_URL;
const AUTH = "/auth/";
const LOGIN = "login";
const REFRESH = "refreshAccessToken";
const EMAILCERTIFICATE = "emailCertification";
const EMAILCHECK = "emailCertificationCheck";
const EMAILDUPLICATE = "checkEmail/";
const SIGNUP = "signup";
const CATEGORY = "/category";
const IMAGES = "/images";
const PRODUCT = "/product";
const MAINTHUMBNAIL = "/mainThumbnail";
const SUBTHUMBNAIL = "/subThumbnail";
const MAINIMAGES = "/mainImages";
const DETAILIMAGES = "/detailImages";
const BUNDLE = "/bundle"; //
const IMAGE = "/image";
const DETAIL = "/detail";
const COLOR = "/color";
const LOGOUT = "logout";
const MARKET = "/market";
// const PRODUCT = "/product";
const CURRENTMARKET = "/currentMarket";
const MEMBER = "/member";
const CHANGEPASSWORD = "/changePassword";
const ADMIN = "/admin"; //
const MEMBERS = "/members";
const EVENT = "/event";

const API = {
  BASE_URL: `${BASE_URL}`,
  AUTH: `${AUTH}`,
  LOGIN: `${AUTH}${LOGIN}`,
  REISSUE: `${AUTH}${REFRESH}`,
  EMAILCERTIFICATE: `${AUTH}${EMAILCERTIFICATE}`,
  EMAILCHECK: `${AUTH}${EMAILCHECK}`,
  EMAILDUPLICATE: `${AUTH}${EMAILDUPLICATE}`,
  SIGNUP: `${AUTH}${SIGNUP}`,
  CATEGORY: `${ADMIN}${CATEGORY}`,
  BUNDLE: `${ADMIN}${BUNDLE}`,
  IMAGES: `${IMAGES}`,
  GETCATEGORY: `${CATEGORY}`,
  GETBUNDLE: `${BUNDLE}`,
  CREATEPRODUCT: `${ADMIN}${PRODUCT}`,
  UPDATEPRODUCT: `${ADMIN}${PRODUCT}`,
  DELETEPRODUCT: `${ADMIN}${PRODUCT}`,
  MAINTHUMBNAIL: `${MAINTHUMBNAIL}`,
  SUBTHUMBNAIL: `${SUBTHUMBNAIL}`,
  MAINIMAGES: `${MAINIMAGES}`,
  DETAILIMAGES: `${DETAILIMAGES}`,
  BUNDLE_PRODUCT: `${PRODUCT}${BUNDLE}`,
  PRODUCT: `${PRODUCT}`,
  IMAGE: `${IMAGE}`,
  DETAIL: `${DETAIL}`,
  COLORS: `${COLOR}`,
  LOGOUT: `${AUTH}${LOGOUT}`,
  MARKET: `${MARKET}`,
  CURRENTMARKET: `${PRODUCT}${CURRENTMARKET}`,
  MEMBER: `${MEMBER}`,
  CHANGEPASSWORD: `${MEMBER}${CHANGEPASSWORD}`,
  MEMBERSINFO: `${ADMIN}${MEMBERS}`,
  CREATEEVENT: `${ADMIN}${EVENT}`,
  UPDATEEVENT: `${ADMIN}${EVENT}`,
  DELETEEVENT: `${ADMIN}${EVENT}`,
  GETEVENT: `${EVENT}`,
};
export default API;
