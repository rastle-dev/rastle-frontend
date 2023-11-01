import React from "react";
import useShop from "@/hooks/useShop";
import ItemElement from "@/components/ItemElement";
import * as S from "@/styles/shop/index.styles";

export default function DisplaySelectProduct({ id }: any) {
  const { useLoadSelectBundle } = useShop();
  const { data: bundleSelectData } = useLoadSelectBundle(id);
  return (
    <S.ProductList>
      {bundleSelectData?.data.map((item: any) => (
        <ItemElement
          key={item.id}
          defaultImg={item.mainThumbnail}
          hoverImg={item.subThumbnail}
          productName={item.name}
          price={item.price}
          discountPrice={item.discountPrice}
          id={item.id}
          isEvent={item.event}
        />
      ))}
    </S.ProductList>
  );
}
