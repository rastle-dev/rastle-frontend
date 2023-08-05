import React, { useState } from "react";
import ProductCategoryTabs from "@/components/Shop/CategoryTab";
import * as S from "./index.styles";

type ProductCategory = "전체" | "1차 마켓" | "이전 마켓" | "이벤트";

const ProductList = [
  {
    category: "1차",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: 45800,
    defaultImg: "",
    hoverImg: "",
  },
  {
    category: "1차 마켓",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: 45800,
    defaultImg: "",
    hoverImg: "",
  },
  {
    category: "이전 마켓",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: 45800,
    defaultImg: "",
    hoverImg: "",
  },
  {
    category: "이벤트",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: 0,
    defaultImg: "",
    hoverImg: "",
  },
];
export default function Login() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("전체");
  const handleCategoryChange = (category: ProductCategory) => {
    setActiveCategory(category);
  };
  return (
    <S.Container>
      <S.Header>
        <h1>SHOP</h1>
        <ProductCategoryTabs
          categories={["전체", "1차 마켓", "이전 마켓", "이벤트"]}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </S.Header>
      <S.Line />
    </S.Container>
  );
}
