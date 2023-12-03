import React, { useState } from "react";
import styled from "styled-components";
import COLORS from "@/constants/color";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import useMypage from "@/hooks/useMypage";
import PATH from "@/constants/path";
import { useRouter } from "next/dist/client/router";

type ProductItem = {
  defaultImg: string;
  productName: string;
  price: string;
  size: string;
  color: string;
  cartProductId: number;
  productId: number;
};
const menuList = ["정보", "판매가", "수량", "배송비", "합계", "선택"];
const TabMenu = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: right;
  button {
    font-size: 1.18rem;
    border: none;
    border-bottom: 1px solid ${COLORS.GREY[400]};
    color: ${COLORS.GREY[400]};
    font-weight: 200;
    cursor: pointer;
    margin: 0 0 1.4rem 0;
    padding: 0 0 0.4rem 0;
    background-color: transparent;
  }
  @media (max-width: 769px) {
    display: none;
  }
  width: 80rem;
`;
const Table = styled.div`
  border-bottom: 1px solid;
  width: 80rem;
  @media (max-width: 769px) {
    width: 88%;
  }
`;
const Select = styled(Input)`
  width: 2rem;
  @media (max-width: 769px) {
    margin-right: 1rem;
  }
`;
const TableHeader = styled.div`
  border-bottom: 1px solid;
  display: grid;
  align-items: center;
  //grid-template-columns: 17rem 22rem 12.5rem 11rem 12.5rem 11rem 5rem;
  grid-template-columns: 15rem 20rem 10.5rem 9rem 10.5rem 9rem 3rem;
  font-size: 1.2rem;
  @media (max-width: 769px) {
    display: none;
  }
  p {
    margin: 1rem 0 1rem 0;
    font-weight: 500;
  }
`;
const TableContent = styled.div``;
export const NODATA = styled.div`
  margin-top: 3rem;
  font-weight: 400;
  color: ${COLORS.GREY[500]};
  font-size: 1.5rem;
`;
const ProductInfo = styled.div`
  display: flex;
  position: relative;
  font-size: 1.2rem;
  align-items: center;
  margin: 1.9rem 0 1.9rem 0;
  p {
    @media (max-width: 769px) {
      margin: 0;
    }
    font-weight: 200;
  }
`;
const Img = styled.img`
  width: 7.5rem;
  height: 8.2rem;
  margin-right: 1rem;
  margin-left: 0.8rem;
  @media (max-width: 769px) {
    margin-right: 3rem;
    width: 8.5rem;
    height: 9.29rem;
  }
`;
const TextInfo = styled.div`
  width: 24rem;
  padding-right: 1rem;
  h4 {
    font-weight: 500;
    margin: 0;
  }
  padding-bottom: 0.5rem;
`;
const MobileTextInfo = styled.div`
  display: grid;
  grid-template-columns: 22rem 11.8rem 7.8rem 9.5rem 9rem;
  margin: 1.9rem 0 1.9rem 0;
  @media (max-width: 769px) {
    display: flex;
    flex-direction: column;
    p {
      font-weight: 400;
      font-size: 1rem;
      padding-bottom: 0.2rem;
    }
    p:nth-child(2):before {
      content: "판매가 : ";
    }
    p:nth-child(3):before {
      content: "수량 : ";
    }
    p:nth-child(4):before {
      content: "배송비 : ";
    }
    p:nth-child(5):before {
      content: "합계 : ";
    }
  }
