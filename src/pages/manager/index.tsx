import React, { useState } from "react";
import styled from "styled-components";
import media from "@/styles/media";
import LazyLink from "@/components/LazyLink";

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
  font-size: 2rem;
`;

export const ManageList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  padding: 1rem 0 0 0;

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

const managementList = [
  { name: "회원관리" },
  { name: "카테고리 관리" },
  { name: "상품관리" },
  { name: "주문관리" },
  { name: "대시보드" },
];

export default function Manager() {
  const [selectedItem, setSelectedItem] = useState<string>();

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
      {selectedItem === "회원관리" && <UserManagement />}
      {selectedItem === "카테고리 관리" && <CategoryManagement />}
      {selectedItem === "상품관리" && <ProductManagement />}
      {selectedItem === "주문관리" && <OrderManagement />}
      {selectedItem === "대시보드" && <Dashboard />}
    </Wrapper>
  );
}
