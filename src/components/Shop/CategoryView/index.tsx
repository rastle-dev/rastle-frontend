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
  } = useShop();

  if (activeCategory === "전체") {
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
          {productData?.data.content.map((item: ItemElementProps) => (
            <ItemElement
              key={item.id}
              mainThumbnail={item.mainThumbnail}
              subThumbnail={item.subThumbnail}
              productName={item.productName}
              name={item.name}
              price={item.price}
              discountPrice={item.discountPrice}
              id={item.id}
              isEvent={!!item.eventId}
            />
          ))}
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
          {eventData?.data.map((item: ItemElementProps) => (
            <ItemElement
              key={item.productId}
              mainThumbnail={item.mainThumbnail}
              subThumbnail={item.subThumbnail}
              name={item.productName}
              productName={item.productName}
              price={item.price}
              discountPrice={0}
              id={item.productId}
              isEvent={!!item.eventId}
            />
          ))}
        </S.ProductList>
      </>
    );
  }
  const filteredProducts = productData?.data.content.filter(
    (item: ItemElementProps) => item.categoryId === activeCategoryId?.id,
  );
  if (filteredProducts?.length === 0) {
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
        {filteredProducts?.map((item: ItemElementProps) => (
          <ItemElement
            key={item.id}
            mainThumbnail={item.mainThumbnail}
            subThumbnail={item.subThumbnail}
            name={item.name}
            productName={item.productName}
            price={item.price}
            discountPrice={item.discountPrice}
            id={item.id}
            isEvent={!!item.eventId}
          />
        ))}
      </S.ProductList>
    </>
  );
}
