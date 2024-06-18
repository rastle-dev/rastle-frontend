// import { unAuthorizationClient } from ".";
// 관리자 api
import API from "@/api/config";
import { authorizationClient, unAuthorizationClient } from ".";

export const adminCheckAuthority = async () => {
  const { data } = await authorizationClient.get(API.CHECKAUTHORITY);
  return data;
};

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
  const { data } = await authorizationClient.post(API.ADMINBUNDLE, marketData);
  return data;
};

export const adminUpdateBundle = async (
  bundleId: number | undefined,
  bundleData: object,
) => {
  const { data } = await authorizationClient.patch(
    `${API.ADMINBUNDLE}/${bundleId}`,
    bundleData,
  );
  return data;
};

export const adminDeleteBundle = async (bundleId: number | undefined) => {
  const { data } = await authorizationClient.delete(
    `${API.ADMINBUNDLE}/${bundleId}`,
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
    `${API.ADMINBUNDLE}/${marketId}${API.IMAGES}`,
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
    `${API.ADMINBUNDLE}/${bundleId}${API.IMAGES}`,
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
  const { data } = await unAuthorizationClient.get(API.GETCATEGORY);
  return data;
};

export const adminGetProduct = async () => {
  const { data } = await authorizationClient.get(API.PRODUCT);
  return data;
};

export const adminCreateProduct = async (productData: object) => {
  const { data } = await authorizationClient.post(
    API.CREATEPRODUCT,
    productData,
  );
  return data;
};

export const adminUpdateProduct = async (
  productId: number | undefined,
  productData: object,
) => {
  const { data } = await authorizationClient.patch(
    `${API.CREATEPRODUCT}/${productId}`,
    productData,
  );
  return data;
};

export const adminDeleteProduct = async (productId: number | undefined) => {
  const { data } = await authorizationClient.delete(
    `${API.DELETEPRODUCT}/${productId}`,
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

export const adminUpdateMainThumbnailImage = async (
  productId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  try {
    const { data } = await authorizationClient.put(
      `${API.CREATEPRODUCT}/${productId}${API.MAINTHUMBNAIL}`,
      imageData,
      { headers },
    );
    return data;
  } catch (error) {
    // 에러 처리 로직 추가
    console.error("Error occurred while uploading image:", error);
    throw error;
  }
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

export const adminUpdateSubThumbnailImage = async (
  productId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await authorizationClient.put(
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

export const adminUpdateMainImage = async (
  productId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await authorizationClient.put(
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

export const adminUpdateDetailImage = async (
  productId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await authorizationClient.put(
    `${API.CREATEPRODUCT}/${productId}${API.DETAILIMAGES}`,
    imageData,
    { headers },
  );
  return data;
};

export const adminGetUserInfo = async (userData: any) => {
  const { page, size } = userData;
  const { data } = await authorizationClient.get(
    `${API.MEMBERSINFO}?page=${page}&size=${size}`,
  );
  return data;
};

export const adminCreateEvent = async (eventData: object) => {
  const { data } = await authorizationClient.post(API.CREATEEVENT, eventData);
  return data;
};

export const adminAddEventImages = async (
  eventId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await authorizationClient.post(
    `${API.CREATEEVENT}/${eventId}${API.IMAGES}`,
    imageData,
    { headers },
  );
  return data;
};

export const adminGetEvent = async () => {
  const { data } = await authorizationClient.get(API.EVENT);
  return data;
};

export const adminGetEventProduct = async (eventId: number | undefined) => {
  const { data } = await unAuthorizationClient.get(
    `${API.EVENT}/${eventId}${API.PRODUCTS}`,
  );
  return data;
};
export const adminUpdateEvent = async (
  eventId: number | undefined,
  eventData: object,
) => {
  const { data } = await authorizationClient.patch(
    `${API.UPDATEEVENT}/${eventId}`,
    eventData,
  );
  return data;
};

export const adminUpdateEventImages = async (
  eventId: number | undefined,
  imageData: FormData,
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await authorizationClient.put(
    `${API.UPDATEEVENT}/${eventId}${API.IMAGES}`,
    imageData,
    { headers },
  );
  return data;
};

export const adminDeleteEvent = async (eventId: number | undefined) => {
  const { data } = await authorizationClient.delete(
    `${API.CREATEEVENT}/${eventId}`,
  );
  return data;
};
export const adminGetEventInfo = async (productId: number | null) => {
  const { data } = await authorizationClient.get(
    `${API.LOAD_EVNET}/${productId}`,
  );
  return data;
};
export const adminGetOrderInfo = async (orderData: any) => {
  const { page, size } = orderData;
  const { data } = await authorizationClient.get(
    `${API.ORDERSINFO}?page=${page}&size=${size}`,
  );
  return data;
};

interface TrackingData {
  trackingNumber: string | undefined;
  productOrderNumber: number | undefined;
}

export const adminUpdateTrackingNumber = async (
  trackingNumberData: TrackingData,
) => {
  const { trackingNumber, productOrderNumber } = trackingNumberData;
  const { data } = await authorizationClient.patch(
    `${API.UPDATE_TRACKINGNUMBER}/${productOrderNumber}/trackingNumber`,
    { trackingNumber },
  );
  return data;
};
export const adminDeleteTrackingNumber = async (
  productOrderNumber: number | undefined,
) => {
  const { data } = await authorizationClient.delete(
    `${API.DELETE_TRACKINGNUMBER}/${productOrderNumber}/trackingNumber`,
  );
  return data;
};

interface CancelData {
  impId: string | undefined;
  productOrderNumber: number | undefined;
}
export const adminCancelOrder = async (cancelData: CancelData) => {
  const { data } = await authorizationClient.post(
    `${API.ADMIN_CANCEL_ORDER}`,
    cancelData,
  );
  return data;
};

export const adminReturnOrder = async (cancelData: CancelData) => {
  const { data } = await authorizationClient.post(
    `${API.ADMIN_RETURN_ORDER}`,
    cancelData,
  );
  return data;
};
