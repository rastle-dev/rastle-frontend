import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import Icon from "./index";
import COLORS from "../../../constants/color";
import Dialog from "./index";

export default {
  title: "components/Dialog", // 스토리북에서 보여질 그룹과 경로를 명시
  component: Dialog, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

//default
export function dialog() {
  return <Dialog />;
}

export function ControlTest(args: any) {
  return <Dialog {...args} />;
}

ControlTest.args = {};
