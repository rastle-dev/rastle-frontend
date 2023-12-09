import React, { useEffect } from "react";
import Pagination from "react-js-pagination";
import * as S from "@/styles/shop/index.styles";
import SwiperComponent from "@/components/Shop/codySwiper";
import useShop from "@/hooks/useShop";
import { PageNumberContainer } from "@/components/Manager/UserManagement";
import DisplaySelectProduct from "@/components/Shop/DisplaySelectProduct";

export default function CodyProduct() {
  const { useLoadBundle, ITEM_SIZE, curPage, onChangePage } = useShop();
  const { data: bundleData, refetch } = useLoadBundle({
    page: curPage - 1,
    size: ITEM_SIZE,
  });

  useEffect(() => {
    refetch();
  }, [curPage, bundleData]);
  return (
    <>
      <S.SetBox>
        {bundleData?.data.content.map((item: any, idx: number) => (
          <S.CurrentMarketWrapper>
            <S.FirstMarketDescription>
              RECORDY {idx + 1}: {item.name}
            </S.FirstMarketDescription>
            <SwiperComponent imgUrls={item.imageUrls} />
            <h2>제품 정보</h2>
            {item.id && <DisplaySelectProduct id={item.id} />}
          </S.CurrentMarketWrapper>
        ))}
      </S.SetBox>
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
