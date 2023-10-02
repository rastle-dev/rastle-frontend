import React, { useEffect, useState } from "react";
import styled from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Pagination from "react-js-pagination";
import useUserInfo from "@/hooks/manager/user/useUserInfo";

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
export default function UserManagement() {
  // const { data } = useQuery([QUERYKEYS.ADMIN_LOAD_USERINFO], adminGetUserInfo);
  const {
    useLoadUserInfo,
    ITEM_SIZE,
    curPage,
    onChangePage,
    searchType,
    setSearchType,
    searchValue,
    setSearchValue,
  } = useUserInfo();
  const { data, refetch } = useLoadUserInfo({
    page: curPage - 1,
    size: ITEM_SIZE,
  });
  const [userData, setUserData] = useState(data?.data.content);
  useEffect(() => {
    setUserData(data?.data.content);
    refetch();
  }, [curPage, data]);
  // 열(컬럼) 정보 배열
  console.log(userData);
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
  let filteredUsers;
  const handleSearch = () => {
    // 검색 결과 데이터 생성
    filteredUsers = data?.data.content.filter((user: any) => {
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
    setUserData(data?.data.content);
    setSearchValue("");
    setSearchType("이메일 주소");
  };

  return (
    <div>
      <Title>회원 관리</Title>
      <p>총 회원수: {data?.data.totalElements}</p>
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
      <PageNumberContainer>
        <Pagination
          activePage={curPage}
          itemsCountPerPage={ITEM_SIZE}
          totalItemsCount={data?.data.totalElements || 1}
          pageRangeDisplayed={5}
          onChange={onChangePage}
        />
      </PageNumberContainer>
    </div>
  );
}
