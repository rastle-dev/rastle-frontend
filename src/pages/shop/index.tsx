import React, { useState } from "react";
import ProductCategoryTabs from "@/components/Shop/CategoryTab";
import ItemElement from "@/components/ItemElement";
import * as S from "@/styles/shop/index.styles";
import SwiperComponent from "@/components/Shop/codySwiper";

type ProductCategory = "전체" | "1차 마켓" | "이전 마켓" | "이벤트";

type ProductItem = {
  category: ProductCategory;
  productName: string;
  price: string;
  defaultImg: string;
  hoverImg: string;
};

const ProductList: ProductItem[] = [
  {
    category: "1차 마켓",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: "45,800원",
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
  {
    category: "1차 마켓",
    productName: "트랙 샌딩 워시드 와이드 흑청 데님 틴 워시드 버뮤다 데님 팬츠",
    price: "45,800원",
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
  {
    category: "이전 마켓",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: "45,800원",
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
  {
    category: "이벤트",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: "0원",
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
  {
    category: "이벤트",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: "0원",
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
  {
    category: "이벤트",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: "0원",
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
  {
    category: "이벤트",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: "0원",
    defaultImg: "/example_1.png",
    hoverImg: "/example_2.png",
  },
];
export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("전체");
  const handleCategoryChange = (category: ProductCategory) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      {activeCategory === "1차 마켓" && (
        <S.CurrentMarketWrapper>
          <S.FirstMarketDescription>
            1차 마켓 : 캐주얼한 꾸안꾸 🤘
          </S.FirstMarketDescription>
          <SwiperComponent />
          <h2>제품 정보</h2>
        </S.CurrentMarketWrapper>
      )}
      <S.ProductList>
        {filteredProducts.map((item) => (
          <ItemElement
            key={item.productName}
            defaultImg={item.defaultImg}
            hoverImg={item.hoverImg}
            productName={item.productName}
            price={item.price}
            category={item.category}
          />
        ))}
      </S.ProductList>
    </S.Container>
  );
}
