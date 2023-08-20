import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import Icon from "./index";
import COLORS from "../../../constants/color";
import ColorButton from "./index";

export default {
  productName: "components/ColorButton", // 스토리북에서 보여질 그룹과 경로를 명시
  component: ColorButton, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

//default
export function BlackButton() {
  return <ColorButton color={COLORS.블랙} />;
}

export function BlackButtonClicked() {
  return <ColorButton color={COLORS.블랙} />;
}

export function BlueButton() {
  return <ColorButton color={COLORS.블루} />;
}

export function BlueButtonClicked() {
  return <ColorButton color={COLORS.블루} />;
}

export function ControlTest(args: any) {
  return <ColorButton {...args} />;
}

ControlTest.args = {
  iconName: "cart",
};
