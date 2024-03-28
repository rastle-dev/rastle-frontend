import React from "react";
import * as S from "@/styles/shop/index.styles";
import ItemElementProps from "@/interface/itemElement";
import ItemElement from "@/components/ItemElement";
import useShop from "@/hooks/useShop";
import Category from "@/interface/category";
import Head from "next/head";
import Icon from "@/components/Common/Icon";
import COLORS from "@/constants/color";

interface CategoryViewProps {
  activeCategory: string;
  activeCategoryId: Category | undefined;
}
export default function CategoryView({
  activeCategory,
  activeCategoryId,
}: CategoryViewProps) {
  const {
    productData,
    eventData,
    selectedFilter,
    handleFilterClick,
    filterButtons,
    bestProductData,
  } = useShop();

  if (activeCategory === "전체") {
    // 선택된 필터 버튼에 따라 데이터를 필터링
    const filteredProducts =
      (selectedFilter === "BEST" ? bestProductData : productData)?.data
        .content || [];

    return (
      <>
        <S.FilterBox>
          {filterButtons.map((menu) => (
            <S.FilterButton
              key={menu}
              onClick={() => handleFilterClick(menu)} // 클릭 이벤트 핸들러를 추가
              isSelected={selectedFilter === menu} // 선택된 버튼인지 여부에 따라 스타일을 변경하기 위한 속성 추가
            >
              {selectedFilter === menu && (
                <Icon
                  iconName="check"
                  iconSize="1.5rem"
                  border={0.07}
                  color={selectedFilter ? COLORS.BLACK : COLORS.GREY[400]}
                />
              )}
              <p>{menu}</p>
            </S.FilterButton>
          ))}
        </S.FilterBox>
        <S.ProductList>
          {filteredProducts.map((item: ItemElementProps) => {
            // 만약 price와 discountPrice가 같으면 discountPrice 필드를 없애고, 그렇지 않으면 그대로 유지
            const finalDiscountPrice =
              item.price === item.discountPrice
                ? undefined
                : item.discountPrice;

            return (
              <ItemElement
                key={item.id}
                mainThumbnail={item.mainThumbnail}
                subThumbnail={item.subThumbnail}
                productName={item.productName}
                name={item.name}
                price={item.price}
                discountPrice={finalDiscountPrice}
                id={item.id}
                isEvent={!!item.eventId}
              />
            );
          })}
        </S.ProductList>
      </>
    );
  }

  if (activeCategory === "이벤트") {
    return (
      <>
        <S.Blank />
        <S.ProductList>
          <Head>
            <title>{activeCategory} | RECORDY SLOW</title>
          </Head>
          {eventData?.data.map((item: ItemElementProps) => {
            // 만약 price와 discountPrice가 같으면 discountPrice 필드를 없애고, 그렇지 않으면 그대로 유지
            const finalDiscountPrice =
              item.price === item.discountPrice
                ? undefined
                : item.discountPrice;

            return (
              <ItemElement
                key={item.productId}
                mainThumbnail={item.mainThumbnail}
                subThumbnail={item.subThumbnail}
                name={item.productName}
                productName={item.productName}
                price={item.price}
                discountPrice={finalDiscountPrice}
                id={item.productId}
                isEvent={!!item.eventId}
              />
            );
          })}
        </S.ProductList>
      </>
    );
  }

  const filteredProducts = (
    (selectedFilter === "BEST" ? bestProductData : productData)?.data.content ||
    []
  ).filter(
    (item: ItemElementProps) => item.categoryId === activeCategoryId?.id,
  );

  if (filteredProducts.length === 0) {
    return (
      <S.ProductList>
        <Head>
          <title>{activeCategory} | RECORDY SLOW</title>
        </Head>
        <S.NOPRODUCT>
          제품 준비 중이에요. 빠른 시일 내로 준비해서 찾아뵐게요! 🙇🏻
        </S.NOPRODUCT>
      </S.ProductList>
    );
  }

  return (
    <>
      <Head>
        <title>{activeCategory} | RECORDY SLOW</title>
        <meta
          name="description"
          content={filteredProducts
            ?.map((item: ItemElementProps) => item.name)
            .join(",")}
        />
        <meta
          name="keywords"
          content={filteredProducts
            ?.map((item: ItemElementProps) => item.name)
            .join(",")}
        />
      </Head>
      <S.FilterBox>
        {filterButtons.map((menu) => (
          <S.FilterButton
            key={menu}
            onClick={() => handleFilterClick(menu)}
            isSelected={selectedFilter === menu}
          >
            {selectedFilter === menu && (
              <Icon
                iconName="check"
                iconSize="1.5rem"
                border={0.07}
                color={selectedFilter ? COLORS.BLACK : COLORS.GREY[400]}
              />
            )}
            <p>{menu}</p>
          </S.FilterButton>
        ))}
      </S.FilterBox>
      <S.ProductList>
        {filteredProducts.map((item: ItemElementProps) => {
          // 만약 price와 discountPrice가 같으면 discountPrice 필드를 없애고, 그렇지 않으면 그대로 유지
          const finalDiscountPrice =
            item.price === item.discountPrice ? undefined : item.discountPrice;

          return (
            <ItemElement
              key={item.id}
              mainThumbnail={item.mainThumbnail}
              subThumbnail={item.subThumbnail}
              name={item.name}
              productName={item.productName}
              price={item.price}
              discountPrice={finalDiscountPrice}
              id={item.id}
              isEvent={!!item.eventId}
            />
          );
        })}
      </S.ProductList>
    </>
  );
}
