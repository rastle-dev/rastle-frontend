import React from "react";
import styled from "styled-components";
import COLORS from "@/constants/color";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { adminGetCategory } from "@/api/admin";
import media from "@/styles/media";

type ProductCategory = "전체" | "코디상품" | "상의" | "하의" | "이벤트";

interface ProductCategoryTabsProps {
  categories: ProductCategory[];
  activeCategory: string;
  onCategoryChange: (category: ProductCategory) => void;
}

const TabContainer = styled.div`
  display: flex;
  gap: 6rem;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* iOS 스크롤 부드럽게 만들기 */
    flex-wrap: nowrap; /* 가로로 스크롤 가능하도록 설정 */
    justify-content: flex-start;
    gap: 3rem;
  }
  width: 100%;
`;

const TabItem = styled.div<{ active: boolean }>`
  display: flex;
  color: ${(props) => (props.active ? COLORS.블루 : COLORS.블랙)};
  border-bottom: ${(props) =>
    props.active ? `1px solid ${COLORS.블랙}` : "none"};
  cursor: pointer;
  padding-bottom: 3.375rem;
  font-weight: 200;
  font-size: 1.3rem;
  @media (max-width: 768px) {
    flex: 0 0 auto; /* 가로로 스크롤 가능한 상태에서 너비를 자동으로 설정 */
  }
`;
export default function ProductCategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: ProductCategoryTabsProps) {
  console.log("kkkk", categories, activeCategory);
  const { data: categoryData } = useQuery(
    [QUERYKEYS.ADMIN_GET_CATEGORY],
    adminGetCategory,
  );
  console.log("kkkk", categoryData);

  return (
    <TabContainer>
      {categories?.map((category) => (
        <TabItem
          key={category}
          active={category === activeCategory}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </TabItem>
      ))}
    </TabContainer>
  );
}
