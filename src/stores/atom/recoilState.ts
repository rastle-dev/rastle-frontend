import { atom } from "recoil";

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: "", // 초기값 설정
});

export const eventModalState = atom<boolean>({
  key: "eventModalState",
  default: false, // 초기값 설정
});

export const eventDialogState = atom<boolean>({
  key: "eventDialogState",
  default: false, // 초기값 설정
});
