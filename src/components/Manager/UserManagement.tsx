import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Title = styled.div`
  margin: 0;
  font-size: 2.2rem;
`;

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

  const allUsers = [
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
      id: 3,
      email: "user3@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 4,
      email: "user4@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 5,
      email: "user5@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 6,
      email: "user6@example.com",
      socialLogin: "No",
      loginType: "website",
      name: "User 2",
      phoneNumber: "987-654-3210",
      address: "Address 2",
      joinDate: "2023-02-01",
      purchaseList: "Item C, Item D",
    },
    {
      id: 7,
      email: "user7@example.com",
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
  const [userData, setUserData] = useState(allUsers);
  const [searchType, setSearchType] = useState("이메일 주소");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    // 검색 결과 데이터 생성
    const filteredUsers = allUsers.filter((user) => {
      if (searchType === "이메일 주소") {
        return user.email.toLowerCase().includes(searchValue.toLowerCase());
      } else if (searchType === "가입일") {
        return user.joinDate.toLowerCase().includes(searchValue.toLowerCase());
      }
      return true; // 기본적으로 모든 사용자를 보여줍니다.
    });
    setUserData(filteredUsers);
  };

  const handleReset = () => {
    // 검색 결과를 초기화하고 모든 사용자 데이터로 복원
    setUserData(allUsers);
    setSearchValue("");
    setSearchType("이메일 주소");
  };

  return (
    <div>
      <Title>회원 관리</Title>
      <p>총 회원수: {userData.length}</p>
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
        <button onClick={handleSearch}>검색</button>
        <button onClick={handleReset}>초기화</button>
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
          {userData.map((user) => (
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
