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
        {eventData?.data.map((item: ItemElementProps) => (
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
        <LazyLink href="/shop">더 많은 이벤트 상품 보러가기</LazyLink>
      </S.ViewMore>
      <S.StyledBorderLine />
    </S.ProductWrapper>
  );
}

export default EventProductLayer;
