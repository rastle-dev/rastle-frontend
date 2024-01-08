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