`;
const SelectTab = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.36rem;
  //border: 1px solid red;
  @media (max-width: 769px) {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 1.5rem;
  }
`;
const SelectButton = styled(Button)`
  margin: 0;
  text-align: center;
  padding: 0.5rem 0 0.5rem 0;
  font-weight: 200;
  font-size: 1rem;
  width: 6.2rem;
  border-radius: 0;
  border: 0.5px solid;
  @media (max-width: 769px) {
    display: none;
  }
`;
const DeleteButton = styled(Button)`
  margin: 0;
  padding: 0.5rem 0 0.5rem 0;
  font-weight: 600;
  font-size: 1.4rem;
  width: 3.2rem;
  border-radius: 0;
  border: none;
  @media (min-width: 769px) {
    border-radius: 0;
    font-weight: 200;
    font-size: 1rem;
    width: 6.2rem;
    text-align: center;
    &::after {
      content: " 삭제";
    }
  }
`;
const TotalPrice = styled.div`
  display: flex;
  justify-content: right;
  font-size: 1.45rem;
  padding: 2.2rem 0 2.2rem 0;
  width: 80rem;
  @media (max-width: 769px) {
    width: 88%;
    font-size: 1.3rem;
  }
  p {
    margin: 0;
    font-weight: 200;
    padding: 0 0.5rem 0 0.5rem;
  }
  div {
  }
`;
const ButtonWrapper = styled.div`
  width: 80rem;
  font-size: 1rem;
  display: flex;
  gap: 1.45rem;
  justify-content: right;
  @media (max-width: 769px) {
    width: 88%;
  }
`;
const OrderButton = styled(Button)`
  padding: 1.18rem 3rem 1.18rem 3rem;
  font-size: 1.18rem;
  font-weight: 200;
  border-radius: 0.45rem;
  &:hover {
    font-weight: 400;
  }
`;
export default function Cart() {
  const {
    cartProduct,
    deleteCart,
    selectedItems,
    setSelectedItems,
    deleteProducts,
    setDeleteProducts,
    mutateDeleteCartProduct,
  } = useMypage();
  const router = useRouter();
  const [orderProducts, setOrderProducts] = useState<any>([]);

  const handleProductCheckboxChange = (item: ProductItem) => {
    // 항목이 이미 선택되었는지 확인
    const isSelected = selectedItems.includes(item);

    // 이미 선택된 경우 선택 해제하고, 그렇지 않은 경우 selectedItems 배열에 추가합니다.
    if (isSelected) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item),
      );
    } else {
      console.log("아이템", item);
      setSelectedItems([...selectedItems, item]);
      setDeleteProducts([...deleteProducts, item.cartProductId]);
      setOrderProducts([...orderProducts, item.cartProductId]);
    }
  };
  const orderList = orderProducts.join(",");
  const handleHeaderCheckboxChange = () => {
    // 모든 항목이 이미 선택된 경우, selectedItems를 비웁니다. 그렇지 않으면 모든 항목을 선택합니다.
    if (selectedItems.length === cartProduct?.data.content.length) {
      setSelectedItems([]);
      setDeleteProducts([]);
    } else {
      console.log("전체 아이템", cartProduct?.data.content);
      setSelectedItems(cartProduct?.data.content);
      const cartProductIds = cartProduct?.data.content.map(
        (item: any) => item.cartProductId,
      );
      const productIds = cartProduct?.data.content.map(
        (item: any) => item.cartProductId,
      );
      setDeleteProducts(cartProductIds);
      setOrderProducts(productIds);
    }
  };
  const totalPriceSum = cartProduct?.data.content.reduce(
    (sum: any, item: any) => sum + (item.productPrice * item.count + 3000),
    0,
  );
  return (
    <div>
      <h2>장바구니</h2>
      {cartProduct?.data.content.length === 0 ? (
        <NODATA>
          장바구니에 상품이 없으시네요. &nbsp; &nbsp;장바구니에 상품을
          담아보세요! 😋
        </NODATA>
      ) : (
        <>
          <TabMenu>
            <button
              type="button"
              onClick={() => {
                mutateDeleteCartProduct.mutate(deleteProducts.join(","));
              }}
            >
              선택상품 삭제
            </button>
            <button
              type="button"
              onClick={() => {
                deleteCart();
              }}
            >
              장바구니 비우기
            </button>
          </TabMenu>
          <Table>
            <TableHeader>
              <Select
                type="checkbox"
                checked={
                  selectedItems.length === cartProduct?.data.content.length
                }
                onChange={handleHeaderCheckboxChange}
              />
              {menuList.map((menu) => (
                <p>{menu}</p>
              ))}
            </TableHeader>
            <TableContent>
              {cartProduct?.data.content.map((item: any) => {
                // 제품 가격과 수량을 곱하고 3,000원을 더한 값을 계산
                const totalPrice = item.productPrice * item.count + 3000;

                return (
                  <ProductInfo key={item.productId}>
                    <Select
                      type="checkbox"
                      checked={selectedItems.includes(item)}
                      onChange={() => handleProductCheckboxChange(item)}
                    />
                    <Img src={item.mainThumbnailImage} />
                    <MobileTextInfo>
                      <TextInfo>
                        <h4>{item.productName}</h4>
                        <h4>
                          {item.size}/{item.color}
                        </h4>
                      </TextInfo>
                      <p>{item.productPrice.toLocaleString()}원</p>
                      <p>{item.count}개</p>
                      <p>3,000원</p>
                      <p>{totalPrice.toLocaleString()}원</p>
                      {/* 계산된 총 가격 표시 */}
                    </MobileTextInfo>
                    <SelectTab>
                      <SelectButton
                        title="주문하기"
                        onClick={() => {
                          router.push({
                            pathname: PATH.ORDER, // 이동할 페이지 경로
                            query: { orderList: item.cartProductId }, // 전달할 데이터 (id)
                          });
                        }}
                      />
                      <DeleteButton
                        title="X"
                        onClick={() => {
                          mutateDeleteCartProduct.mutate(item.cartProductId);
                        }}
                      />
                    </SelectTab>
                  </ProductInfo>
                );
              })}
            </TableContent>
          </Table>

          <TotalPrice>
            {totalPriceSum === 0 ? (
              <>
                <p>상품 구매 금액</p>
                <div>{totalPriceSum.toLocaleString()}원</div>
              </>
            ) : (
              <>
                <p>상품 구매 금액</p>
                <div>{(totalPriceSum - 3000).toLocaleString()}원</div>
                <p>+ 배송비</p>
                <div>3,000원</div>
                <p>= 합계</p>
                <div>{totalPriceSum?.toLocaleString()}원</div>
              </>
            )}
          </TotalPrice>
          <ButtonWrapper>
            <OrderButton
              title="전체상품 주문"
              type="shop"
              onClick={() => {
                router.push({
                  pathname: PATH.ORDER, // 이동할 페이지 경로
                  query: { orderList }, // 전달할 데이터 (id)
                });
              }}
            />
            <OrderButton
              title="선택상품 주문"
              type="shop"
              onClick={() => {
                router.push({
                  pathname: PATH.ORDER, // 이동할 페이지 경로
                  query: { orderList }, // 전달할 데이터 (id)
                });
              }}
            />
          </ButtonWrapper>
        </>
      )}
    </div>
  );
}
