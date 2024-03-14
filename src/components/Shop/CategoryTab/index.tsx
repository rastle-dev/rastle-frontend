import React from "react";
import styled from "styled-components";
import COLORS from "@/constants/color";

interface ProductCategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const TabContainer = styled.div`
  display: flex;
  gap: 5rem;
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
    props.active ? `1px solid ${COLORS.BLUE}` : "none"};
  cursor: pointer;
  padding-bottom: 1.5rem;
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
  return (
    <TabContainer>
      {categories?.map((category: string) => (
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
