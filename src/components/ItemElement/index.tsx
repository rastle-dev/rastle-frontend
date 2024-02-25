import React from "react";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import COLORS from "@/constants/color";
import PATH from "@/constants/path";
import calculateDiscountPercentAndPrice from "@/utils/calculateDiscountedPrice";
import ItemElementProps from "@/interface/itemElement";
import Image from "next/image";

const ItemWrapper = styled.div`
  width: 100%;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  aspect-ratio: 0.77; /* width의 1.25배에 해당하는 비율로 height 설정 */
`;

const ItemName = styled.div`
  font-size: 1.5rem;
  padding-top: 1rem;
  font-weight: 400;
  width: 100%;
`;

const Event = styled.div`
  font-size: 1.4rem;
  padding-top: 0.5rem;
  color: ${COLORS.레드};
  font-weight: 400;
`;

const Price = styled.div`
  font-size: 1.4rem;
  padding-top: 1rem;
  font-weight: 600;
`;

const DiscountPrice = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: line-through;
  color: ${COLORS.GREY.상세페이지};
  padding-right: 0.5rem;
`;

const DiscountedPrice = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
`;

const PriceDiv = styled.div`
  padding-top: 1rem;
`;
function ItemElement({
  mainThumbnail,
  subThumbnail,
  name,
  price,
  id,
  isEvent,
  discountPrice,
}: ItemElementProps) {
  const router = useRouter();
  const productId = id;
  const events = isEvent;

  let discountPercent;
  let discountedPrice;

  if (discountPrice !== undefined) {
    const result = calculateDiscountPercentAndPrice(price, discountPrice);
    discountPercent = result.discountPercent;
    discountedPrice = result.discountedPrice;
  }
  return (
    <ItemWrapper>
      <StyledImage
        src={mainThumbnail}
        alt={name}
        width={100}
        height={100}
        // blurDataURL={mainThumbnail}
        // placeholder="blur"
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (typeof subThumbnail === "string") {
            target.src = subThumbnail;
          }
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.src = mainThumbnail;
        }}
        onClick={() => {
          if (isEvent) {
            router.push({
              pathname: PATH.EVENT, // 이동할 페이지 경로
              query: { productId, events }, // 전달할 데이터 (id)
            });
          } else {
            router.push({
              pathname: PATH.PRODUCT, // 이동할 페이지 경로
              query: { productId, events }, // 전달할 데이터 (id)
            });
          }
        }}
      />
      <ItemName>{name}</ItemName>
      {discountPrice !== undefined ? (
        <PriceDiv>
          <DiscountPrice>{price.toLocaleString()}원</DiscountPrice>
          <DiscountedPrice>{discountPrice.toLocaleString()}원</DiscountedPrice>
        </PriceDiv>
      ) : (
        <Price>{price.toLocaleString()}원</Price>
      )}
      {isEvent && <Event>EVENT 🔥</Event>}
    </ItemWrapper>
  );
}

export default ItemElement;
