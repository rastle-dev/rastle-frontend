import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import Icon from "./index";
import COLORS from "../../../constants/color";

export default {
  productName: "components/Icon", // 스토리북에서 보여질 그룹과 경로를 명시
  component: Icon, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

export function Cart() {
  return <Icon iconName="cart" color={COLORS.블랙} />;
}

export function Arrow() {
  return <Icon size="1rem" iconName="arrowLeft" color={COLORS.블랙} />;
}

export function Person() {
  return <Icon iconName="person" color={COLORS.블랙} />;
}

export function ControlTest(args: any) {
  return <Icon {...args} />;
}

ControlTest.args = {
  iconName: "cart",
};
