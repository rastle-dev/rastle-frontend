const QUERYKEYS = {
  LOAD_MARKET_IMAGES: "getMarketImages",
  LOAD_CURRENT_MARKET: "loadCurrentMarket",
  LOAD_BUNDLE_PRODUCT: "loadBundleProduct",
  LOAD_PRODUCT: "getProducts",
  LOAD_EVENTPRODUCT: "getEventProducts",
  ADMIN_GET_BUNDLE: "adminGetSet",
  ADMIN_GET_CATEGORY: "adminGetCategory",
  ADMIN_GET_PRODUCT: "adminGetProduct",
  ADMIN_GET_EVENT: "adminGetEvent",
  LOAD_EVENT_PRODUCT: "adminGetEventProduct",
  LOAD_BUNDLE: "loadBundle",
  LOAD_SELECT_BUNDLE: "loadSelectBundle",
  LOAD_ME: "loadMe",
  ADMIN_LOAD_USERINFO: "adminGetUserInfo",
  LOAD_PRODUCT_IMAGE: "loadProductImage",
  LOAD_PRODUCT_DETAIL: "loadProductDetail",
  LOAD_PRODUCT_COLOR: "loadProductColor",
  LOAD_CART: "loadCartProduct",
} as const;

export default QUERYKEYS;
