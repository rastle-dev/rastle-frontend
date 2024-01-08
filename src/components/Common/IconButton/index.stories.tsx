import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import COLORS from "../../../constants/color";
import IconButton from "./index";

export default {
  productName: "components/IconButton", // 스토리북에서 보여질 그룹과 경로를 명시
  component: IconButton, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

// default
export function CartButton() {
  return <IconButton iconName="cart" color={COLORS.블랙} />;
}

export function InstagramButton() {
  return <IconButton iconName="instagram" color={COLORS.블랙} />;
}

export function PersonButton() {
  return <IconButton iconName="person" color={COLORS.블랙} />;
}

export function MenuButton() {
  return <IconButton iconName="menu" color={COLORS.블랙} />;
}
