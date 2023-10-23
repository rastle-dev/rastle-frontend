import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCategoryTabs from "@/components/Shop/CategoryTab";
import ItemElement from "@/components/ItemElement";
import * as S from "@/styles/shop/index.styles";
import QUERYKEYS from "@/constants/querykey";
import { loadMarketProduct } from "@/api/shop";
import CodyProduct from "@/components/Shop/CodyProduct";
import { adminGetCategory } from "@/api/admin";

type ProductCategory = "전체" | "코디상품" | "상의" | "하의" | "이벤트";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("전체");
  const { data: productData } = useQuery(
    [QUERYKEYS.LOAD_PRODUCT],
    loadMarketProduct,
  );
  const { data: categoryData } = useQuery(
    [QUERYKEYS.ADMIN_GET_CATEGORY],
    adminGetCategory,
  );

  const handleCategoryChange = (category: ProductCategory) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      {activeCategory === "코디상품" ? (
        <CodyProduct />
      ) : (
        <S.ProductList>
          {productData?.data.content.map((item: any) => (
            <ItemElement
              key={item.id}
              defaultImg={item.mainThumbnail}
              hoverImg={item.subThumbnail}
              productName={item.name}
              price={`${item.price.toLocaleString()}원`}
              id={item.id}
              isEvent={item.event}
            />
          ))}
        </S.ProductList>
      )}
    </S.Container>
  );
}
