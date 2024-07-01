import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadEventProductPaging } from "@/api/shop";
import { adminGetEventInfo } from "@/api/admin";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
  font-weight: bold;
`;

const TableHeadCell = styled.th`
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

export const PageNumberContainer = styled.div`
  margin-bottom: 5rem;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li {
    cursor: pointer;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;
const EventProductNameButton = styled.button`
  background-color: transparent;
  padding: 1rem 1rem 1rem 1rem;
  font-weight: 400;
  margin-right: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
  &:focus {
    background-color: grey;
  }
`;

export default function LoadEvent() {
  const queryFn = () =>
    loadEventProductPaging({
      page: 0,
      size: 500,
    });
  const { data: eventData } = useQuery(
    [QUERYKEYS.LOAD_EVENTPRODUCT_PAGING_SHOP],
    queryFn,
  );
  const [eventProductId, setEventProductId] = useState<number | null>(null);
  const [selectedProductName, setSelectedProductName] = useState<string>("");

  const { data: eventApplyUserData, refetch } = useQuery(
    [QUERYKEYS.ADMIN_LOAD_EVENTINFO, eventProductId],
    () => adminGetEventInfo(eventProductId),
    {
      enabled: Boolean(eventProductId),
    },
  );

  useEffect(() => {
    if (eventProductId !== null) {
      refetch();
    }
  }, [eventProductId, refetch]);

  const handleProductClick = (productId: any, productName: any) => {
    setEventProductId(productId);
    setSelectedProductName(productName);
  };

  // 열(컬럼) 정보 배열
  const columnHeaders = [
    "제품명",
    "이름",
    "응모일자",
    "휴대폰 번호",
    "인스타그램ID",
  ];

  const columnFieldMap: { [key: string]: string } = {
    제품명: "productName",
    이름: "memberName",
    응모일자: "eventApplyDate",
    "휴대폰 번호": "eventPhoneNumber",
    인스타그램ID: "instagramId",
  };

  return (
    <div>
      <div>
        <p>이벤트 제품 수: {eventData?.data.length || 0}개</p>
        {eventData?.data.map((item: any) => (
          <EventProductNameButton
            key={item.productId}
            type="button"
            onClick={() => handleProductClick(item.productId, item.productName)}
          >
            {item.productName}
          </EventProductNameButton>
        ))}
      </div>
      <Table>
        <TableHead>
          <tr>
            {columnHeaders.map((header) => (
              <TableHeadCell key={header}>{header}</TableHeadCell>
            ))}
          </tr>
        </TableHead>
        <tbody>
          <p>{selectedProductName || "제품명이 없습니다"}</p>
          <p>이벤트 참여 수 : {eventApplyUserData?.data.length || 0}개</p>
          {eventApplyUserData?.data.map((user: any) => (
            <TableRow key={user.createdDate}>
              {columnHeaders.map((header) => (
                <TableCell key={header}>
                  {user[columnFieldMap[header]]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
