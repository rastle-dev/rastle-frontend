import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import OrderList from "@/components/Mypage/orderList";
import Cart from "@/components/Mypage/cart";
import LoginInfo from "@/components/Mypage/loginInfo";
import useMypage from "@/hooks/useMypage";
import * as S from "./index.styles";

const shoppingTabs = [
  { label: "주문 내역", category: "쇼핑 정보" },
  { label: "장바구니" },
];
const myTabs = [
  { label: "로그인 정보", category: "내 정보" },
  { label: "기본 배송지" },
];

export default function Mypage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("주문 내역");
  const { logout } = useMypage();

  const renderTabContent = () => {
    switch (activeTab) {
      case "주문 내역":
        return <OrderList />;
      case "장바구니":
        return <Cart />;
      case "로그인 정보":
        return <LoginInfo />;
      case "기본 배송지":
        return <OrderList />;
      default:
        return <OrderList />;
    }
  };

  // URL 파라미터를 확인하여 활성 탭을 설정
  useEffect(() => {
    const { tab } = router.query;

    // URL 파라미터에 따라 활성 탭 설정
    if (tab === "장바구니") {
      setActiveTab("장바구니");
    } else if (tab === "로그인정보") {
      setActiveTab("로그인 정보");
    } else if (tab === "기본배송지") {
      setActiveTab("기본 배송지");
    }

    // URL 파라미터가 없을 경우, "로그인정보" 탭으로 설정하고 URL에 파라미터를 추가
    if (!tab) {
      setActiveTab("로그인정보");
      router.push("/mypage?tab=로그인정보");
    }
  }, [router.query]);

  const handleTabClick = (tabs: any) => {
    setActiveTab(tabs);
    router.push(`/mypage?tab=${encodeURIComponent(tabs)}`);
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
        <S.Content>🤘{renderTabContent()}</S.Content>
      </S.Wrapper>
    </S.Container>
  );
}
