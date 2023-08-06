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

export type ProductCategory = "전체" | "1차 마켓" | "이전 마켓" | "이벤트";

type ProductItem = {
  defaultImg: string;
  hoverImg?: string;
  productName: string;
  price: string;
  category?: ProductCategory;
};

type ProductLayerProps = {
  items: ProductItem[];
};

function ProductLayer({ items }: ProductLayerProps) {
  const type = items.some((item) => item.category === "이벤트")
    ? "event"
    : "shop";
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
            key={item.productName}
            defaultImg={item.defaultImg}
            hoverImg={item.hoverImg}
            productName={item.productName}
            price={item.price}
            category={item.category}
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
  const shopItems: ProductItem[] = [
    {
      category: "1차 마켓",
      defaultImg: "/image/product1.jpg",
      hoverImg: "/image/product5.jpg",
      productName: "틴 워시드 버뮤다 데님 팬츠",
      price: "45,800원",
    },
    {
      category: "1차 마켓",
      defaultImg: "/image/product2.jpg",
      hoverImg: "/image/product5.jpg",
      productName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
      price: "53,400원",
    },
    {
      category: "1차 마켓",
      defaultImg: "/image/product3.jpg",
      hoverImg: "/image/product5.jpg",
      productName: "스토퍼 윈드브레이커",
      price: "34,200원",
    },
    {
      category: "1차 마켓",
      defaultImg: "/image/product4.jpg",
      hoverImg: "/image/product5.jpg",
      productName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
      price: "53,400원",
    },
  ];

  const eventItems: ProductItem[] = [
    {
      defaultImg: "/image/product5.jpg",
      productName: "틴 워시드 버뮤다 데님 팬츠",
      hoverImg: "/image/product5.jpg",
      price: "0원",
      category: "이벤트",
    },
    {
      defaultImg: "/image/product6.jpg",
      hoverImg: "/image/product5.jpg",
      productName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
      price: "0원",
      category: "이벤트",
    },
    {
      defaultImg: "/image/homeMobile1.jpg",
      hoverImg: "/image/product5.jpg",
      productName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
      price: "0원",
      category: "이벤트",
    },
  ];
  return (
    <S.StyledHome>
      <TopLayer />
      <ProductLayer items={shopItems} />
      <ProductLayer items={eventItems} />
    </S.StyledHome>
  );
}
