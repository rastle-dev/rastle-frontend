import React, { useEffect, useState, useRef } from "react";
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

const DrawButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const WinnerInfoContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WinnerTable = styled.table`
  border: 2px solid #007bff;
  border-collapse: collapse;
  text-align: center;
  font-size: 1.2rem;
  background-color: #f9f9f9;
  width: 50%;
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
`;

const WinnerRow = styled.tr`
  background-color: #007bff;
  color: white;
`;

const WinnerCell = styled.td`
  padding: 1rem;
  border: 1px solid #ddd;
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
  const [winner, setWinner] = useState<any>(null);
  const [displayWinner, setDisplayWinner] = useState<any>(null);
  const animationRef = useRef<number | null>(null);

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

  const animateWinnerDisplay = (winners: any[], duration: number) => {
    let startTime: number | null = null;
    let lastUpdate = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed - lastUpdate >= 50) {
        lastUpdate = elapsed;
        const currentWinner =
          winners[Math.floor(Math.random() * winners.length)];
        setDisplayWinner(currentWinner);
      }

      if (elapsed < duration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        const finalWinner = winners[Math.floor(Math.random() * winners.length)];
        setDisplayWinner(finalWinner);
        setWinner(finalWinner);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleDrawClick = () => {
    if (!eventApplyUserData?.data.length) return;

    const duration = 3000; // 애니메이션 시간 (3초)
    animateWinnerDisplay(eventApplyUserData.data, duration);
  };

  // 열(컬럼) 정보 배열
  const columnHeaders = [
    "추첨번호",
    "이름",
    "인스타그램ID",
    "응모일자",
    "휴대폰 번호",
  ];

  const columnFieldMap: { [key: string]: string } = {
    제품명: "productName",
    이름: "memberName",
    응모일자: "eventApplyDate",
    "휴대폰 번호": "eventPhoneNumber",
    인스타그램ID: "instagramId",
  };

  // 응모일자 변환 함수
  const formatEventApplyDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 휴대폰 번호 뒷자리 마스킹 함수
  const maskPhoneNumber = (phoneNumber: string) => {
    return phoneNumber?.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
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
      <p>{selectedProductName || "제품명이 없습니다"}</p>
      <p>이벤트 참여 수 : {eventApplyUserData?.data.length || 0}개</p>
      <DrawButton onClick={handleDrawClick}>추첨</DrawButton>
      {displayWinner && (
        <WinnerInfoContainer>
          <WinnerTable>
            <tbody>
              <WinnerRow>
                <WinnerCell colSpan={3}>🎉 축하합니다! 당첨자 🎉</WinnerCell>
              </WinnerRow>
              <TableRow>
                <TableCell>이름</TableCell>
                <TableCell>인스타그램ID</TableCell>
                <TableCell>휴대폰 번호</TableCell>
              </TableRow>
              <TableRow>
                <WinnerCell>{displayWinner.memberName}</WinnerCell>
                <WinnerCell>{displayWinner.instagramId}</WinnerCell>
                <WinnerCell>
                  {maskPhoneNumber(displayWinner.eventPhoneNumber)}
                </WinnerCell>
              </TableRow>
            </tbody>
          </WinnerTable>
        </WinnerInfoContainer>
      )}
      <Table>
        <TableHead>
          <tr>
            {columnHeaders.map((header) => (
              <TableHeadCell key={header}>{header}</TableHeadCell>
            ))}
          </tr>
        </TableHead>
        <tbody>
          {eventApplyUserData?.data.map((user: any, index: number) => (
            <TableRow key={user.createdDate}>
              {columnHeaders.map((header) => {
                let cellContent;

                if (header === "추첨번호") {
                  cellContent = index + 1;
                } else if (header === "응모일자") {
                  cellContent = formatEventApplyDate(
                    user[columnFieldMap[header]],
                  );
                } else if (header === "휴대폰 번호") {
                  cellContent = maskPhoneNumber(user[columnFieldMap[header]]);
                } else {
                  cellContent = user[columnFieldMap[header]];
                }

                return <TableCell key={header}>{cellContent}</TableCell>;
              })}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
