import React from "react";
import styled from "styled-components";
import useCreateCategory from "@/hooks/manager/category/useCreateCategory";
import Input from "@/components/common/Input";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { adminGetCategory } from "@/api/admin";

const Title = styled.h1`
  margin: 0;
  font-size: 2.2rem;
  padding-bottom: 2rem;
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

export default function CreateCategory() {
  const { createCategory, onChangeName, name } = useCreateCategory();

  const { data: categoryData } = useQuery(
    [QUERYKEYS.ADMIN_GET_CATEGORY],
    adminGetCategory,
  );

  console.log("API) adminGetCategory : 전체 카테고리 : ", categoryData);

  return (
    <div>
      <Title>카테고리 추가</Title>
      <h3>현재 카테고리</h3>
      <CategoryList>
        {categoryData?.data.map((category: Category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </CategoryList>
      <p>상의, 하의, 악세서리, 아우터 등을 추가하세요</p>
      <CategoryDetail>
        <StyledInput value={name} size={30} onChange={onChangeName} />
      </CategoryDetail>
      <button type="button" onClick={createCategory}>
        카테고리 생성
      </button>
    </div>
  );
}
