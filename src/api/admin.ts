// import { unAuthorizationClient } from ".";
// 관리자 api
import API from "@/api/config";
import { authorizationClient } from ".";

export const adminCreateCategory = async (categoryData: object) => {
  const { data } = await authorizationClient.post(API.CATEGORY, categoryData);
  return data;
};

export const adminUpdateCategory = async (
  categoryId: number | undefined,
  categoryData: object,
) => {
  const { data } = await authorizationClient.patch(
    `${API.CATEGORY}/${categoryId}`,
    categoryData,
  );
  return data;
};

export const adminDeleteCategory = async (categoryId: number | undefined) => {
  const { data } = await authorizationClient.delete(
    `${API.CATEGORY}/${categoryId}`,
  );
  return data;
};

export const adminCreateBundle = async (marketData: object) => {
  const { data } = await authorizationClient.post(API.BUNDLE, marketData);
  return data;
};

export const adminUpdateBundle = async (
  bundleId: number | undefined,
  bundleData: object,
) => {
  const { data } = await authorizationClient.patch(
    `${API.BUNDLE}/${bundleId}`,
    bundleData,
  );
  return data;
};

export const adminDeleteBundle = async (bundleId: number | undefined) => {
  const { data } = await authorizationClient.delete(
    `${API.BUNDLE}/${bundleId}`,
  );
  return data;
};

export const adminAddBundleImages = async (
  marketId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await authorizationClient.post(
    `${API.BUNDLE}/${marketId}${API.IMAGES}`,
    imageData,
    { headers },
  );
  return data;
};

export const adminUpdateBundleImages = async (
  bundleId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await authorizationClient.put(
    `${API.BUNDLE}/${bundleId}${API.IMAGES}`,
    imageData,
    { headers },
  );
  return data;
};

export const adminGetBundle = async () => {
  const { data } = await authorizationClient.get(API.GETBUNDLE);
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
