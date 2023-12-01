import { atom } from "recoil";

// eslint-disable-next-line import/prefer-default-export
export const tokenState = atom<string | null>({
  key: "tokenState",
  default: "", // 초기값 설정
});
