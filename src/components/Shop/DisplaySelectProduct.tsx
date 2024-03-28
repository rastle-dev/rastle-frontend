import React from "react";
import useShop from "@/hooks/useShop";
import ItemElement from "@/components/ItemElement";
import ItemElementProps from "@/interface/itemElement";
import { ProductList } from "@/styles/cody/index.styles";

interface Id {
  id: number;
}

export default function DisplaySelectProduct({ id }: Id) {
  const { useLoadSelectBundle } = useShop();
  const { data: bundleSelectData } = useLoadSelectBundle(id);
  return (
    <ProductList>
      {bundleSelectData?.data.map((item: ItemElementProps) => (
        <ItemElement
          key={item.id}
          mainThumbnail={item.mainThumbnail}
          subThumbnail={item.subThumbnail}
          name={item.name}
          productName={item.productName}
          price={item.price}
          discountPrice={item.discountPrice}
          id={item.id}
          isEvent={item.isEvent}
        />
      ))}
    </ProductList>
  );
}
