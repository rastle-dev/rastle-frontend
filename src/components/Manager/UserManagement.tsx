import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { adminGetUserInfo } from "@/api/admin";

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
  const { data } = useQuery([QUERYKEYS.ADMIN_LOAD_USERINFO], adminGetUserInfo);
  // 열(컬럼) 정보 배열
  const columnHeaders = [
    "이메일 주소", // email
    "이름", // userName
    "회원가입 방식", // userLoginType
    "휴대폰 번호", // phoneNumber
    "배송지 주소", // address
    "상품 구매 목록", // allOrderDetails
    "가입일", // createdDate
  ];

  const columnFieldMap = {
    "이메일 주소": "email",
    이름: "userName",
    "회원가입 방식": "userLoginType",
    "휴대폰 번호": "phoneNumber",
    "배송지 주소": "address",
    "상품 구매 목록": "allOrderDetails",
    가입일: "createdDate",
  };

  const allUsers = data?.data.content;
  const [userData, setUserData] = useState(allUsers);
  const [searchType, setSearchType] = useState("이메일 주소");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    // 검색 결과 데이터 생성
    const filteredUsers = allUsers.filter((user: any) => {
      if (searchType === "이메일 주소") {
        return user.email.toLowerCase().includes(searchValue.toLowerCase());
      }
      if (searchType === "가입일") {
        return user.createdDate
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }
      if (searchType === "회원가입 방식") {
        return user.userLoginType
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }
      if (searchType === "휴대폰 번호") {
        return user.phoneNumber
          .toLowerCase()
          .includes(searchValue.toLowerCase());
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
      <p>총 회원수: {data?.data.content.length}</p>
      <div>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="이메일 주소">이메일 주소</option>
          <option value="가입일">가입일자</option>
          <option value="회원가입 방식">회원가입 방식</option>
          <option value="휴대폰 번호">휴대폰 번호</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {/* eslint-disable-next-line react/button-has-type */}
        <button onClick={handleSearch}>검색</button>
        {/* eslint-disable-next-line react/button-has-type */}
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
          {userData?.map((user: any) => (
            <TableRow key={user.id}>
              {columnHeaders.map((header) => (
                <TableCell key={header}>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {user[columnFieldMap[header]]}
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
