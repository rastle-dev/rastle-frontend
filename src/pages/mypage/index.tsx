import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import OrderList from "@/components/Mypage/orderList";
import Cart from "@/components/Mypage/cart";
import LoginInfo from "@/components/Mypage/loginInfo";
import DefaultAddress from "@/components/Mypage/defaultAddress";
import useLoginInfo from "@/hooks/mypage/loginInfo/useLoginInfo";
import useMypage from "@/hooks/mypage/useMypage";
import * as S from "../../styles/mypage/index.styles";

export default function Mypage() {
  const router = useRouter();
  const { logout } = useLoginInfo();
  const {
    handleTabClick,
    shoppingTabs,
    myTabs,
    activeTab,
    setActiveTab,
    tabList,
    setTabList,
  } = useMypage();
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
    tabList?.forEach((item: any) => {
      if (tab && item === initialTab) {
        setActiveTab(item);
      }
    });
    if (typeof initialTab === "string") {
      sessionStorage.setItem("tab", initialTab);
    }
    // 컴포넌트가 마운트될 때만 실행되는 코드
    return () => {
      // 언마운트될 때 세션 스토리지에서 데이터 삭제
      sessionStorage.removeItem("tab");
    };
  }, [router.query.tab, tabList]);

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
