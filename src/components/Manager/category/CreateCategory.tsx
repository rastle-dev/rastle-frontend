import React from "react";
import styled from "styled-components";
import useCreateCategory from "@/hooks/manager/category/useCreateCategory";
import Input from "@/components/common/Input";

const Title = styled.div`
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

export default function CreateCategory() {
  const { createCategory, onChangeName, name } = useCreateCategory();
  console.log(name);
  return (
    <div>
      <Title>카테고리 추가</Title>
      <CategoryDetail>
        <Input size={30} onChange={onChangeName} />
      </CategoryDetail>
      <button type="button" onClick={createCategory}>
        카테고리 생성
      </button>
    </div>
  );
}
