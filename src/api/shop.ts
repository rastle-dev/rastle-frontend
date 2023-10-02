import { unAuthorizationClient } from ".";
import API from "./config";

export const getMarketImages = async () => {
  const { data } = await unAuthorizationClient.get(API.MARKET);
  return data;
};

export const loadCurrentMarket = async () => {
  const { data } = await unAuthorizationClient.get(API.CURRENTMARKET);
  return data;
};

export const loadMarketProduct = async () => {
  const { data } = await unAuthorizationClient.get(API.PRODUCT);
  return data;
};
