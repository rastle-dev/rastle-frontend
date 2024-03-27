import React from "react";
import useShop from "@/hooks/useShop";
import ItemElement from "@/components/ItemElement";
import * as S from "@/styles/shop/index.styles";
import ItemElementProps from "@/interface/itemElement";
import styled from "styled-components";
import media from "@/styles/media";

interface Id {
  id: number;
}
const ProductList = styled.div`
  display: grid;
  width: 88%;
  justify-content: center;
  align-content: center;
  grid-template-columns: repeat(2, 1fr);
  ${media.xsmall} {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2.5rem;
    width: 95%;
  }
  ${media.small} {
    //grid-template-columns: repeat(auto-fill, minmax(30%, auto));
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2.5rem;
    width: 90%;
  }

  //padding-top: 4.8rem;
  column-gap: 1%;
  row-gap: 2rem;
`;
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
