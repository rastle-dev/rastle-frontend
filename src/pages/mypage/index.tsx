import React, { useState } from "react";
import OrderList from "@/components/Mypage/orderList";
import Cart from "@/components/Mypage/cart";
import * as S from "./index.styles";
import useLogin from "@/hooks/useLogin";

const shoppingTabs = [
  { label: "주문 내역", category: "쇼핑 정보" },
  { label: "장바구니" },
];
const myTabs = [
  { label: "로그인 정보", category: "내 정보" },
  { label: "기본 배송지" },
];
export default function Mypage() {
  const [activeTab, setActiveTab] = useState("주문 내역");
  const { logout } = useLogin();

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "주문 내역":
        return <OrderList />;
      case "장바구니":
        return <Cart />;
      case "로그인 정보":
        return <OrderList />;
      case "기본 배송지":
        return <OrderList />;
      default:
        return null;
    }
  };
  return (
    <S.Container>
      <h1>MYPAGE</h1>
      <S.Wrapper>
        <S.Sidebar>
          <S.Menu>
            {shoppingTabs.map((tab) => (
              <S.Box key={tab.label} onClick={() => handleTabClick(tab.label)}>
                {tab.category && <h2>{tab.category}</h2>}
                <S.SubMenu active={tab.label === activeTab}>
                  {tab.label}
                </S.SubMenu>
              </S.Box>
            ))}
          </S.Menu>
          <S.Menu>
            {myTabs.map((tab) => (
              <S.Box key={tab.label} onClick={() => handleTabClick(tab.label)}>
                {tab.category && <h2>{tab.category}</h2>}
                <S.SubMenu active={tab.label === activeTab}>
                  {tab.label}
                </S.SubMenu>
              </S.Box>
            ))}
          </S.Menu>
          <S.Logout title="로그아웃" onClick={() => logout()} />
        </S.Sidebar>
        <S.Content> {renderTabContent()}</S.Content>
      </S.Wrapper>
    </S.Container>
  );
}
