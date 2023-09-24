import React, { useState } from "react";
import styled from "styled-components";
import media from "@/styles/media";
import UserManagement from "@/components/Manager/UserManagement";
import CategoryManagement from "@/components/Manager/CategoryManagement";
import ProductManagement from "@/components/Manager/ProductManagement";
import Dashboard from "@/components/Manager/Dashboard";
import OrderManagement from "@/components/Manager/OrderManagement";
import TotalManagement from "@/components/Manager/TotalManagement";

export const Wrapper = styled.div`
  padding-top: 9rem; /* header때문에 추가 */
  width: 88%;
  overflow: hidden;
  //border: 1px solid red;

  ${media.mobile} {
    width: 92%;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 3rem;
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
  { name: "전체통계" },
  { name: "회원관리" },
  { name: "카테고리 관리" },
  { name: "상품관리" },
  { name: "주문관리" },
  { name: "대시보드" },
];

export default function Manager() {
  const [selectedItem, setSelectedItem] = useState<string>("전체통계");

  const onClickList = (name: string) => {
    setSelectedItem(name);
  };
  return (
    <Wrapper>
      <HeaderTitle>관리자 페이지</HeaderTitle>
      <ManageList>
        {managementList.map(({ name }) => (
          <button type="button" key={name} onClick={() => onClickList(name)}>
            {name}
          </button>
        ))}
      </ManageList>
      <ManageMentDetail>
        {selectedItem === "전체통계" && <TotalManagement />}
        {selectedItem === "회원관리" && <UserManagement />}
        {selectedItem === "카테고리 관리" && <CategoryManagement />}
        {selectedItem === "상품관리" && <ProductManagement />}
        {selectedItem === "주문관리" && <OrderManagement />}
        {selectedItem === "대시보드" && <Dashboard />}
      </ManageMentDetail>
    </Wrapper>
  );
}
