import React, { useState } from "react";
import styled from "styled-components";
import useOrderInfo from "@/hooks/manager/order/useOrderInfo";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import {
  adminCancelOrder,
  adminGetOrderInfo,
  adminUpdateTrackingNumber,
} from "@/api/admin";
import useDialog from "@/hooks/useDialog";
import Dialog from "@/components/Common/Dialog";

const Wrapper = styled.div`
  width: 100%;
  font-size: 0.8rem;
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
  //min-width: 150px; /* 최소 너비를 설정하여 내용이 너무 짤리지 않도록 합니다. */
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
    font-size: 0.5rem;
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
    font-size: 0.5rem;
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
const CheckboxCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

export default function OrderManagement() {
  const queryFn = () =>
    adminGetOrderInfo({
      page: 0,
      size: 50,
    });
  const { openDialog, closeDialog, isDialogOpen } = useDialog();

  const { data } = useQuery([QUERYKEYS.ADMIN_LOAD_ORDERINFO], queryFn);
  console.log(data);
  const { searchType, setSearchType, searchValue, setSearchValue } =
    useOrderInfo();

  console.log(data);
  const [orderData, setOrderData] = useState(data?.data.content);
  const [cancelImpid, setCancelImpId] = useState<string>();
  const [cancelProductOrderNumber, setProductOrderNumber] = useState<number>();
  interface TrackingData {
    trackingNumber: string | undefined;
    productOrderNumber: number | undefined;
  }

  const [trackingNumberData, setTrackingNumberData] = useState<TrackingData>({
    trackingNumber: undefined,
    productOrderNumber: undefined,
  });
  // useEffect(() => {
  //   setUserData(data?.data.content);
  //   refetch();
  // }, [curPage, data]);
  console.log(orderData);
  // 열(컬럼) 정보 배열
  const columnHeaders = [
    "결제 상태", // orderStatus
    "결제 일시", // paidAt
    "주문 번호", // orderNumber
    "상품 주문 번호", // productOrderNumber
    "송장 번호", // trackingNumber
    "상품명", // productName
    "옵션", // option
    "수량", // count
    "취소요청수량", // cancelRequestAmount
    "취소확정수량", // cancelAmount
    "수령인 이름", // receiverName
    "수령인 전화번호", // receiverTel
    "수령인 이메일", // receiverEmail
    "수령인 주소", // receiverAddress
    "수령인 우편번호", // receiverPostCode
    "배송 서비스", // deliveryService
    "배송 메시지", // deliveryMsg
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
    취소요청수량: "cancelRequestAmount",
    취소확정수량: "cancelAmount",
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

  console.log("API) useLoadUserInfo : 전체 userData : ", orderData);
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
    setOrderData(filteredUsers);
  };
  const handleReset = () => {
    // 검색 결과를 초기화하고 모든 사용자 데이터로 복원
    setOrderData(data?.data.content);
    setSearchValue("");
    setSearchType("이메일 주소");
  };

  const renderOrderDetails = (user: any, header: any) => {
    if (Array.isArray(user.allOrderDetails)) {
      return user.allOrderDetails.map((order: any) => (
        <div key={order.orderId}>
          Order ID: {order.orderId}, Products:{" "}
          {JSON.stringify(order.orderProducts)}
        </div>
      ));
    }
    return user[columnFieldMap[header]];
  };

  const [selectedRow, setSelectedRow] = useState<number | null>(null); // 선택된 행의 인덱스를 저장하는 상태

  // 선택된 행의 체크 여부를 토글하는 함수
  const toggleSelectedRow = (index: number) => {
    setTrackingNumberData({
      trackingNumber: undefined,
      productOrderNumber: undefined,
    });
    if (selectedRow === index) {
      // 이미 선택된 행을 다시 클릭한 경우, 선택 해제
      setSelectedRow(null);
    } else {
      // 새로운 행을 선택한 경우
      setSelectedRow(index);
    }
  };

  const handleTrackingNumberChange = (
    newTrackingNumber: string,
    productOrderNumber: number,
  ) => {
    if (selectedRow !== null) {
      setTrackingNumberData({
        trackingNumber: newTrackingNumber,
        productOrderNumber,
      });
    }
  };
  console.log(trackingNumberData);
  const queryClient = new QueryClient();

  const handleTrackingNumberUpdate = async () => {
    if (selectedRow !== null && trackingNumberData) {
      try {
        await adminUpdateTrackingNumber({
          trackingNumber: trackingNumberData.trackingNumber,
          productOrderNumber: trackingNumberData.productOrderNumber,
        });
        console.log("송장 번호가 성공적으로 업데이트되었습니다.");
      } catch (error) {
        console.error("송장 번호 업데이트 중 오류가 발생했습니다:", error);
      }
    }
  };

  const mutateAdminCancelOrder = useMutation(
    ["adminCancelOrder"],
    adminCancelOrder,
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QUERYKEYS.ADMIN_LOAD_ORDERINFO]);
        closeDialog();
      },
      onError: ({
        response: {
          data: { errorCode, message },
        },
      }) => {
        console.log(`${errorCode} / ${message}`);
      },
    },
  );
  return (
    <Wrapper>
      {isDialogOpen && (
        <Dialog
          onClickRefuseButton={() => {
            mutateAdminCancelOrder.mutate({
              impId: cancelImpid,
              productOrderNumber: cancelProductOrderNumber,
            });
          }}
          onClickConfirmButton={() => {
            closeDialog();
          }}
          visible
          title="주문 취소를 수락하시겠습니까?"
          refuse="확인"
          confirm="취소"
          size={42}
        />
      )}
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

          <button type="button" onClick={handleTrackingNumberUpdate}>
            송장 입력하기
          </button>
        </div>
        <Table>
          <TableHead>
            <tr>
              <TableHeadCell></TableHeadCell> {/* 체크박스 컬럼 */}
              {columnHeaders.map((header) => (
                <TableHeadCell key={header}>{header}</TableHeadCell>
              ))}
            </tr>
          </TableHead>
          <tbody>
            {orderData?.map((user: any, index: number) => (
              <TableRow key={user.createdDate}>
                <CheckboxCell key="checkbox">
                  <input
                    type="checkbox"
                    checked={selectedRow === index}
                    onChange={() => toggleSelectedRow(index)} // 선택된 행의 체크 여부 토글
                  />
                </CheckboxCell>
                {columnHeaders.map((header) => (
                  <TableCell key={header}>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {header === "송장 번호" && selectedRow === index ? (
                      <input
                        type="text"
                        value={user[columnFieldMap[header]]}
                        onChange={(e) => {
                          handleTrackingNumberChange(
                            e.target.value,
                            user.productOrderNumber,
                          ); // 송장 번호 변경 함수 호출
                        }}
                      />
                    ) : header === "결제 상태" && selectedRow === index ? (
                      <button
                        type="button"
                        onClick={() => {
                          console.log("imp", user.impId);
                          console.log("pon", user.productOrderNumber);
                          setCancelImpId(user.impId);
                          setProductOrderNumber(user.productOrderNumber);
                          openDialog();
                        }}
                      >
                        {user[columnFieldMap[header]]}
                      </button>
                    ) : (
                      renderOrderDetails(user, header)
                    )}
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
