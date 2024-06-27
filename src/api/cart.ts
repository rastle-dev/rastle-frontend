import { authorizationClient } from ".";
import API from "./config";

export const addCartProduct = async (productData: object) => {
  const { data } = await authorizationClient.post(API.CART, productData);
  return data;
};

export const loadCartProduct = async () => {
  const { data } = await authorizationClient.get(API.CART);
  return data;
};
export const deleteSelectedCartProduct = async (cartProductId: string) => {
  const { data } = await authorizationClient.delete(
    `${API.CART}${API.REMOVE}?deleteCartProductIdList=${cartProductId}`,
  );
  return data;
};

export const deleteAllCartProduct = async () => {
  const { data } = await authorizationClient.delete(API.CART);
  return data;
};

export const loadCoupon = async () => {
  const { data } = await authorizationClient.get(API.COUPON);
  return data;
};

export const loadDefaultAddress = async () => {
  const { data } = await authorizationClient.get(API.LOAD_ADDRESS);
  return data;
};

export const updateDefaultAddress = async (addressData: object) => {
  const { data } = await authorizationClient.put(
    API.UPDATE_ADDRESS,
    addressData,
  );
  return data;
};

export const loadOrderList = async (bundleData: any) => {
  const { page, size } = bundleData;
  const { data } = await authorizationClient.get(
    `${API.ORDERS}?page=${page}&size=${size}`,
  );
  return data;
};
export const updatePhoneNumber = async (phonenumber: object) => {
  const { data } = await authorizationClient.put(
    API.UPDATE_PHONENUMBER,
    phonenumber,
  );
  return data;
};

export const loadEventHistory = async (bundleData: any) => {
  const token = localStorage.getItem("accessToken");
  // 토큰값이 존재하지 않으면 요청을 보내지 않고 종료
  if (!token) {
    console.log("토큰이 존재하지 않습니다.");
    return null; // 또는 다른 적절한 값을 반환
  }
  const { page, size } = bundleData;
  const { data } = await authorizationClient.get(
    `${API.APPLY_EVENT}?page=${page}&size=${size}`,
  );
  return data;
};
export const requestUserOrderCancel = async (cancelProductData: any) => {
  const { data } = await authorizationClient.post(
    API.USER_ORDER_CANCEL,
    cancelProductData,
  );
  return data;
};

export const requestUserOrderReturn = async (returnProductData: any) => {
  const { data } = await authorizationClient.post(
    API.USER_ORDER_RETURN,
    returnProductData,
  );
  return data;
};
