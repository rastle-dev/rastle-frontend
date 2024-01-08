import React from "react";
import * as S from "@/styles/shop/index.styles";
import ItemElementProps from "@/interface/itemElement";
import ItemElement from "@/components/ItemElement";
import useShop from "@/hooks/useShop";
import Category from "@/interface/category";

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
    console.log("이벤트", eventData);
    console.log("hi");
    return (
      <S.ProductList>
        {eventData?.data.map((item: ItemElementProps) => (
          <ItemElement
            key={item.id}
            mainThumbnail={item.mainThumbnail}
            subThumbnail={item.subThumbnail}
            name={item.name}
            price={item.price}
            discountPrice={0}
            id={item.id}
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
