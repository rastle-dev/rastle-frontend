import React from "react";
import styled from "styled-components";
import COLORS from "@/constants/color";

type ProductCategory = "전체" | "1차 마켓" | "이전 마켓" | "이벤트";

interface ProductCategoryTabsProps {
  categories: ProductCategory[];
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

const TabContainer = styled.div`
  display: flex;
  gap: 6rem;
`;

const TabItem = styled.div<{ active: boolean }>`
  display: flex;
  color: ${(props) => (props.active ? COLORS.BLUE : COLORS.BLACK)};
  border-bottom: ${(props) =>
    props.active ? `1px solid ${COLORS.BLACK}` : "none"};
  cursor: pointer;
  padding-bottom: 3.375rem;
  font-weight: 200;
  font-size: 1.3rem;
`;
export default function ProductCategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: ProductCategoryTabsProps) {
  return (
    <TabContainer>
      {categories.map((category) => (
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