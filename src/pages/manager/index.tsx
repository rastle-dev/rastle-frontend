import React, { useState } from "react";
import styled from "styled-components";
import media from "@/styles/media";
import UserManagement from "@/components/Manager/UserManagement";
import CategoryManagement from "@/components/Manager/CategoryManagement";
import ProductManagement from "@/components/Manager/ProductManagement";
import Dashboard from "@/components/Manager/Dashboard";
import OrderManagement from "@/components/Manager/OrderManagement";
import TotalManagement from "@/components/Manager/TotalManagement";
import BundleManagement from "@/components/Manager/BundleManagement";

import COLORS from "@/constants/color";
import CreateEvent from "@/components/Manager/event/CreateEvent";
import UpdateEvent from "@/components/Manager/event/UpdateEvent";
import EventManagement from "@/components/Manager/EventManagement";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { adminCheckAuthority, adminGetBundle } from "@/api/admin";

export const Wrapper = styled.div`
  padding-top: 9rem; /* header때문에 추가 */
  width: 88%;
  //overflow: hidden;
  overflow-x: auto; /* 수평 스크롤을 추가합니다. */

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

export const StyledButton = styled.button`
  font-size: 1.18182rem;
  font-weight: 400;
  padding: 1rem;
  border: 1px solid ${COLORS.GREY.상세페이지};
  background-color: white;
  cursor: pointer;
  &:hover {
    font-weight: 500;
  }

  /* 버튼이 클릭된 상태일 때의 스타일 */
`;

const managementList = [
  { name: "전체통계" },
  { name: "회원관리" },
  { name: "카테고리 관리" },
  { name: "세트관리" },
  { name: "이벤트관리" },
  { name: "상품관리" },
  { name: "주문관리" },
  { name: "대시보드" },
];

export default function Manager() {
  const { data: authority, status } = useQuery(
    [QUERYKEYS.ADMIN_GET_AUTHORITY],
    adminCheckAuthority,
  );

  const [selectedItem, setSelectedItem] = useState<string>("전체통계");

  const onClickList = (name: string) => {
    setSelectedItem(name);
  };

  if (status === "loading") {
    // 데이터를 로딩 중일 때 표시할 내용
    return <div>Loading...</div>;
  }

  if (!authority) {
    // authority 값이 없을 때 표시할 내용
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <Wrapper>
      <HeaderTitle>관리자 페이지</HeaderTitle>
      <ManageList>
        {managementList.map(({ name }) => (
          <StyledButton key={name} onClick={() => onClickList(name)}>
            {name}
          </StyledButton>
        ))}
      </ManageList>
      <ManageMentDetail>
        {selectedItem === "전체통계" && <TotalManagement />}
        {selectedItem === "회원관리" && <UserManagement />}
        {selectedItem === "카테고리 관리" && <CategoryManagement />}
        {selectedItem === "세트관리" && <BundleManagement />}
        {selectedItem === "이벤트관리" && <EventManagement />}
        {selectedItem === "상품관리" && <ProductManagement />}
        {selectedItem === "주문관리" && <OrderManagement />}
        {selectedItem === "대시보드" && <Dashboard />}
      </ManageMentDetail>
    </Wrapper>
  );
}
