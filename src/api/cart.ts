import { authorizationClient } from ".";
import API from "./config";

// eslint-disable-next-line import/prefer-default-export
export const addCartProduct = async (productData: object) => {
  const { data } = await authorizationClient.post(API.CART, productData);
  return data;
};
