import { useState } from "react";
import { useRouter } from "next/dist/client/router";

export default function useMypage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("주문 내역");
  const [tabList, setTabList] = useState<string[]>([]);
  const shoppingTabs = [
    { label: "주문 내역", category: "쇼핑 정보" },
    { label: "장바구니" },
  ];
  const myTabs = [
    { label: "로그인 정보", category: "내 정보" },
    { label: "기본 배송지" },
  ];

  const handleTabClick = (tabs: any) => {
    setActiveTab(tabs);
    // 업데이트하기: 선택된 탭을 세션 스토리지에 저장
    sessionStorage.setItem("tab", tabs);
    router.replace(`/mypage?tab=${encodeURIComponent(tabs)}`);
  };
  return {
    handleTabClick,
    shoppingTabs,
    myTabs,
    activeTab,
    setActiveTab,
    tabList,
    setTabList,
  };
}
