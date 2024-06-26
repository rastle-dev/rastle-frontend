import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

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

export const loadMarketProductPaging = async (pageData: any) => {
  const { page, size } = pageData;
  const { data } = await unAuthorizationClient.get(
    `${API.PRODUCT}?page=${page}&size=${size}&visible=TRUE&sort=displayOrder,asc`,
  );
  return data;
};
export const loadMarketProductPagingShop = async (pageData: any) => {
  const { page, size } = pageData;
  const { data } = await unAuthorizationClient.get(
    `${API.PRODUCT}?page=${page}&size=${size}&visible=TRUE&sort=displayOrder,asc`,
  );
  return data;
};
export const loadMarketBestProduct = async (pageData: any) => {
  const { page, size } = pageData;
  const { data } = await unAuthorizationClient.get(
    `${API.PRODUCT}?page=${page}&size=${size}&visible=TRUE&sort=soldCount,desc`,
  );
  return data;
};
export const loadMarketBestProductPagingShop = async (pageData: any) => {
  const { page, size } = pageData;
  const { data } = await unAuthorizationClient.get(
    `${API.PRODUCT}?page=${page}&size=${size}&visible=TRUE&sort=soldCount,desc`,
  );
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
    `${API.PRODUCT}/${productId}`,
  );
  return data;
};
export const loadEventProductDetail = async (eventId: number | undefined) => {
  const { data } = await unAuthorizationClient.get(
    `${API.EVENT}/${eventId}${API.PRODUCTS}`,
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

export const loadEventProductPaging = async (pageData: any) => {
  const { page, size } = pageData;
  const { data } = await unAuthorizationClient.get(
    `${API.PRODUCT}${API.EVENT}?page=${page}&size=${size}&visible=TRUE&sort=displayOrder,asc`,
  );
  return data;
};
export const loadEventProductPagingShop = async (pageData: any) => {
  const { page, size } = pageData;
  const { data } = await unAuthorizationClient.get(
    `${API.PRODUCT}${API.EVENT}?page=${page}&size=${size}&visible=TRUE&sort=displayOrder,asc`,
  );
  return data;
};

export const createOrder = async (orderData: object) => {
  const { data } = await authorizationClient.post(`${API.ORDERS}`, orderData);
  return data;
};
export const createCartOrder = async (cartProductIds: object) => {
  const { data } = await authorizationClient.post(
    `${API.ORDERS}${API.CART}`,
    cartProductIds,
  );
  return data;
};

export const paymentConfirm = async (paymentData: object) => {
  const { data } = await authorizationClient.post(
    `${API.PAYMENTCOMPLETE}`,
    paymentData,
  );
  return data;
};

export const applyEvent = async (userEventData: object) => {
  const { data } = await authorizationClient.post(
    `${API.APPLY_EVENT}`,
    userEventData,
  );
  return data;
};

export const paymentPrepare = async (paymentData: object) => {
  const { data } = await authorizationClient.post(
    `${API.PAYMENTPREPARE}`,
    paymentData,
  );
  return data;
};
export const loadReceiverInfo = async (merchantId: string) => {
  const { data } = await authorizationClient.get(
    `${API.MERCHANTID}/${merchantId}`,
  );
  return data;
};
