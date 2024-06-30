import React from "react";
import * as S from "@/styles/index/index.styles";
import LazyLink from "@/components/LazyLink";
import ItemElement from "@/components/ItemElement";
import ItemElementProps from "@/interface/itemElement";

interface EventData {
  data: ItemElementProps[];
}
function EventProductLayer({ eventData }: { eventData: EventData }) {
  return (
    <S.ProductWrapper>
      <S.ProductTitle>
        회원가입하고 <span>EVENT</span> 참여 !!
      </S.ProductTitle>
      <S.ItemContainer>
        {eventData?.data?.map((item: ItemElementProps) => (
          <ItemElement
            key={item.productId}
            mainThumbnail={item.mainThumbnail}
            subThumbnail={item.subThumbnail}
            name={item.productName}
            productName={item.productName}
            price={item.price}
            discountPrice={item.discountPrice}
            id={item.productId}
            categoryId={item.categoryId}
            fromHomeEvent
          />
        ))}
      </S.ItemContainer>
      <S.ViewMore>
        <LazyLink href="/shop?tab=이벤트" title="레코디슬로우 전체 상품 페이지">
          {">"} 이벤트 상품 더보기
        </LazyLink>
      </S.ViewMore>
    </S.ProductWrapper>
  );
}

export default EventProductLayer;
