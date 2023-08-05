import React, { useState } from "react";
import ProductCategoryTabs from "@/components/Shop/CategoryTab";
import * as S from "./index.styles";

type ProductCategory = "전체" | "1차 마켓" | "이전 마켓" | "이벤트";
const ProductList = [
  {
    category: "1차 마켓",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: "45,800",
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
  {
    category: "1차 마켓",
    productName: "트랙 샌딩 워시드 와이드 흑청 데님 틴 워시드 버뮤다 데님 팬츠",
    price: "45,800",
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
  {
    category: "이전 마켓",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: "45,800",
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
  {
    category: "이벤트",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: 0,
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
  {
    category: "이벤트",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: 0,
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
  {
    category: "이벤트",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: 0,
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
  {
    category: "이벤트",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: 0,
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
];
export default function Login() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("전체");
  const handleCategoryChange = (category: ProductCategory) => {
    setActiveCategory(category);
  };

  const filteredProducts =
    activeCategory === "전체"
      ? ProductList
      : ProductList.filter((p) => p.category === activeCategory);

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
      <S.ProductList>
        {filteredProducts.map((product) => (
          <S.Product>
            <S.Img
              src={product.defaultImg}
              alt={product.productName}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = product.hoverImg;
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = product.defaultImg;
              }}
            />
            <S.Name>{product.productName}</S.Name>
            <S.Price>{product.price}원</S.Price>
          </S.Product>
        ))}
      </S.ProductList>
    </S.Container>
  );
}
