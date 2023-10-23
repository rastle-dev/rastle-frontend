import { unAuthorizationClient } from ".";
import API from "./config";

export const loadBundleProduct = async () => {
  const { data } = await unAuthorizationClient.get(API.BUNDLE_PRODUCT);
  return data;
};
export const loadBundle = async (bundleData: any) => {
  const { page, size } = bundleData;
  const { data } = await unAuthorizationClient.get(
    `${API.BUNDLE}?page=${page}&size=${size}`,
  );
  return data;
};
export const loadSelectBundle = async (bundleId: number) => {
  const { data } = await unAuthorizationClient.get(
    `${API.BUNDLE}/${bundleId}${API.PRODUCTS}`,
  );
  return data;
};

export const loadMarketProduct = async () => {
  const { data } = await unAuthorizationClient.get(API.PRODUCT);
  return data;
};

export const loadProductImage = async (productId: number | undefined) => {
  const { data } = await unAuthorizationClient.get(
    `${API.PRODUCT}/${productId}${API.IMAGE}`,
  );
  return data;
};

export const loadProductDetail = async (productId: number | undefined) => {
  const { data } = await unAuthorizationClient.get(
    `${API.PRODUCT}/${productId}${API.DETAIL}`,
  );
  return data;
};

export const loadProductCOLOR = async (productId: number | undefined) => {
  const { data } = await unAuthorizationClient.get(
    `${API.PRODUCT}/${productId}${API.COLORS}`,
  );
  return data;
};

export const loadEventProduct = async () => {
  const { data } = await unAuthorizationClient.get(
    `${API.PRODUCT}${API.EVENT}?lowerBound=0&upperBound=1500`,
  );
  return data;
};
