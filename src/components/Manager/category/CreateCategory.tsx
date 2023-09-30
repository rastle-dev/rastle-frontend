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

interface Category {
  id: number;
  name: string;
}

export default function CreateCategory() {
  const { createCategory, onChangeName } = useCreateCategory();

  const { data: categoryData } = useQuery(
    [QUERYKEYS.ADMIN_GET_CATEGORY],
    adminGetCategory,
  );

  console.log(categoryData);

  return (
    <div>
      <Title>카테고리 추가</Title>
      <CategoryDetail>
        <h3>현재 카테고리</h3>
        {categoryData?.data.map((category: Category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </CategoryDetail>
      <p>상의, 하의, 악세서리, 아우터 등을 추가하세요</p>
      <CategoryDetail>
        <Input size={30} onChange={onChangeName} />
      </CategoryDetail>
      <button type="button" onClick={createCategory}>
        카테고리 생성
      </button>
    </div>
  );
}
