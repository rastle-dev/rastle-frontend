import React from "react";
import styled from "styled-components";
import COLORS from "@/constants/color";

type ItemElementProps = {
  imageUrl: string;
  itemName: string;
  event?: string;
  price: string;
};

const ItemContainer = styled.div`
  display: flex;
  width: 24.99%;
  padding-bottom: 2.5rem;

  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 767px) {
    width: 49.5%;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 0.77; /* width의 1.25배에 해당하는 비율로 height 설정 */
`;

const ItemName = styled.span`
  font-size: 1.875rem;
  padding-top: 2.5rem;
  font-weight: 200;
`;

const Event = styled.span`
  color: ${COLORS.RED};
  font-size: 1.875rem;
  font-weight: 300;
  padding-top: 1rem;
`;

const Price = styled.span`
  font-size: 1.875rem;
  padding-top: 1rem;
  font-weight: 600;
`;

function ItemElement({ imageUrl, itemName, event, price }: ItemElementProps) {
  return (
    <ItemContainer>
      <StyledImage src={imageUrl} alt={imageUrl} />
      <ItemName>{itemName}</ItemName>
      {event && <Event>{event}</Event>}
      <Price>{price}</Price>
    </ItemContainer>
  );
}

export default ItemElement;
