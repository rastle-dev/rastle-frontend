import React from "react";
import styled from "styled-components";
import useCreateCategory from "@/hooks/manager/category/useCreateCategory";
import Input from "@/components/common/Input";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { adminGetCategory } from "@/api/admin";
import useUpdateCategory from "@/hooks/manager/category/useUpdateCategory";

const Title = styled.div`
  margin: 0;
  font-size: 2.2rem;
  padding-bottom: 2rem;
  font-weight: 400;
  border-bottom: 1px solid;
  margin-bottom: 1rem;
`;

const CategorySubtitle = styled.div`
  font-size: 1.7rem;
  color: red;
  font-weight: 400;
`;

const CategoryDetail = styled.div`
  margin: 0;
  padding-bottom: 1rem;

  label {
    margin-right: 0.5rem;
  }
`;

const CategoryList = styled.ul`
  list-style-type: none;
  padding: 0;
  li {
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;
    &:hover {
      background-color: #f0f0f0;
      color: #333;
    }
  }
`;

const StyledInput = styled(Input)`
  font-size: 2rem;
`;

interface Category {
  id: number;
  name: string;
}

export default function UpdateCategory() {
  const {
    updateCategory,
    onChangeName,
    handleCategoryClick,
    selectedCategory,
  } = useUpdateCategory();

  const { data: categoryData } = useQuery(
    [QUERYKEYS.ADMIN_GET_CATEGORY],
    adminGetCategory,
  );

  console.log(categoryData);

  return (
    <div>
      <Title>카테고리 수정</Title>
      <CategorySubtitle>수정할 카테고리를 선택하세요</CategorySubtitle>
      <CategoryList>
        {categoryData?.data.map((category: Category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </li>
        ))}
      </CategoryList>
      수정할 카테고리 : {selectedCategory?.name}
      <p>수정할 새 카테고리 이름을 작성하세요 </p>
      <StyledInput size={30} onChange={onChangeName} />
      <button type="button" onClick={updateCategory}>
        카테고리 수정
      </button>
    </div>
  );
}
