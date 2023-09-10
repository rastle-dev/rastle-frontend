import React, { useState } from "react";
import styled from "styled-components";
import CreateCategory from "@/components/Manager/category/CreateCategory";
import UpdateCategory from "@/components/Manager/category/UpdateCategory";
import DeleteCategory from "@/components/Manager/category/DeleteCategory";
import CreateProduct from "@/components/Manager/product/CreateProduct";
import UpdateProduct from "@/components/Manager/product/UpdateProduct";
import DeleteProduct from "@/components/Manager/product/DeleteProduct";

const Title = styled.div`
  margin: 0;
  font-size: 2.2rem;
  padding-bottom: 1rem;
`;

export const ManageList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  padding: 0 0 0.5rem 0;
  border-bottom: 1px solid grey;

  li {
    padding-right: 2.2rem;
    font-size: 1.17rem;
    cursor: pointer;
  }

  span {
    text-decoration: none;
    color: black;
    font-weight: 200;
  }

  @media (max-width: 769px) {
    display: none;
  }
`;

export const ManageMentDetail = styled.div`
  padding-top: 3rem;
`;

const managementList = [
  { name: "상품 추가" },
  { name: "상품 수정" },
  { name: "상품 삭제" },
];

export default function ProductManagement() {
  const [selectedItem, setSelectedItem] = useState<string>("전체통계");

  const onClickList = (name: string) => {
    setSelectedItem(name);
  };

  return (
    <div>
      <Title>카테고리 관리</Title>
      <ManageList>
        {managementList.map(({ name }) => (
          <button type="button" key={name} onClick={() => onClickList(name)}>
            {name}
          </button>
        ))}
      </ManageList>
      <ManageMentDetail>
        {selectedItem === "상품 추가" && <CreateProduct />}
        {selectedItem === "상품 수정" && <UpdateProduct />}
        {selectedItem === "상품 삭제" && <DeleteProduct />}
      </ManageMentDetail>
    </div>
  );
}
