import React, { useState } from "react";
import styled from "styled-components";
import useSignup from "@/hooks/useSignup";
import useCreateMarket from "@/hooks/manager/category/useCreateCategory";
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

const CustomTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
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
      <button onClick={createCategory}>카테고리 생성</button>
    </div>
  );
}
