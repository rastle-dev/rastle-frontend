import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import COLORS from "@/constants/color";
import PATH from "@/constants/path";

type ProductCategory = "전체" | "1차 마켓" | "이전 마켓" | "이벤트";
type ItemElementProps = {
  defaultImg: string;
  hoverImg?: string;
  productName: string;
  price: string;
  category?: ProductCategory;
};

const ItemWrapper = styled.div`
  width: 100%;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 0.77; /* width의 1.25배에 해당하는 비율로 height 설정 */
`;

const ItemName = styled.div`
  font-size: 1.5rem;
  padding-top: 1rem;
  font-weight: 200;
  width: 100%;
`;

const Event = styled.div`
  font-size: 1.5rem;
  padding-top: 1rem;
  color: ${COLORS.RED};
  font-weight: 300;
`;

const Price = styled.div`
  font-size: 1.5rem;
  padding-top: 1rem;
  font-weight: 600;
`;

function ItemElement({
  defaultImg,
  productName,
  price,
  hoverImg,
  category,
}: ItemElementProps) {
  const router = useRouter();

  return (
    <ItemWrapper>
      <StyledImage
        src={defaultImg}
        alt={defaultImg}
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (typeof hoverImg === "string") {
            target.src = hoverImg;
          }
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.src = defaultImg;
        }}
        onClick={() => {
          router.push(PATH.PRODUCT);
        }}
      />
      <ItemName>{productName}</ItemName>
      {category === "이벤트" && <Event>EVENT!! </Event>}
      <Price>{price}</Price>
    </ItemWrapper>
  );
}

export default ItemElement;
