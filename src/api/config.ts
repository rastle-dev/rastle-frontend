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
  CREATEMARKET: `${ADMIN}${MARKET}`,
  IMAGES: `${IMAGES}`,
  GETCATEGORY: `/${CATEGORY}`,
  GETMARKET: `/${MARKET}`,
  CREATEPRODUCT: `${ADMIN}${PRODUCT}`,
  MAINTHUMBNAIL: `${MAINTHUMBNAIL}`,
  SUBTHUMBNAIL: `${SUBTHUMBNAIL}`,
  MAINIMAGES: `${MAINIMAGES}`,
  DETAILIMAGES: `${DETAILIMAGES}`,
};
export default API;
