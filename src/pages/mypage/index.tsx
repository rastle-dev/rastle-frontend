import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import OrderList from "@/components/Mypage/orderList";
import Cart from "@/components/Mypage/cart";
import LoginInfo from "@/components/Mypage/loginInfo";
import useMypage from "@/hooks/useMypage";
import DefaultAddress from "@/components/Mypage/defaultAddress";
import * as S from "../../styles/mypage/index.styles";

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
  const [activeTab, setActiveTab] = useState<string>("주문 내역");
  const [tabList, setTabList] = useState<any>([]);

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
        return <DefaultAddress />;
      default:
        return <OrderList />;
    }
  };
  useEffect(() => {
    setTabList(["주문 내역", "장바구니", "로그인 정보", "기본 배송지"]);
  }, []);
  // URL 파라미터를 확인하여 활성 탭을 설정
  useEffect(() => {
    const { tab } = router.query;
    const storedTab = sessionStorage.getItem("tab");
    const initialTab = tab || storedTab || "로그인 정보";
    console.log("tab", tab, initialTab);
    // URL 파라미터에 따라 활성 탭 설정
    // if (tab === "장바구니") {
    //   setActiveTab("장바구니");
    // } else if (tab === "로그인 정보") {
    //   setActiveTab("로그인 정보");
    // } else if (tab === "기본배송지") {
    //   setActiveTab("기본 배송지");
    // }
    tabList?.forEach((item: any) => {
      if (tab && item === initialTab) {
        setActiveTab(item);
      }
    });

    if (typeof initialTab === "string") {
      sessionStorage.setItem("tab", initialTab);
    }
    // URL 파라미터가 없을 경우, "로그인정보" 탭으로 설정하고 URL에 파라미터를 추가
    // if (!tab) {
    //   setActiveTab("로그인 정보");
    //   router.replace("/mypage?tab=로그인 정보");
    // }

    // 컴포넌트가 마운트될 때만 실행되는 코드
    return () => {
      // 언마운트될 때 세션 스토리지에서 데이터 삭제
      sessionStorage.removeItem("tab");
    };
  }, [router.query.tab, tabList]);
  console.log("tablsit", tabList);
  const handleTabClick = (tabs: any) => {
    setActiveTab(tabs);
    // 업데이트하기: 선택된 탭을 세션 스토리지에 저장
    sessionStorage.setItem("tab", tabs);
    router.replace(`/mypage?tab=${encodeURIComponent(tabs)}`);
  };

  return (
    <S.Container>
      <S.Header>
        <h1>MYPAGE</h1>
      </S.Header>
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
        <S.Content>{renderTabContent()}</S.Content>
      </S.Wrapper>
    </S.Container>
  );
}
