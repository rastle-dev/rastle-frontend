import * as S from "@/styles/index/index.styles";
import ItemElementProps from "@/interface/itemElement";
import ItemElement from "@/components/ItemElement";
import LazyLink from "@/components/LazyLink";
import React, { useEffect, useState } from "react";

interface ProductData {
  data: {
    content: ItemElementProps[];
  };
}
function BestProductLayer({ productData }: { productData: ProductData }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);
  return (
    <S.ProductWrapper>
      <S.BestProductTitle>BEST</S.BestProductTitle>
      <S.ProductDesc>한달동안 가장 많은 사랑을 받은 제품 입니다.</S.ProductDesc>
      <S.BestItemContainer>
        {productData?.data?.content
          .slice(0, isMobile ? 6 : 5)
          .map((item: ItemElementProps) => {
            // 만약 price와 discountPrice가 같으면 discountPrice 필드를 없애고, 그렇지 않으면 그대로 유지
            const finalDiscountPrice =
              item.price === item.discountPrice
                ? undefined
                : item.discountPrice;

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
      </S.BestItemContainer>
      <S.ViewMore>
        <LazyLink href="/shop" title="레코디슬로우 전체 상품 페이지">
          {">"} 베스트 상품 더보기
        </LazyLink>
      </S.ViewMore>
    </S.ProductWrapper>
  );
}
export default BestProductLayer;
