import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import {
  adminCancelOrder,
  adminDeleteTrackingNumber,
  adminGetOrderInfo,
  adminReturnOrder,
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

const CheckboxCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

export default function OrderManagement() {
  const queryFn = () =>
    adminGetOrderInfo({
      page: 0,
      size: 500,
    });

  const { openDialog, closeDialog, isDialogOpen } = useDialog();
  const { data } = useQuery([QUERYKEYS.ADMIN_LOAD_ORDERINFO], queryFn);
  const [cancelImpid, setCancelImpId] = useState<string>();
  const [cancelProductOrderNumber, setProductOrderNumber] = useState<number>();
  const [createdExcept, setCreatedExcept] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  interface TrackingData {
    trackingNumber: string | undefined;
    productOrderNumber: number | undefined;
  }

  const [trackingNumberData, setTrackingNumberData] = useState<TrackingData>({
    trackingNumber: undefined,
    productOrderNumber: undefined,
  });
  const queryClient = useQueryClient();
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
    "반품요청수량", // returnRequestAmount
    "반품확정수량", // returnAmount
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
    반품요청수량: "returnRequestAmount",
    반품확정수량: "returnAmount",
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

  const handleTrackingNumberUpdate = async () => {
    if (selectedRow !== null && trackingNumberData) {
      try {
        await adminUpdateTrackingNumber({
          trackingNumber: trackingNumberData.trackingNumber,
          productOrderNumber: trackingNumberData.productOrderNumber,
        });
        console.log("송장 번호가 성공적으로 업데이트되었습니다.");
        queryClient.invalidateQueries([QUERYKEYS.ADMIN_LOAD_ORDERINFO]);
      } catch (error) {
        console.error("송장 번호 업데이트 중 오류가 발생했습니다:", error);
      }
    }
  };
  const handleTrackingNumberDelete = async () => {
    if (selectedRow !== null && trackingNumberData) {
      try {
        await adminDeleteTrackingNumber(trackingNumberData.productOrderNumber);
        console.log("송장 번호가 삭제되었습니다.");
        queryClient.invalidateQueries([QUERYKEYS.ADMIN_LOAD_ORDERINFO]);
      } catch (error) {
        console.error("송장 번호 삭제 중 오류가 발생했습니다:", error);
      }
    }
  };

  const mutateAdminCancelOrder = useMutation(
    ["adminCancelOrder"],
    adminCancelOrder,
    {
      onSuccess: async () => {
        closeDialog();
        queryClient.invalidateQueries([QUERYKEYS.ADMIN_LOAD_ORDERINFO]);
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
  const mutateAdminReturnOrder = useMutation(
    ["adminReturnOrder"],
    adminReturnOrder,
    {
      onSuccess: async () => {
        closeDialog();
        queryClient.invalidateQueries([QUERYKEYS.ADMIN_LOAD_ORDERINFO]);
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
            if (status.split("_").includes("RETURN")) {
              mutateAdminReturnOrder.mutate({
                impId: cancelImpid,
                productOrderNumber: cancelProductOrderNumber,
              });
            } else {
              mutateAdminCancelOrder.mutate({
                impId: cancelImpid,
                productOrderNumber: cancelProductOrderNumber,
              });
            }
          }}
          onClickConfirmButton={() => {
            closeDialog();
          }}
          visible
          title={
            status.split("_").includes("RETURN")
              ? "환불 요청을 수락하시겠습니까?"
              : "주문 취소를 수락하시겠습니까?"
          }
          refuse="확인"
          confirm="취소"
          size={42}
        />
      )}
      <div>
        <Title>주문 관리</Title>
        <div>
          <button type="button" onClick={handleTrackingNumberUpdate}>
            송장 입력하기
          </button>
          <button type="button" onClick={handleTrackingNumberDelete}>
            송장 삭제하기
          </button>
          <button type="button" onClick={() => setCreatedExcept(false)}>
            전체 조회
          </button>
          <button type="button" onClick={() => setCreatedExcept(true)}>
            CREATED 제외 조회
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
          {createdExcept ? (
            <tbody>
              {data?.data.content
                ?.filter((order: any) => order.orderStatus !== "CREATED")
                .map((user: any, index: number) => (
                  <TableRow key={user.createdDate}>
                    <CheckboxCell key="checkbox">
                      <input
                        type="checkbox"
                        checked={selectedRow === index}
                        onChange={() => {
                          toggleSelectedRow(index);
                          setTrackingNumberData({
                            trackingNumber: user[columnFieldMap["송장 번호"]],
                            productOrderNumber:
                              user[columnFieldMap["상품 주문 번호"]],
                          });
                        }} // 선택된 행의 체크 여부 토글
                      />
                    </CheckboxCell>
                    {columnHeaders.map((header) => (
                      <TableCell key={header}>
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {header === "송장 번호" && selectedRow === index ? (
                          <input
                            type="text"
                            value={trackingNumberData.trackingNumber}
                            placeholder={user[columnFieldMap[header]]}
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
          ) : (
            <tbody>
              {data?.data.content.map((user: any, index: number) => (
                <TableRow key={user.createdDate}>
                  <CheckboxCell key="checkbox">
                    <input
                      type="checkbox"
                      checked={selectedRow === index}
                      onChange={() => {
                        toggleSelectedRow(index);
                        setTrackingNumberData({
                          trackingNumber: user[columnFieldMap["송장 번호"]],
                          productOrderNumber:
                            user[columnFieldMap["상품 주문 번호"]],
                        });
                      }} // 선택된 행의 체크 여부 토글
                    />
                  </CheckboxCell>
                  {columnHeaders.map((header) => (
                    <TableCell key={header}>
                      {/* eslint-disable-next-line no-nested-ternary */}
                      {header === "송장 번호" && selectedRow === index ? (
                        <input
                          type="text"
                          value={trackingNumberData.trackingNumber}
                          placeholder={user[columnFieldMap[header]]}
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
                            setCancelImpId(user.impId);
                            setProductOrderNumber(user.productOrderNumber);
                            setStatus(user.orderStatus);
                            if (
                              user.orderStatus === "CANCEL_REQUESTED" ||
                              user.orderStatus === "RETURN_REQUESTED"
                            ) {
                              openDialog();
                            }
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
          )}
        </Table>
      </div>
    </Wrapper>
  );
}
