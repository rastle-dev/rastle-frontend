import React, { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQueryClient } from "@tanstack/react-query";
import ProductCategoryTabs from "@/components/Shop/CategoryTab";
import ItemElement from "@/components/ItemElement";
import * as S from "@/styles/shop/index.styles";
import QUERYKEYS from "@/constants/querykey";
import { loadEventProductPaging, loadMarketProductPaging } from "@/api/shop";
import CodyProduct from "@/components/Shop/CodyProduct";
import { adminGetCategory } from "@/api/admin";
import { useRouter } from "next/dist/client/router";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  // Prefetch queries
  // await queryClient.prefetchQuery([QUERYKEYS.LOAD_PRODUCT], loadMarketProduct);
  await queryClient.prefetchQuery([QUERYKEYS.LOAD_PRODUCT_PAGING], () =>
    loadMarketProductPaging({ page: 0, size: 4 }),
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
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [activeCategoryId, setActiveCategoryId] = useState<any>();
  const [categoryList, setCategoryList] = useState<any>([]);
  const queryClient = useQueryClient();
  const router = useRouter();
  const productData = queryClient.getQueryData([
    QUERYKEYS.LOAD_PRODUCT_PAGING,
  ]) as {
    data: {
      content: Array<any>;
    };
  };
  const eventData = queryClient.getQueryData([
    QUERYKEYS.LOAD_EVENTPRODUCT_PAGING,
  ]) as {
    data: Array<any>;
  };
  const categoryData = queryClient.getQueryData([
    QUERYKEYS.ADMIN_GET_CATEGORY,
  ]) as { data: Array<any> };
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveCategoryId(
      categoryData?.data.find((item: any) => item.name === category),
    );

    // 업데이트하기: 선택된 탭을 세션 스토리지에 저장
    sessionStorage.setItem("activeTab", category);

    router.replace(`/shop?tab=${encodeURIComponent(category)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  //
  useEffect(() => {
    setCategoryList(
      categoryData?.data && [
        "전체",
        "코디상품",
        ...categoryData.data.map((v: any) => v.name),
        "이벤트",
      ],
    );
  }, []);
  useEffect(() => {
    const { tab } = router.query;
    // 읽어오기: 세션 스토리지에서 저장된 값을 읽어옴
    const storedTab = sessionStorage.getItem("activeTab");
    // tab이 없거나 세션 스토리지에 저장된 값이 없으면 기본값 사용
    const initialTab = tab || storedTab || "전체";
    categoryList?.forEach((item: any) => {
      if (tab && item === initialTab) {
        setActiveCategory(item);
        setActiveCategoryId(
          categoryData?.data.find((v: any) => v.name === item),
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
      <S.Header>
        <h1>SHOP</h1>
        <ProductCategoryTabs
          categories={
            categoryData?.data && [
              "전체",
              "코디상품",
              ...categoryData.data.map((v: any) => v.name),
              "이벤트",
            ]
          }
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </S.Header>
      <S.Line />
      {/* eslint-disable-next-line no-nested-ternary */}
      {activeCategory === "코디상품" ? (
        <CodyProduct />
      ) : // eslint-disable-next-line no-nested-ternary
      activeCategory === "전체" ? (
        <S.ProductList>
          {productData?.data.content.map((item: any) => (
            <ItemElement
              key={item.id}
              defaultImg={item.mainThumbnail}
              hoverImg={item.subThumbnail}
              productName={item.name}
              price={item.price}
              discountPrice={item.discountPrice}
              id={item.id}
              category={item.categoryId}
              isEvent={!!item.eventId}
            />
          ))}
        </S.ProductList>
      ) : activeCategory === "이벤트" ? (
        <S.ProductList>
          {eventData?.data.map((item: any) => (
            <ItemElement
              key={item.productId}
              defaultImg={item.mainThumbnail}
              hoverImg={item.subThumbnail}
              productName={item.name}
              price={item.price}
              discountPrice={0}
              id={item.productId}
              category={item.categoryId}
              isEvent={!!item.eventId}
            />
          ))}
        </S.ProductList>
      ) : (
        <S.ProductList>
          {productData?.data.content.filter(
            (item: any) => item.categoryId === activeCategoryId?.id,
          ).length === 0 ? (
            <S.NOPRODUCT>
              제품 준비 중이에요. &nbsp;빠른 시일 내로 준비해서 찾아뵐게요!
              &nbsp;🙇🏻
            </S.NOPRODUCT>
          ) : (
            productData?.data.content
              .filter((item: any) => item.categoryId === activeCategoryId?.id)
              .map((item: any) => (
                <ItemElement
                  key={item.id}
                  defaultImg={item.mainThumbnail}
                  hoverImg={item.subThumbnail}
                  productName={item.name}
                  price={item.price}
                  discountPrice={item.discountPrice}
                  id={item.id}
                  category={item.categoryId}
                  isEvent={!!item.eventId}
                />
              ))
          )}
        </S.ProductList>
      )}
    </S.Container>
  );
}
