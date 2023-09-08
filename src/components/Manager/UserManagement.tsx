import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

export default function UserManagement() {
  // 열(컬럼) 정보 배열
  const columnHeaders = [
    "이메일 주소",
    "이름",
    "회원가입 방식",
    "휴대폰 번호",
    "배송지 주소",
    "상품 구매 목록",
    "가입일",
  ];

  const columnFieldMap = {
    "이메일 주소": "email",
    이름: "name",
    "회원가입 방식": "loginType",
    "휴대폰 번호": "phoneNumber",
    "배송지 주소": "address",
    "상품 구매 목록": "purchaseList",
    가입일: "joinDate",
  };

  const currentUsers = [
    {
      id: 1,
      email: "user1@example.com",
      loginType: "social",
      name: "User 1",
      phoneNumber: "123-456-7890",
      address: "Address 1",
      joinDate: "2023-01-01",
      purchaseList: "Item A, Item B",
    },
    {
      id: 2,
      email: "user2@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 2,
      email: "user2@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 2,
      email: "user2@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 2,
      email: "user2@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 2,
      email: "user2@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 2,
      email: "user2@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 2,
      email: "user2@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 2,
      email: "user2@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 2,
      email: "user2@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 2,
      email: "user2@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 2,
      email: "user2@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },

    // 다른 사용자 데이터들...
  ];
  const [searchType, setSearchType] = useState("이메일 주소");
  const [searchValue, setSearchValue] = useState("");

  // 검색 결과 데이터 생성
  const filteredUsers = currentUsers.filter((user) => {
    if (searchType === "이메일 주소") {
      return user.email.toLowerCase().includes(searchValue.toLowerCase());
    } else if (searchType === "가입일") {
      return user.joinDate.toLowerCase().includes(searchValue.toLowerCase());
    }
    return true; // 기본적으로 모든 사용자를 보여줍니다.
  });

  return (
    <div>
      <h1>회원 관리</h1>
      <h2>총 회원수 : 150</h2>
      <div>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="이메일 주소">이메일 주소</option>
          <option value="가입일">가입일자</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
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
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              {columnHeaders.map((header) => (
                <TableCell key={header}>
                  {
                    // @ts-ignore
                    user[columnFieldMap[header]]
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
      {/* 페이지네이션을 추가 */}
    </div>
  );
}
