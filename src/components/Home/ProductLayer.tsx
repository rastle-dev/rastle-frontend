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
        {productData?.data.content.map((item: ItemElementProps) => {
          // 만약 price와 discountPrice가 같으면 discountPrice 필드를 없애고, 그렇지 않으면 그대로 유지
          const finalDiscountPrice =
            item.price === item.discountPrice ? undefined : item.discountPrice;

          return (
            <ItemElement
              key={item.id}
              mainThumbnail={item.mainThumbnail}
              subThumbnail={item.subThumbnail}
              name={item.name}
              price={item.price}
              productName={item.productName}
              discountPrice={finalDiscountPrice}
              id={item.id}
              categoryId={item.categoryId}
              isEvent={!!item.eventId}
            />
          );
        })}
      </S.ItemContainer>
      <S.ViewMore>
        <LazyLink href="/shop" title="레코디슬로우 전체 상품 페이지">
          더 많은 상품 보러가기
        </LazyLink>
      </S.ViewMore>
    </S.ProductWrapper>
  );
}
export default ProductLayer;
