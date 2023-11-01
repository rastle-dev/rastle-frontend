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
const MAINTHUMBNAIL = "/mainThumbnail";
const SUBTHUMBNAIL = "/subThumbnail";
const MAINIMAGES = "/mainImages";
const DETAILIMAGES = "/detailImages";
const LOGOUT = "logout";
const MARKET = "/market";
const CURRENTMARKET = "/currentMarket";
const PRODUCT = "/product";
const BUNDLE = "/bundle";
const MEMBER = "/member";
const CHANGEPASSWORD = "/changePassword";
const EVENT = "/event";
const PRODUCTS = "/products";
const ADMIN = "/admin";
const MEMBERS = "/members";
const COLOR = "/color";
const DETAIL = "/detail";
const IMAGE = "/image";
const CART = "/cart";
const REMOVE = "/removeSelected";
const AUTHORITY = "authority";

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
  ADMINBUNDLE: `${ADMIN}${BUNDLE}`,
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
  PRODUCTS: `${PRODUCTS}`,
  IMAGE: `${IMAGE}`,
  DETAIL: `${DETAIL}`,
  COLORS: `${COLOR}`,
  LOGOUT: `${AUTH}${LOGOUT}`,
  MARKET: `${MARKET}`,
  CURRENTMARKET: `${PRODUCT}${CURRENTMARKET}`,
  BUNDLE: `${BUNDLE}`,
  MEMBER: `${MEMBER}`,
  CHANGEPASSWORD: `${MEMBER}${CHANGEPASSWORD}`,
  MEMBERSINFO: `${ADMIN}${MEMBERS}`,
  CREATEEVENT: `${ADMIN}${EVENT}`,
  UPDATEEVENT: `${ADMIN}${EVENT}`,
  DELETEEVENT: `${ADMIN}${EVENT}`,
  EVENT: `${EVENT}`,
  CART: `${CART}`,
  REMOVE: `${REMOVE}`,
  CHECKAUTHORITY: `${AUTH}${AUTHORITY}`,
  KAKAO_AUTH_URL: `${BASE_URL}/oauth2/authorization/kakao?redirect_uri=https://www.recordyslow.com`,
  LOCAL_KAKAO_AUTH_URL: `${BASE_URL}/oauth2/authorization/kakao?redirect_uri=http://localhost:3000`,
};
export default API;
