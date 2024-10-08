const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
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
const ORDERS = "/orders";
const PAYMENTS = "/payments";
const COMPLETE = "/complete";
const COUPON = "/coupon";
const PREPARE = "/prepare";
const LOAD_ADDRESS = "/getMemberRecipientInfo";
const UPDATE_ADDRESS = "/updateMemberRecipientInfo";
const APPLY = "/apply";
const UPDATE_PHONENUMBER = "/updateMemberPhoneNumber";
const CANCEL = "/cancel";
const RETURN = "/return";
const RESET = "resetPassword";
const MERCHANTID = "merchantId";
const CANCEL_ORDER = "cancelOrder";
const RETURN_ORDER = "returnOrder";

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
  ORDERSINFO: `${ADMIN}${ORDERS}`,
  CREATEEVENT: `${ADMIN}${EVENT}`,
  UPDATEEVENT: `${ADMIN}${EVENT}`,
  LOAD_EVNET: `${ADMIN}${EVENT}${APPLY}`,
  DELETEEVENT: `${ADMIN}${EVENT}`,
  UPDATE_TRACKINGNUMBER: `${ADMIN}${ORDERS}`,
  DELETE_TRACKINGNUMBER: `${ADMIN}${ORDERS}`,
  EVENT: `${EVENT}`,
  CART: `${CART}`,
  REMOVE: `${REMOVE}`,
  CHECKAUTHORITY: `${AUTH}${AUTHORITY}`,
  KAKAO_AUTH_URL: `${BASE_URL}/oauth2/authorization/kakao?redirect_uri=https://www.rastle.site`,
  LOCAL_KAKAO_AUTH_URL: `${BASE_URL}/oauth2/authorization/kakao?redirect_uri=http://localhost:3000`,
  NAVER_AUTH_URL: `${BASE_URL}/oauth2/authorization/naver?redirect_uri=https://www.rastle.site`,
  LOCAL_NAVER_AUTH_URL: `${BASE_URL}/oauth2/authorization/naver?redirect_uri=http://localhost:3000`,
  ORDERS: `${ORDERS}`,
  PAYMENTCOMPLETE: `${PAYMENTS}${COMPLETE}`,
  PAYMENTPREPARE: `${PAYMENTS}${PREPARE}`,
  COUPON: `${COUPON}`,
  LOAD_ADDRESS: `${MEMBER}${LOAD_ADDRESS}`,
  UPDATE_ADDRESS: `${MEMBER}${UPDATE_ADDRESS}`,
  APPLY_EVENT: `${EVENT}${APPLY}`,
  APPLY: `${APPLY}`,
  UPDATE_PHONENUMBER: `${MEMBER}${UPDATE_PHONENUMBER}`,
  USER_ORDER_CANCEL: `${ORDERS}${CANCEL}`,
  USER_ORDER_RETURN: `${ORDERS}${RETURN}`,
  INITIALIZE_PASSWORD: `${AUTH}${RESET}`,
  MERCHANTID: `${ORDERS}/${MERCHANTID}`,
  ADMIN_CANCEL_ORDER: `${ADMIN}/${CANCEL_ORDER}`,
  ADMIN_RETURN_ORDER: `${ADMIN}/${RETURN_ORDER}`,
};
export default API;
