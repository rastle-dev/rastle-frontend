import React from "react";
import ItemElement from "@/components/ItemElement";
import * as S from "./index.styles";

/** 홈화면의 첫 화면 : 전체 화면의 이미지와 버튼 */
function TopLayer() {
  return (
    <S.ImageWrapper>
      <S.DesktopImage
        src="/image/homeDesktop2.jpg"
        alt="/image/homeDesktop2.jpg"
        layout="fill"
        objectFit="cover"
      />
      <S.MobileImage
        src="/image/homeMobile1.jpg"
        alt="/image/homeMobile1.jpg"
        layout="fill"
        objectFit="cover"
      />
      <S.TextWrapper>
        <S.Text>레슬(rastle) : (악, 어려움 등에) 전력을 다하다</S.Text>
        <S.TextInstagram>@rastle_fashion</S.TextInstagram>
        <S.StyledButton title="view more" width="10rem" />
      </S.TextWrapper>
    </S.ImageWrapper>
  );
}

type ProductItem = {
  imageUrl: string;
  itemName: string;
  event?: string;
  price: string;
};

type ProductLayerProps = {
  items: ProductItem[];
  type: ProductType;
};

type ProductType = "shop" | "event";

function ProductLayer({ items, type }: ProductLayerProps) {
  return (
    <S.ProductWrapper>
      {type === "event" ? (
        <S.ProductTitle>
          회원가입하고 <span>EVENT</span> 참여 !!
        </S.ProductTitle>
      ) : (
        <S.ProductTitle>1차 마켓 오픈 (8.12 ~ 8.15)</S.ProductTitle>
      )}
      <S.ItemContainer>
        {items.map((item) => (
          <ItemElement
            key={item.itemName}
            imageUrl={item.imageUrl}
            itemName={item.itemName}
            event={item.event}
            price={item.price}
          />
        ))}
      </S.ItemContainer>
      <S.ViewMore>
        <span>더 많은 상품 보러가기</span>
      </S.ViewMore>
      {type === "event" ? "" : <S.StyledBorderLine />}
    </S.ProductWrapper>
  );
}

export default function Home() {
  const shopItems = [
    {
      imageUrl: "/image/product1.jpg",
      itemName: "틴 워시드 버뮤다 데님 팬츠",
      price: "45,800원",
    },
    {
      imageUrl: "/image/product2.jpg",
      itemName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
      price: "53,400원",
    },
    {
      imageUrl: "/image/product3.jpg",
      itemName: "스토퍼 윈드브레이커",
      price: "34,200원",
    },
    {
      imageUrl: "/image/product4.jpg",
      itemName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
      price: "53,400원",
    },
  ];

  const eventItems = [
    {
      imageUrl: "/image/product5.jpg",
      itemName: "틴 워시드 버뮤다 데님 팬츠",
      event: "EVENT!!",
      price: "0원",
    },
    {
      imageUrl: "/image/product6.jpg",
      itemName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
      event: "EVENT!!",
      price: "0원",
    },
    {
      imageUrl: "/image/homeMobile1.jpg",
      itemName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
      event: "EVENT!!",
      price: "0원",
    },
  ];
  return (
    <S.StyledHome>
      <TopLayer />
      <ProductLayer items={shopItems} type="shop" />
      <ProductLayer items={eventItems} type="event" />
    </S.StyledHome>
  );
}
