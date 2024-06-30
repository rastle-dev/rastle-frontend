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
  background: rgba(0, 0, 0, 0.7);
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

const SoldOutInfo = styled.div`
  position: absolute;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  z-index: 1;
  margin-top: 48%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledImage = styled(Image)<{
  remainingTime: number | undefined;
  soldOut: boolean | undefined;
}>`
  width: 100%;
  height: auto;
  aspect-ratio: 0.77; /* width의 1.25배에 해당하는 비율로 height 설정 */
  cursor: pointer;
  filter: ${({ remainingTime, soldOut }) => {
    if (remainingTime === 0 || soldOut === true) {
      return "brightness(0.5)";
    }
    return "brightness(1)";
  }};
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
  soldOut,
  fromHomeEvent,
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
    const pathname = isEvent || fromHomeEvent ? PATH.EVENT : PATH.PRODUCT;
    router.push({
      pathname,
      query: { productId },
    });
  };

  const [remainingTime, setRemainingTime] = useState<number | undefined>(
    undefined,
  );

  const handleTimeUpdate = (time: number | undefined) => {
    setRemainingTime(time);
  };

  useEffect(() => {
    // 페이지 로드 시 초기값을 설정하기 위해 타이머 업데이트
    const now = new Date().getTime();
    const eventEndDate = endDate ? new Date(endDate).getTime() : now + 1000;
    const timeLeft = eventEndDate - now;
    if (timeLeft > 0) {
      setRemainingTime(Math.floor(timeLeft / 1000)); // 초 단위로 설정
    } else {
      setRemainingTime(0); // 이벤트 종료 시 밝기 0.5로 설정
    }
  }, [endDate]);

  const [tapCount, setTapCount] = useState(0);
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
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
            <CountDownTimer
              endDate={endDate}
              startDate={startDate}
              onTimeUpdate={handleTimeUpdate}
            />
          </EventInfo>
        )}
        {soldOut && (
          <SoldOutInfo onClick={handleClick}>
            <p>SOLD OUT</p>
          </SoldOutInfo>
        )}
        <StyledImage
          src={thumbnailSrc}
          alt={name}
          width={500}
          height={500}
          onClick={handleClick}
          onMouseEnter={isMobile ? undefined : handleMouseEnter}
          onMouseLeave={isMobile ? undefined : handleMouseLeave}
          onTouchStart={isMobile ? undefined : handleTap}
          remainingTime={remainingTime}
          soldOut={soldOut}
        />
      </ImageContainer>
      <ItemName onClick={handleClick}>{name}</ItemName>
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
