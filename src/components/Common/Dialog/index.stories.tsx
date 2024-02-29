import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import Dialog from "./index";

export default {
  productName: "components/Dialog", // 스토리북에서 보여질 그룹과 경로를 명시
  component: Dialog, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

// default
export function eventdialog() {
  return (
    <Dialog
      visible
      title="응모가 완료되었어요! 🥳"
      refuse="응모내역 확인하기"
      confirm="쇼핑 계속하기"
      size={43}
    />
  );
}

export function dialog() {
  return (
    <Dialog
      visible
      title="해당 장바구니에 상품이 담겼습니다 🛒"
      refuse="장바구니로 이동하기"
      confirm="쇼핑 계속하기"
      size={45}
    />
  );
}

export function ControlTest(args: any) {
  return <Dialog {...args} />;
}

ControlTest.args = {};
