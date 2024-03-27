import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import useUserInfo from "@/hooks/manager/user/useUserInfo";
import useOrderInfo from "@/hooks/manager/order/useOrderInfo";

const Wrapper = styled.div`
  width: 100%;
`;
const Title = styled.div`
  margin: 0;
  font-size: 2.2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  overflow-x: auto; /* 수평 스크롤을 추가합니다. */
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
  font-weight: bold;
`;

const TableHeadCell = styled.th`
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
  min-width: 150px; /* 최소 너비를 설정하여 내용이 너무 짤리지 않도록 합니다. */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않고 한 줄에 표시되도록 설정합니다. */
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

export default function OrderManagement() {
  // const { data } = useQuery([QUERYKEYS.ADMIN_LOAD_USERINFO], adminGetUserInfo);
  const {
    ITEM_SIZE,
    curPage,
    onChangePage,
    searchType,
    setSearchType,
    searchValue,
    setSearchValue,
    useLoadOrderInfo,
  } = useOrderInfo();
  const { data, refetch } = useLoadOrderInfo({
    page: curPage - 1,
    size: ITEM_SIZE,
  });

  console.log(data);
  const [userData, setUserData] = useState(data?.data.content);
  useEffect(() => {
    setUserData(data?.data.content);
    refetch();
  }, [curPage, data]);
  console.log(userData);
  // 열(컬럼) 정보 배열
  const columnHeaders = [
    "결제 상태", // orderStatus
    "결제 일시", // paidAt
    "주문 번호", // orderNumber
    "상품 주문 번호", // productOrderNumber
    "상품명", // productName
    "옵션", // option
    "수량", // count
    "수령인 이름", // receiverName
    "수령인 전화번호", // receiverTel
    "수령인 이메일", // receiverEmail
    "수령인 주소", // receiverAddress
    "수령인 우편번호", // receiverPostCode
    "배송 서비스", // deliveryService
    "배송 메시지", // deliveryMsg
    "송장 번호", // trackingNumber
    "결제 ID", // impId
    "상품 가격", // productPrice
    "상품 주문 총액", // productOrderTotalPrice
    "주문 가격", // orderPrice
    "결제 가격", // paymentPrice
    "배송 비용", // deliveryPrice
    "추가 배송 비용", // additionalDeliveryPrice
    "결제 방법", // paymentMethod
    "쿠폰 할인액", // couponAmount
  ];

  const columnFieldMap: { [key: string]: string } = {
    "결제 상태": "orderStatus",
    "결제 일시": "paidAt",
    "주문 번호": "orderNumber",
    "상품 주문 번호": "productOrderNumber",
    상품명: "productName",
    옵션: "option",
    수량: "count",
    "수령인 이름": "receiverName",
    "수령인 전화번호": "receiverTel",
    "수령인 이메일": "receiverEmail",
    "수령인 주소": "receiverAddress",
    "수령인 우편번호": "receiverPostCode",
    "배송 서비스": "deliveryService",
    "배송 메시지": "deliveryMsg",
    "송장 번호": "trackingNumber",
    "결제 ID": "impId",
    "상품 가격": "productPrice",
    "상품 주문 총액": "productOrderTotalPrice",
    "주문 가격": "orderPrice",
    "결제 가격": "paymentPrice",
    "배송 비용": "deliveryPrice",
    "추가 배송 비용": "additionalDeliveryPrice",
    "결제 방법": "paymentMethod",
    "쿠폰 할인액": "couponAmount",
  };

  console.log("API) useLoadUserInfo : 전체 userData : ", userData);
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
    <Wrapper>
      <div>
        <Title>회원 관리</Title>
        <p>총 회원수: {data?.data.totalElements}</p>
        <div>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="결제 상태">orderStatus</option>
            <option value="결제 일시">paidAt</option>
            <option value="주문 번호">orderNumber</option>
            <option value="상품 주문 번호">productOrderNumber</option>
            <option value="상품명">productName</option>
            <option value="옵션">option</option>
            <option value="수량">count</option>
            <option value="수령인 이름">receiverName</option>
            <option value="수령인 전화번호">receiverTel</option>
            <option value="수령인 이메일">receiverEmail</option>
            <option value="수령인 주소">receiverAddress</option>
            <option value="수령인 우편번호">receiverPostCode</option>
            <option value="배송 서비스">deliveryService</option>
            <option value="배송 메시지">deliveryMsg</option>
            <option value="송장 번호">trackingNumber</option>
            <option value="결제 ID">impId</option>
            <option value="상품 가격">productPrice</option>
            <option value="상품 주문 총액">productOrderTotalPrice</option>
            <option value="주문 가격">orderPrice</option>
            <option value="결제 가격">paymentPrice</option>
            <option value="배송 비용">deliveryPrice</option>
            <option value="추가 배송 비용">additionalDeliveryPrice</option>
            <option value="결제 방법">paymentMethod</option>
            <option value="쿠폰 할인액">couponAmount</option>
          </select>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            검색
          </button>
          <button type="button" onClick={handleReset}>
            초기화
          </button>
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
              <TableRow key={user.createdDate}>
                {columnHeaders.map((header) => (
                  <TableCell key={header}>
                    {header === "상품 구매 목록" &&
                    Array.isArray(user.allOrderDetails)
                      ? user.allOrderDetails.map((order: any) => (
                          <div key={order.orderId}>
                            Order ID: {order.orderId}, Products:{" "}
                            {JSON.stringify(order.orderProducts)}
                          </div>
                        ))
                      : user[columnFieldMap[header]]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </Wrapper>
  );
}
