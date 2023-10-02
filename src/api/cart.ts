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
