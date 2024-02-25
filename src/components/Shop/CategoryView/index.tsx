import React from "react";
import * as S from "@/styles/shop/index.styles";
import ItemElementProps from "@/interface/itemElement";
import ItemElement from "@/components/ItemElement";
import useShop from "@/hooks/useShop";
import Category from "@/interface/category";
import Head from "next/head";

interface CategoryViewProps {
  activeCategory: string;
  activeCategoryId: Category | undefined;
}
export default function CategoryView({
  activeCategory,
  activeCategoryId,
}: CategoryViewProps) {
  const { productData, eventData } = useShop();

  if (activeCategory === "전체") {
    return (
      <S.ProductList>
        {productData?.data.content.map((item: ItemElementProps) => (
          <ItemElement
            key={item.id}
            mainThumbnail={item.mainThumbnail}
            subThumbnail={item.subThumbnail}
            name={item.name}
            price={item.price}
            discountPrice={item.discountPrice}
            id={item.id}
            isEvent={!!item.eventId}
          />
        ))}
      </S.ProductList>
    );
  }
  if (activeCategory === "이벤트") {
    return (
      <S.ProductList>
        {eventData?.data.map((item: ItemElementProps) => (
          <ItemElement
            key={item.productId}
            mainThumbnail={item.mainThumbnail}
            subThumbnail={item.subThumbnail}
            name={item.name}
            price={item.price}
            discountPrice={0}
            id={item.productId}
            isEvent={!!item.eventId}
          />
        ))}
      </S.ProductList>
    );
  }
  const filteredProducts = productData?.data.content.filter(
    (item: ItemElementProps) => item.categoryId === activeCategoryId?.id,
  );
  if (filteredProducts?.length === 0) {
    return (
      <S.ProductList>
        <S.NOPRODUCT>
          제품 준비 중이에요. 빠른 시일 내로 준비해서 찾아뵐게요! 🙇🏻
        </S.NOPRODUCT>
      </S.ProductList>
    );
  }
  return (
    <S.ProductList>
      <Head>
        <title>레코디 슬로우 {activeCategory}</title>
        <meta
          name="description"
          content={filteredProducts
            ?.map((item: ItemElementProps) => item.name)
            .join(",")}
        />
        <meta
          name="keywords"
          content={filteredProducts
            ?.map((item: ItemElementProps) => item.name)
            .join(",")}
        />
      </Head>
      {filteredProducts?.map((item: ItemElementProps) => (
        <ItemElement
          key={item.id}
          mainThumbnail={item.mainThumbnail}
          subThumbnail={item.subThumbnail}
          name={item.name}
          price={item.price}
          discountPrice={item.discountPrice}
          id={item.id}
          isEvent={!!item.eventId}
        />
      ))}
    </S.ProductList>
  );
}
