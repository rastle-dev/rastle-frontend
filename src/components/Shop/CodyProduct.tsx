import React, { useEffect } from "react";
import Pagination from "react-js-pagination";
import * as S from "@/styles/shop/index.styles";
import SwiperComponent from "@/components/Shop/codySwiper";
import useShop from "@/hooks/useShop";
import { PageNumberContainer } from "@/components/Manager/UserManagement";

export default function CodyProduct() {
  const { useLoadBundle, ITEM_SIZE, curPage, onChangePage } = useShop();
  const { data: bundleData, refetch } = useLoadBundle({
    page: curPage - 1,
    size: ITEM_SIZE,
  });

  console.log("bundleData", bundleData);
  useEffect(() => {
    refetch();
    console.log("refetch");
  }, [curPage, bundleData]);
  return (
    <>
      {bundleData?.data.content.map((item: any, idx: number) => (
        <S.CurrentMarketWrapper>
          <S.FirstMarketDescription>
            RECODY {idx + 1}: {item.name}
          </S.FirstMarketDescription>
          <SwiperComponent imgUrls={item.imageUrls} />
          <h2>제품 정보</h2>
        </S.CurrentMarketWrapper>
      ))}

      <S.ProductList>
        {/* {productData?.data.content.map((item: any) => ( */}
        {/*  <ItemElement */}
        {/*    key={item.productName} */}
        {/*    defaultImg={item.mainThumbnail} */}
        {/*    hoverImg={item.subThumbnail} */}
        {/*    productName={item.productName} */}
        {/*    price={item.price} */}
        {/*    category={item.category} */}
        {/*  /> */}
        {/* ))} */}
        {/* // 세트 상품이면 세트상품 띄워야돼 */}
      </S.ProductList>
      <PageNumberContainer>
        <Pagination
          activePage={curPage}
          itemsCountPerPage={ITEM_SIZE}
          totalItemsCount={bundleData?.data.totalElements || 1}
          pageRangeDisplayed={5}
          onChange={onChangePage}
        />
      </PageNumberContainer>
    </>
  );
}
