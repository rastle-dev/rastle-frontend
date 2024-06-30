import React, { useEffect, useState } from "react";
import * as S from "@/styles/index/index.styles";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import {
  loadEventProductPaging,
  loadMarketBestProduct,
  loadMarketProductPaging,
} from "@/api/shop";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/dist/client/router";
import TopLayer from "@/components/Home/TopLayer";
import ProductLayer from "@/components/Home/ProductLayer";
import EventProductLayer from "@/components/Home/EventProductLayer";
import useHome from "@/hooks/useHome";
import dynamic from "next/dynamic";
import Head from "next/head";
import BestProductLayer from "@/components/Home/BestProductLayer";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([QUERYKEYS.LOAD_PRODUCT_PAGING], () =>
    loadMarketProductPaging({ page: 0, size: 4 }),
  );
  await queryClient.prefetchQuery([QUERYKEYS.LOAD_EVENTPRODUCT_PAGING], () =>
    loadEventProductPaging({ page: 0, size: 4 }),
  );
  await queryClient.prefetchQuery([QUERYKEYS.LOAD_BEST_PRODUCT_PAGING], () =>
    loadMarketBestProduct({ page: 0, size: 6 }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10, // Set the revalidate time in seconds
  };
}

/** 홈화면의 첫 화면 : 전체 화면의 이미지와 버튼 */
const SignupPopup = dynamic(
  () => import("@/components/Home/SignupPopup/index"),
  {
    ssr: false,
  },
);
export default function Home() {
  const { mutateSocialLogin } = useLogin();
  const { productData, eventData, bestProductData } = useHome();
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
      <Head>
        <title>RECORDY SLOW - 코디로 이해시키는 제품의 가치</title>
        <meta
          name="description"
          content="과하지 않고 크게 유행 타지 않는 아이템을 신중하게 고르고 천천히, 다양하게 입어보며 제품의 코디를 기록합니다. 코디로 제품의 가치를 이해시키는 레코디 슬로우"
        />
      </Head>
      {isSignupPopupVisible && <SignupPopup onClose={handleSignupClose} />}
      <TopLayer />
      <BestProductLayer productData={bestProductData} />
      <EventProductLayer eventData={eventData} />
      <ProductLayer productData={productData} />
    </S.StyledHome>
  );
}
