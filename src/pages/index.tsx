import React, { useEffect } from "react";
import ItemElement from "@/components/ItemElement";
import * as S from "@/styles/index/index.styles";
import { dehydrate, QueryClient, useQueryClient } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadEventProductPaging, loadMarketProductPaging } from "@/api/shop";
import LazyLink from "@/components/LazyLink";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/dist/client/router";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([QUERYKEYS.LOAD_PRODUCT_PAGING], () =>
    loadMarketProductPaging({ page: 0, size: 4 }),
  );
  await queryClient.prefetchQuery([QUERYKEYS.LOAD_EVENTPRODUCT_PAGING], () =>
    loadEventProductPaging({ size: 4 }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10, // Set the revalidate time in seconds
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
  const queryClient = useQueryClient();
  const router = useRouter();
  const productData = queryClient.getQueryData([QUERYKEYS.LOAD_PRODUCT_PAGING]);
  const eventProductData = queryClient.getQueryData([
    QUERYKEYS.LOAD_EVENTPRODUCT_PAGING,
  ]);
  useEffect(() => {
    const currentPath = router.asPath;
    if (currentPath === "/?social=true") {
      localStorage.setItem("loginType", "social");
      mutateSocialLogin.mutate();
    }
  }, []);
  return (
    <S.StyledHome>
      <TopLayer />
      {productData !== undefined && <ProductLayer productData={productData} />}
      {eventProductData !== undefined && (
        <EventProductLayer productData={eventProductData} />
      )}
    </S.StyledHome>
  );
}
