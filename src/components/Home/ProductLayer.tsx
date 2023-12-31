import * as S from "@/styles/index/index.styles";
import ItemElementProps from "@/interface/itemElement";
import ItemElement from "@/components/ItemElement";
import LazyLink from "@/components/LazyLink";
import React from "react";

interface ProductData {
  data: {
    content: ItemElementProps[];
  };
}
function ProductLayer({ productData }: { productData: ProductData }) {
  return (
    <S.ProductWrapper>
      <S.ProductTitle>신상품 업데이트 🔥</S.ProductTitle>
      <S.ItemContainer>
        {productData?.data.content.map((item: ItemElementProps) => (
          <ItemElement
            key={item.id}
            mainThumbnail={item.mainThumbnail}
            subThumbnail={item.subThumbnail}
            name={item.name}
            price={item.price}
            discountPrice={item.discountPrice}
            id={item.id}
            categoryId={item.categoryId}
            isEvent={!!item.eventId}
          />
        ))}
      </S.ItemContainer>
      <S.ViewMore>
        <LazyLink href="/shop">더 많은 상품 보러가기</LazyLink>
      </S.ViewMore>
    </S.ProductWrapper>
  );
}
export default ProductLayer;
