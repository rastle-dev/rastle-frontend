import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import Button from "./index";

export default {
  productName: "components/Button", // 스토리북에서 보여질 그룹과 경로를 명시
  component: Button, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

export function Default() {
  return <Button title="로그인" type="default" />;
}
export function Shop() {
  return <Button title="구매하기" type="shop" />;
}
export function Size() {
  return <Button title="M" type="size" />;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ControlTest(args: any) {
  return <Button {...args} />;
}
ControlTest.args = {
  productName: "기본",
  label: "size",
};
