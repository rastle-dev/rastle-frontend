import React, { useEffect } from "react";
import ItemElement from "@/components/ItemElement";
import * as S from "@/styles/index/index.styles";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadEventProductPaging, loadMarketProductPaging } from "@/api/shop";
import LazyLink from "@/components/LazyLink";
import useLogin from "@/hooks/useLogin";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([QUERYKEYS.LOAD_PRODUCT], () =>
    loadMarketProductPaging({ size: 4, visible: true }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

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
        <S.Text>코디로 이해시키는 제품의 가치 </S.Text>
        <S.Text2>RECORDY SLOW</S.Text2>
        <S.StyledButton title="view more" width="10rem" />
      </S.TextWrapper>
    </S.ImageWrapper>
  );
}

function ProductLayer({ productData }: any) {
  return (
    <S.ProductWrapper>
      <S.ProductTitle>신상품 업데이트 🔥</S.ProductTitle>
      <S.ItemContainer>
        {productData?.data.content.map((item: any) => (
          <ItemElement
            key={item.id}
            defaultImg={item.mainThumbnail}
            hoverImg={item.subThumbnail}
            productName={item.name}
            price={item.price}
            discountPrice={item.discountPrice}
            id={item.id}
            category={item.categoryId}
            isEvent={!!item.eventId}
          />
        ))}
      </S.ItemContainer>
      <S.ViewMore>
        <LazyLink href="/shop">더 많은 상품 보러가기</LazyLink>
      </S.ViewMore>
    </S.ProductWrapper>
  );
}

function EventProductLayer({ productData }: any) {
  return (
    <S.ProductWrapper>
      <S.ProductTitle>
        회원가입하고 <span>EVENT</span> 참여 !!
      </S.ProductTitle>
      <S.ItemContainer>
        {productData?.data.map((item: any) => (
          <ItemElement
            key={item.id}
            defaultImg={item.mainThumbnail}
            hoverImg={item.subThumbnail}
            productName={item.eventName}
            price={item.price}
            discountPrice={item.discountPrice}
            id={item.id}
            category={item.categoryId}
            isEvent={!!item.eventId}
          />
        ))}
      </S.ItemContainer>
      <S.ViewMore>
        <LazyLink href="/shop">더 많은 이벤트 상품 보러가기</LazyLink>
      </S.ViewMore>
      <S.StyledBorderLine />
    </S.ProductWrapper>
  );
}
export default function Home() {
  const { mutateSocialLogin } = useLogin();

  const { data: productData, status: productStatus } = useQuery(
    [QUERYKEYS.LOAD_PRODUCT],
    () => loadMarketProductPaging({ size: 4, visible: true }),
  );

  const { data: eventProductData, status: eventProductStatus } = useQuery(
    [QUERYKEYS.LOAD_EVENTPRODUCT],
    () => loadEventProductPaging({ size: 4, visible: true }),
  );
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authCode = searchParams.get("social");
    if (authCode === "true") {
      console.log("hi");
      mutateSocialLogin.mutate();
    }
  }, []);
  return (
    <S.StyledHome>
      <TopLayer />
      {productStatus === "success" && productData !== undefined && (
        <ProductLayer productData={productData} />
      )}
      {eventProductStatus === "success" && eventProductData !== undefined && (
        <EventProductLayer productData={eventProductData} />
      )}
    </S.StyledHome>
  );
}
