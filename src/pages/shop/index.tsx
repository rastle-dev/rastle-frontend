import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCategoryTabs from "@/components/Shop/CategoryTab";
import ItemElement from "@/components/ItemElement";
import * as S from "@/styles/shop/index.styles";
import QUERYKEYS from "@/constants/querykey";
import { loadMarketProduct } from "@/api/shop";
import CodyProduct from "@/components/Shop/CodyProduct";
import { adminGetCategory } from "@/api/admin";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [activeCategoryId, setActiveCategoryId] = useState<any>();
  const { data: productData } = useQuery(
    [QUERYKEYS.LOAD_PRODUCT],
    loadMarketProduct,
  );
  const { data: categoryData } = useQuery(
    [QUERYKEYS.ADMIN_GET_CATEGORY],
    adminGetCategory,
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveCategoryId(
      categoryData?.data.find((item: any) => item.name === category),
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  console.log(
    "d",
    productData?.data.content.filter(
      (item: any) => item.categoryId === activeCategoryId?.id,
    ),
  );
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
              price={`${item.price.toLocaleString()}원`}
              id={item.id}
              category={item.categoryId}
              isEvent={item.event}
            />
          ))}
        </S.ProductList>
      ) : activeCategory === "이벤트" ? (
        <S.ProductList>
          {productData?.data.content
            .filter((item: any) => item.isEvent === true)
            .map((item: any) => (
              <ItemElement
                key={item.id}
                defaultImg={item.mainThumbnail}
                hoverImg={item.subThumbnail}
                productName={item.name}
                price={`${item.price.toLocaleString()}원`}
                id={item.id}
                category={item.categoryId}
                isEvent={item.event}
              />
            ))}
        </S.ProductList>
      ) : (
        <S.ProductList>
          {productData?.data.content.filter(
            (item: any) => item.categoryId === activeCategoryId?.id,
          ).length === 0 ? (
            <S.NOPRODUCT>
              제품 준비 중이에요!! &nbsp;빠른 시일 내로 준비해서 찾아뵐게요!🙇🏻
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
                  price={`${item.price.toLocaleString()}원`}
                  id={item.id}
                  category={item.categoryId}
                  isEvent={item.event}
                />
              ))
          )}
        </S.ProductList>
      )}
    </S.Container>
  );
}
