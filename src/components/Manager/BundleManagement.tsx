import React, { useState } from "react";
import styled from "styled-components";
import CreateBundle from "@/components/Manager/bundle/CreateBundle";
import UpdateBundle from "@/components/Manager/bundle/UpdateBundle";

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

const managementList = [{ name: "세트 추가" }, { name: "세트 수정" }];

export default function BundleManagement() {
  const [selectedItem, setSelectedItem] = useState<string>("전체통계");

  const onClickList = (name: string) => {
    setSelectedItem(name);
  };

  return (
    <div>
      <Title>세트 관리</Title>
      <ManageList>
        {managementList.map(({ name }) => (
          <button type="button" key={name} onClick={() => onClickList(name)}>
            {name}
          </button>
        ))}
      </ManageList>
      <ManageMentDetail>
        {selectedItem === "세트 추가" && <CreateBundle />}
        {selectedItem === "세트 수정" && <UpdateBundle />}
      </ManageMentDetail>
    </div>
  );
}
