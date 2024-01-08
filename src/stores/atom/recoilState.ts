import { atom } from "recoil";

const tokenState = atom<string | null>({
  key: "tokenState",
  default: "", // 초기값 설정
});
export default tokenState;
