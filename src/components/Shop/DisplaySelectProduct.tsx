import React from "react";
import useShop from "@/hooks/useShop";
import ItemElement from "@/components/ItemElement";
import * as S from "@/styles/shop/index.styles";
import ItemElementProps from "@/interface/itemElement";

interface Id {
  id: number;
}

export default function DisplaySelectProduct({ id }: Id) {
  const { useLoadSelectBundle } = useShop();
  const { data: bundleSelectData } = useLoadSelectBundle(id);
  return (
    <S.ProductList>
      {bundleSelectData?.data.map((item: ItemElementProps) => (
        <ItemElement
          key={item.id}
          mainThumbnail={item.mainThumbnail}
          subThumbnail={item.subThumbnail}
          name={item.name}
          price={item.price}
          discountPrice={item.discountPrice}
          id={item.id}
          isEvent={item.isEvent}
        />
      ))}
    </S.ProductList>
  );
}
