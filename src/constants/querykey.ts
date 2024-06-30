const QUERYKEYS = {
  LOAD_MARKET_IMAGES: "getMarketImages",
  LOAD_CURRENT_MARKET: "loadCurrentMarket",
  LOAD_BUNDLE_PRODUCT: "loadBundleProduct",
  LOAD_PRODUCT: "loadMarketProduct",
  LOAD_PRODUCT_PAGING: "loadMarketProductPaging",
  LOAD_PRODUCT_PAGING_SHOP: "loadMarketProductPagingShop",
  LOAD_BEST_PRODUCT_PAGING_SHOP: "loadMarketBestProductPagingShop",
  LOAD_BEST_PRODUCT_PAGING: "loadMarketBestProduct",
  LOAD_EVENTPRODUCT: "loadEventProduct",
  LOAD_EVENTPRODUCT_PAGING: "loadEventProductPaging",
  LOAD_EVENTPRODUCT_PAGING_SHOP: "loadEventProductPagingShop",
  ADMIN_GET_BUNDLE: "adminGetSet",
  ADMIN_GET_CATEGORY: "adminGetCategory",
  ADMIN_GET_PRODUCT: "adminGetProduct",
  ADMIN_GET_EVENT: "adminGetEvent",
  ADMIN_GET_AUTHORITY: "adminGetAuthority",
  LOAD_EVENT_PRODUCT: "adminGetEventProduct",
  LOAD_BUNDLE: "loadBundle",
  LOAD_SELECT_BUNDLE: "loadSelectBundle",
  LOAD_ME: "loadMe",
  ADMIN_LOAD_USERINFO: "adminGetUserInfo",
  ADMIN_LOAD_ORDERINFO: "adminGetOrderInfo",
  ADMIN_LOAD_EVENTINFO: "adminGetEventInfo",
  LOAD_PRODUCT_IMAGE: "loadProductImage",
  LOAD_PRODUCT_DETAIL: "loadProductDetail",
  LOAD_PRODUCT_COLOR: "loadProductColor",
  LOAD_CART: "loadCartProduct",
  LOAD_COUPON: "loadCoupon",
  LOAD_ORDER_LIST: "loadOrderList",
  LOAD_DEFAULT_ADDRESS: "loadDefaultAddress",
  UPDATE_DEFAULT_ADDRESS: "updateDefaultAddress",
  UPDATE_DEFAULT_PHONENUMBER: "updateDefaultPhoneNumber",
  LOAD_EVENT_HISTORY: "loadEventHistory",
  LOAD_ORDER_DETAIL: "loadOrderDetail",
  REQUEST_USER_CANCEL: "requestUserOrderCancel",
  LOAD_RECEIVERINFO_MERCHANTID: "loadReceiverInfo",
} as const;

export default QUERYKEYS;
