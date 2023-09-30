// import { unAuthorizationClient } from ".";
// 관리자 api
import { authorizationClient, unAuthorizationClient } from ".";
import API from "@/api/config";

export const adminCreateCategory = async (categoryData: object) => {
  const { data } = await authorizationClient.post(API.CATEGORY, categoryData);
  return data;
};

export const adminCreateMarket = async (marketData: object) => {
  const { data } = await authorizationClient.post(API.CREATEMARKET, marketData);
  return data;
};

export const adminAddMarketImages = async (
  marketId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await authorizationClient.post(
    `${API.CREATEMARKET}/${marketId}${API.IMAGES}`,
    imageData,
    { headers },
  );
  return data;
};

export const adminGetMarket = async () => {
  const { data } = await authorizationClient.get(API.GETMARKET);
  return data;
};

export const adminGetCategory = async () => {
  const { data } = await authorizationClient.get(API.GETCATEGORY);
  return data;
};

export const adminCreateProduct = async (productData: object) => {
  const { data } = await authorizationClient.post(
    API.CREATEPRODUCT,
    productData,
  );
  return data;
};

export const adminAddMainThumbnailImage = async (
  productId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await authorizationClient.post(
    `${API.CREATEPRODUCT}/${productId}${API.MAINTHUMBNAIL}`,
    imageData,
    { headers },
  );
  return data;
};

export const adminAddSubThumbnailImage = async (
  productId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await authorizationClient.post(
    `${API.CREATEPRODUCT}/${productId}${API.SUBTHUMBNAIL}`,
    imageData,
    { headers },
  );
  return data;
};

export const adminAddMainImage = async (
  productId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await authorizationClient.post(
    `${API.CREATEPRODUCT}/${productId}${API.MAINIMAGES}`,
    imageData,
    { headers },
  );
  return data;
};

export const adminAddDetailImage = async (
  productId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await authorizationClient.post(
    `${API.CREATEPRODUCT}/${productId}${API.DETAILIMAGES}`,
    imageData,
    { headers },
  );
  return data;
};
