import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Button from "@/components/common/Button";
import ItemElement from "@/components/ItemElement";
import COLORS from "@/constants/color";

const StyledHome = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

/** TopLayer 컴포넌트 스타일링*/
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* 변경된 부분 */
`;

const DesktopImage = styled(Image)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileImage = styled(Image)`
  display: none;

  @media (max-width: 768px) {
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 50rem;
    object-fit: cover;
  }
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 1.5rem;
  font-weight: 200;
`;

const TextInstagram = styled.span`
  font-size: 1.375rem;
  font-weight: 600;
  padding: 0.5rem 0rem 0rem 0rem;
`;

export const StyledButton = styled(Button)`
  margin-top: 3.25rem;
  font-size: 1.5rem;
  font-weight: 200;
  background-color: rgba(0, 0, 0, 0.15);
  height: 3.125rem;
  color: white;
  border-radius: 3px;
  border: none;
`;

/** ShopLayer 컴포넌트 스타일링 */
const ShopWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //padding: 0rem 4.3rem 0 4.3rem;
  padding: 0rem 4.3rem 0 4.3rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ShopTitle = styled.div`
  font-size: 2.5rem;
  padding: 9.63rem 0 7.75rem 0;
  font-weight: 200;

  span {
    color: ${COLORS.RED};
    font-weight: 700;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 2%;
  padding-bottom: 6rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1%;
    //justify-content: center;
    width: 100%;
  }
`;
const ViewMore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;

  span {
    font-size: 1.875rem;
    font-weight: 200;
    cursor: pointer;

    &:hover {
      font-weight: 500;
    }
  }
`;
const StyledBorderLine = styled.div`
  margin-top: 2rem;
  border: 0.3px solid ${COLORS.GREY["300"]};
  width: 100%;
`;

/** 홈화면의 첫 화면 : 전체 화면의 이미지와 버튼 */
function TopLayer() {
  return (
    <ImageWrapper>
      <DesktopImage
        src="/image/homeDesktop2.jpg"
        alt="/image/homeDesktop2.jpg"
        layout="fill"
        objectFit="cover"
      />
      <MobileImage
        src="/image/homeMobile1.jpg"
        alt="/image/homeMobile1.jpg"
        layout="fill"
        objectFit="cover"
      />
      <TextWrapper>
        <Text>레슬(rastle) : (악, 어려움 등에) 전력을 다하다</Text>
        <TextInstagram>@rastle_fashion</TextInstagram>
        <StyledButton title="view more" width="10rem" />
      </TextWrapper>
    </ImageWrapper>
  );
}

function ShopLayer() {
  const items = [
    {
      imageUrl: "/image/homeMobile1.jpg",
      itemName: "틴 워시드 버뮤다 데님 팬츠",
      price: "45,800원",
    },
    {
      imageUrl: "/image/homeDesktop2.jpg",
      itemName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
      price: "53,400원",
    },
    {
      imageUrl: "/image/homeMobile1.jpg",
      itemName: "스토퍼 윈드브레이커",
      price: "34,200원",
    },
    {
      imageUrl: "/image/homeMobile1.jpg",
      itemName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
      price: "53,400원",
    },

    // Add more items as needed
  ];

  return (
    <ShopWrapper>
      <ShopTitle>1차 마켓 오픈 (8.12 ~ 8.15)</ShopTitle>
      <ItemContainer>
        {items.map((item) => (
          <ItemElement
            key={item.itemName}
            imageUrl={item.imageUrl}
            itemName={item.itemName}
            // event={item.event}
            price={item.price}
          />
        ))}
      </ItemContainer>
      <ViewMore>
        <span>더 많은 상품 보러가기</span>
      </ViewMore>
      <StyledBorderLine />
    </ShopWrapper>
  );
}

function EventLayer() {
  const items = [
    {
      imageUrl: "/image/homeMobile1.jpg",
      itemName: "틴 워시드 버뮤다 데님 팬츠",
      event: "EVENT!!",
      price: "45,800원",
    },
    {
      imageUrl: "/image/homeDesktop2.jpg",
      itemName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
      event: "EVENT!!",
      price: "53,400원",
    },
    {
      imageUrl: "/image/homeMobile1.jpg",
      itemName: "스토퍼 윈드브레이커",
      event: "EVENT!!",
      price: "34,200원",
    },
    {
      imageUrl: "/image/homeMobile1.jpg",
      itemName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
      event: "EVENT!!",
      price: "53,400원",
    },

    // Add more items as needed
  ];

  return (
    <ShopWrapper>
      <ShopTitle>
        회원가입하고 <span>EVENT</span> 참여 !!
      </ShopTitle>
      <ItemContainer>
        {items.map((item) => (
          <ItemElement
            key={item.itemName}
            imageUrl={item.imageUrl}
            itemName={item.itemName}
            event={item.event}
            price={item.price}
          />
        ))}
      </ItemContainer>
      <ViewMore>
        <span>더 많은 상품 보러가기</span>
      </ViewMore>
    </ShopWrapper>
  );
}

export default function Home() {
  return (
    <StyledHome>
      <TopLayer />
      <ShopLayer />
      <EventLayer />
    </StyledHome>
  );
}
