import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import Input from "./index";

export default {
  itemName: "components/Input", // 스토리북에서 보여질 그룹과 경로를 명시
  component: Input, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

export function DefaultInput() {
  return <Input value="TEST" labelHidden />;
}
export function CheckBox() {
  return <Input type="checkbox" />;
}
export function LabelInput() {
  return <Input size={30} value="label" label="label" />;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ControlTest(args: any) {
  return <Input {...args} />;
}
ControlTest.args = {
  size: "30rem",
};
