import React, { useEffect, useState } from "react";
import * as S from "@/styles/index/index.styles";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadEventProductPaging, loadMarketProductPaging } from "@/api/shop";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/dist/client/router";
import useShop from "@/hooks/useShop";
import TopLayer from "@/components/Home/TopLayer";
import ProductLayer from "@/components/Home/ProductLayer";
import EventProductLayer from "@/components/Home/EventProductLayer";
import SignupPopup from "@/components/Home/SignupPopup/index";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([QUERYKEYS.LOAD_PRODUCT_PAGING], () =>
    loadMarketProductPaging({ page: 0, size: 4 }),
  );
  await queryClient.prefetchQuery(
    [QUERYKEYS.LOAD_EVENTPRODUCT_PAGING],
    loadEventProductPaging,
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10, // Set the revalidate time in seconds
  };
}

/** 홈화면의 첫 화면 : 전체 화면의 이미지와 버튼 */

export default function Home() {
  const { mutateSocialLogin } = useLogin();
  const { productData, eventData } = useShop();
  const router = useRouter();
  const [isSignupPopupVisible, setSignupPopupVisible] = useState(false);

  useEffect(() => {
    const currentPath = router.asPath;
    if (currentPath === "/?social=true") {
      localStorage.setItem("loginType", "social");
      mutateSocialLogin.mutate();
    }
  }, [router.asPath]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hideUntil = localStorage.getItem("hideSignupPopupUntil");
      if (hideUntil) {
        if (Date.now() > parseInt(hideUntil, 10)) {
          setSignupPopupVisible(true);
        } else {
          setSignupPopupVisible(false);
        }
      } else if (!localStorage.getItem("popup")) {
        setSignupPopupVisible(true);
      } else {
        localStorage.removeItem("popup");
      }
    }
  }, []);

  const handleSignupClose = () => {
    setSignupPopupVisible(false);
  };
  return (
    <S.StyledHome>
      {isSignupPopupVisible && <SignupPopup onClose={handleSignupClose} />}
      <TopLayer />
      <ProductLayer productData={productData} />
      <EventProductLayer eventData={eventData} />
    </S.StyledHome>
  );
}
