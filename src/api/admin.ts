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
  const { data } = await authorizationClient.get(API.CATEGORY);
  return data;
};
