import React, { useEffect } from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import ProductCategoryTabs from "@/components/Shop/CategoryTab";
import * as S from "@/styles/shop/index.styles";
import QUERYKEYS from "@/constants/querykey";
import { loadEventProductPaging, loadMarketProductPaging } from "@/api/shop";
import { adminGetCategory } from "@/api/admin";
import { useRouter } from "next/dist/client/router";
import Category from "@/interface/category";
import useShop from "@/hooks/useShop";
import CategoryView from "@/components/Shop/CategoryView";
import Index from "@/components/Shop/CategoryView/Cody";
import Head from "next/head";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  // Prefetch queries
  await queryClient.prefetchQuery([QUERYKEYS.LOAD_PRODUCT_PAGING], () =>
    loadMarketProductPaging({ page: 0 }),
  );
  await queryClient.prefetchQuery(
    [QUERYKEYS.LOAD_EVENTPRODUCT_PAGING],
    loadEventProductPaging,
  );
  await queryClient.prefetchQuery(
    [QUERYKEYS.ADMIN_GET_CATEGORY],
    adminGetCategory,
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10, // Set the revalidate time in seconds
  };
}
export default function Shop() {
  const router = useRouter();
  const {
    setActiveCategoryId,
    categoryList,
    setCategoryList,
    categoryData,
    handleCategoryChange,
    activeCategory,
    setActiveCategory,
    activeCategoryId,
  } = useShop();

  useEffect(() => {
    setCategoryList(
      categoryData?.data && [
        "전체",
        "코디상품",
        ...categoryData.data.map((v: Category) => v.name),
      ],
    );
  }, []);
  useEffect(() => {
    const { tab } = router.query;
    // 읽어오기: 세션 스토리지에서 저장된 값을 읽어옴
    const storedTab = sessionStorage.getItem("activeTab");
    // tab이 없거나 세션 스토리지에 저장된 값이 없으면 기본값 사용
    const initialTab = tab || storedTab || "전체";
    categoryList?.forEach((item: string) => {
      if (tab && item === initialTab) {
        setActiveCategory(item);
        setActiveCategoryId(
          categoryData?.data.find((v: Category) => v.name === item),
        );
      }
    });
    // 저장하기: 현재 선택된 탭을 세션 스토리지에 저장
    if (typeof initialTab === "string") {
      sessionStorage.setItem("activeTab", initialTab);
    }
    // 컴포넌트가 마운트될 때만 실행되는 코드
    return () => {
      // 언마운트될 때 세션 스토리지에서 데이터 삭제
      sessionStorage.removeItem("activeTab");
    };
  }, [router.query.tab, categoryData, categoryList]);

  return (
    <S.Container>
      <Head>
        <title>SHOP - RECORDY SLOW</title>
        <meta
          name="description"
          content="언제나 확신이 드는 이쁘고 좋은 상품만을 판매할것을 약속드립니다."
        />
      </Head>
      <S.Header>
        <h1>SHOP</h1>
        <ProductCategoryTabs
          categories={
            categoryData?.data && [
              "전체",
              "코디상품",
              ...categoryData.data.map((v: Category) => v.name),
            ]
          }
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </S.Header>
      <S.Line />
      {activeCategory === "코디상품" ? (
        <Index />
      ) : (
        <CategoryView
          activeCategory={activeCategory}
          activeCategoryId={activeCategoryId}
        />
      )}
    </S.Container>
  );
}
