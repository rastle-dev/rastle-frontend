import React, { useEffect, useState } from "react";
import * as S from "@/styles/orderDetail/index.styles";
import COLORS from "@/constants/color";
import styled from "styled-components";
import CountTable from "@/components/Product/CountTable";
import { SelectedItem } from "@/interface/Cancel/SelectedItem";
import useOrderCancel from "@/hooks/useOrderCancel";
import errorMsg from "@/components/Toast/error";
import { toast } from "react-toastify";
import Modal from "@/components/Common/Modal";
import EnterReturnOrderModal from "@/components/ReturnOrder/EnterReturnOrderModal";

interface CheckBoxProps {
  isChecked?: boolean;
}
const CheckBox = styled.div<CheckBoxProps>`
  cursor: pointer;
  span {
    padding-left: 0.3rem;
    color: ${(props) => (props.isChecked ? "black" : "grey")};
  }
`;
export default function OrderReturn() {
  const {
    handleProductCheckboxChange,
    selectedItems,
    setSelectedItems,
    orderDetail,
    selectedCancelItems,
    syncItemCount,
    inputChangeHandler,
    handleIncrement,
    handleDecrement,
    handleDelete,
    onChangeReason,
    reason,
    cancelCount,
    setReturnInfo,
    returnInfo,
  } = useOrderCancel();
  const [returnOrderModalOpen, setReturnOrderModalOpen] = useState(false);

  useEffect(() => {
    // selectedCancelItems 상태가 변경될 때마다 선택된 항목들의 수량을 동기화
    syncItemCount();
  }, [selectedCancelItems]);
  useEffect(() => {
    if (orderDetail?.data.productOrderInfos) {
      setSelectedItems(orderDetail?.data.productOrderInfos);
      setSelectedItems((prevSelectedItems) => {
        // 선택된 항목들의 수량을 취소된 항목들의 수량과 동일하게 설정
        return prevSelectedItems.map((selectedItem) => {
          return { ...selectedItem, prevCount: selectedItem.count };
        });
      });
      setReturnInfo((info) => ({
        ...info,
        orderNumber: orderDetail?.data.orderNumber,
      }));
    }
  }, [orderDetail]);
  const returnRequestButton = () => {
    setReturnOrderModalOpen(true);
  };
  console.log("re", returnInfo);
  return (
    <S.Temp>
      {returnOrderModalOpen && (
        <Modal
          closeModal={() => {
            setReturnOrderModalOpen(false);
          }}
          width={60}
        >
          <EnterReturnOrderModal returnInfo={returnInfo} />
        </Modal>
      )}
      <S.Container>
        <S.MainTitle>반품 신청</S.MainTitle>
        <S.InfoWrapper>
          <S.Title>주문 상품</S.Title>
          {selectedItems.map(
            (item: SelectedItem) =>
              item.status === "DELIVERED" &&
              item.prevCount -
                ((item.cancelRequestAmount ?? 0) + (item.cancelAmount ?? 0)) >
                0 && (
                <S.Product key={item.productId}>
                  <CheckBox
                    onClick={() => {
                      handleProductCheckboxChange(item);
                    }}
                    isChecked={selectedCancelItems.some((selected) => {
                      const { count, ...rest } = selected;
                      const { count: itemCount, ...restItem } = item;
                      return JSON.stringify(rest) === JSON.stringify(restItem);
                    })}
                  >
                    {selectedCancelItems.some((selected) => {
                      const { count, ...rest } = selected;
                      const { count: itemCount, ...restItem } = item;
                      return JSON.stringify(rest) === JSON.stringify(restItem);
                    }) ? (
                      <S.CheckIcon
                        iconSize="1.5rem"
                        border={0.1}
                        iconName="checkCircleFill"
                        color={COLORS.BLACK}
                      />
                    ) : (
                      <S.CheckIcon
                        iconSize="1.5rem"
                        border={0.1}
                        iconName="checkCircle"
                        color={COLORS.BLACK}
                      />
                    )}
                  </CheckBox>
                  <S.ClickedContent>
                    <S.ClickedBox
                      onClick={() => {
                        handleProductCheckboxChange(item);
                      }}
                    >
                      <S.Thumbnail
                        src={item.thumbnailUrl}
                        alt={item.thumbnailUrl}
                      />
                      <S.Info>
                        <S.ProductName>{item.name}</S.ProductName>
                        <S.NumPrice>
                          {item.prevCount -
                            ((item.cancelRequestAmount ?? 0) +
                              (item.cancelAmount ?? 0))}
                          개
                        </S.NumPrice>
                        <S.SizeColor>
                          {item.size} / {item.color}
                        </S.SizeColor>
                      </S.Info>
                    </S.ClickedBox>
                    {selectedCancelItems.some((selected) => {
                      const { count, ...rest } = selected;
                      const { count: itemCount, ...restItem } = item;
                      return JSON.stringify(rest) === JSON.stringify(restItem);
                    }) && (
                      <CountTable
                        product={item}
                        inputChangeHandler={(event) =>
                          inputChangeHandler(event, item.productOrderNumber)
                        }
                        handleIncrement={handleIncrement}
                        handleDecrement={handleDecrement}
                        handleDelete={handleDelete}
                      />
                    )}
                  </S.ClickedContent>
                </S.Product>
              ),
          )}
        </S.InfoWrapper>
        <S.CancelInfoWrapper>
          <S.Title2>반품 신청</S.Title2>
          <S.CancelReasonInput
            placeholder="사유를 입력해주세요. ex> 상품 불량"
            maxLength={40}
            onChange={onChangeReason}
            value={reason}
          />
        </S.CancelInfoWrapper>
        <S.FinalCancelButton
          onClick={() => {
            if (reason === "") {
              toast.dismiss();
              errorMsg("반품 사유를 적어주세요!");
            } else if (cancelCount === 0) {
              toast.dismiss();
              errorMsg("상품을 한 개 이상 선택해주세요!");
            } else {
              returnRequestButton();
            }
          }}
          title="반품 신청"
        />
      </S.Container>
    </S.Temp>
  );
}
