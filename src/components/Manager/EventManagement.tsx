import React, { useState } from "react";
import styled from "styled-components";
import COLORS from "@/constants/color";
import CreateEvent from "@/components/Manager/event/CreateEvent";
import UpdateEvent from "@/components/Manager/event/UpdateEvent";
import LoadEvent from "@/components/Manager/event/LoadEvent";

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

export const StyledButton = styled.button`
  font-size: 1.18182rem;
  font-weight: 400;
  padding: 1rem;
  border: 0.1px solid ${COLORS.GREY.상세페이지};
  background-color: white;
  cursor: pointer;
  &:hover {
    font-weight: 500;
  }

  /* 버튼이 클릭된 상태일 때의 스타일 */
`;

export const ManageMentDetail = styled.div`
  padding-top: 3rem;
`;

const managementList = [
  { name: "이벤트 추가" },
  { name: "이벤트 수정" },
  { name: "이벤트 내역 조회" },
];

export default function EventManagement() {
  const [selectedItem, setSelectedItem] = useState<string>("전체통계");

  const onClickList = (name: string) => {
    setSelectedItem(name);
  };

  return (
    <div>
      <Title>이벤트 관리</Title>
      <ManageList>
        {managementList.map(({ name }) => (
          <StyledButton key={name} onClick={() => onClickList(name)}>
            {name}
          </StyledButton>
        ))}
      </ManageList>
      <ManageMentDetail>
        {selectedItem === "이벤트 추가" && <CreateEvent />}
        {selectedItem === "이벤트 수정" && <UpdateEvent />}
        {selectedItem === "이벤트 내역 조회" && <LoadEvent />}
      </ManageMentDetail>
    </div>
  );
}
