import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import COLORS from "@/constants/color";
import PATH from "@/constants/path";
import ItemElementProps from "@/interface/itemElement";
import Image from "next/image";
import CountDownTimer from "@/components/Event/CountDownTimer";

const ItemWrapper = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  display: inline-block;
`;

const EventInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7); /* 반투명 빨간 배경 */
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 1;
  margin-bottom: 0.45rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  aspect-ratio: 0.77; /* width의 1.25배에 해당하는 비율로 height 설정 */
  cursor: pointer;
`;

const ItemName = styled.div`
  font-size: 1.5rem;
  padding-top: 1rem;
  font-weight: 400;
  width: 100%;
  cursor: pointer;
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
  startDate,
  endDate,
}: ItemElementProps) {
  const router = useRouter();
  const productId = id;
  const [thumbnailSrc, setThumbnailSrc] = useState(mainThumbnail);
  const [isMobile, setIsMobile] = useState(false);

  const handleMouseEnter = () => {
    if (typeof subThumbnail === "string") {
      setThumbnailSrc(subThumbnail);
    }
  };

  const handleMouseLeave = () => {
    setThumbnailSrc(mainThumbnail);
  };

  const handleClick = () => {
    const pathname = isEvent ? PATH.EVENT : PATH.PRODUCT;
    router.push({
      pathname,
      query: { productId },
    });
  };

  const [tapCount, setTapCount] = useState(0);
  useEffect(() => {
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  const handleTap = () => {
    setTapCount(tapCount + 1);

    if (tapCount === 0) {
      if (typeof subThumbnail === "string") {
        setThumbnailSrc(subThumbnail);
      }
    } else if (tapCount === 1) {
      // 두 번째 탭부터 페이지 이동
      handleClick();
    }
  };

  return (
    <ItemWrapper>
      <ImageContainer>
        {isEvent && (
          <EventInfo>
            <CountDownTimer endDate={endDate} startDate={startDate} />
          </EventInfo>
        )}
        <StyledImage
          src={thumbnailSrc}
          alt={name}
          width={500}
          height={500}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTap}
          onClick={isMobile ? () => {} : handleClick}
        />
      </ImageContainer>
      <ItemName onClick={isMobile ? () => {} : handleClick}>{name}</ItemName>
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
