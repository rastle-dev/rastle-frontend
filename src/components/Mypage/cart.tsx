import React, { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "@/constants/color";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import useMypage from "@/hooks/useMypage";

type ProductItem = {
  defaultImg: string;
  productName: string;
  price: string;
  size: string;
  color: string;
};
const menuList = ["정보", "판매가", "수량", "배송비", "합계", "선택"];
const shopItems: ProductItem[] = [
  {
    defaultImg: "/image/product1.jpg",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: "45,800원",
    size: "L",
    color: "인디고",
  },
  {
    defaultImg: "/image/product2.jpg",
    productName: "트랙 샌딩 워시드 와이드 흑청 데님 팬츠",
    price: "53,400원",
    size: "L",
    color: "인디고",
  },
  {
    defaultImg: "/image/product3.jpg",
    productName: "스토퍼 윈드브레이커",
    price: "34,200원",
    size: "L",
    color: "인디고",
  },
  {
    defaultImg: "/image/product1.jpg",
    productName: "틴 워시드 버뮤다 데님 팬츠",
    price: "45,800원",
    size: "L",
    color: "인디고",
  },
];
const TabMenu = styled.div`
  width: 90.5rem;
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
    padding: 0;
    padding-bottom: 0.4rem;
    background-color: transparent;
  }
`;
const Table = styled.div`
  border-bottom: 1px solid;
  width: 90.5rem;
`;
const Select = styled(Input)`
  width: 2rem;
`;
const TableHeader = styled.div`
  border-bottom: 1px solid;
  display: grid;
  align-items: center;
  grid-template-columns: 17rem 22rem 12.5rem 11rem 12.5rem 11rem 5rem;
  p {
    margin: 1rem 0 1rem 0;
    font-size: 1.45rem;
    font-weight: 500;
  }
`;
const TableContent = styled.div``;
export const NODATA = styled.div`
  margin-top: 3rem;
  font-weight: 400;
  color: ${COLORS.GREY[500]};
  border: 1px black;
  font-size: 1.5rem;
`;
const ProductInfo = styled.div`
  display: grid;
  grid-template-columns: 3.2rem 10rem 25rem 13.8rem 9.8rem 11.5rem 11rem 6.2rem;
  align-items: center;
  margin: 1.9rem 0 1.9rem 0;
  p {
    font-size: 1.45rem;
    font-weight: 200;
  }
`;
const Img = styled.img`
  width: 7.5rem;
  height: 8.2rem;
`;
const TextInfo = styled.div`
  width: 24rem;
  padding-right: 1rem;
  p {
    font-size: 1.45rem;
    font-weight: 500;
    margin: 0;
  }
`;
const SelectTab = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.36rem;
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
`;
const TotalPrice = styled.div`
  display: flex;
  justify-content: right;
  font-size: 1.45rem;
  padding: 2.2rem 0 2.2rem 0;
  width: 90.5rem;
  p {
    margin: 0;
    font-weight: 200;
    padding: 0 0.5rem 0 0.5rem;
  }
  div {
  }
`;

interface DeleteProduct {
  productId: string | string[] | undefined;
  color?: string | null;
  size?: string | null;
}
export default function Cart() {
  const [selectedItems, setSelectedItems] = useState<ProductItem[]>([]);
  const { cartProduct, deleteCart } = useMypage();
  console.log("cartProduct", cartProduct?.data.content);
  console.log("shopItems", shopItems);
  const [deleteProducts, setDeleteProducts] = useState<DeleteProduct[]>([]);

  const handleProductCheckboxChange = (item: ProductItem) => {
    // 항목이 이미 선택되었는지 확인
    const isSelected = selectedItems.includes(item);

    // 이미 선택된 경우 선택 해제하고, 그렇지 않은 경우 selectedItems 배열에 추가합니다.
    if (isSelected) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const handleHeaderCheckboxChange = () => {
    // 모든 항목이 이미 선택된 경우, selectedItems를 비웁니다. 그렇지 않으면 모든 항목을 선택합니다.
    if (selectedItems.length === cartProduct?.data.content.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartProduct?.data.content);
    }
  };
  const totalPriceSum = cartProduct?.data.content.reduce(
    (sum: any, item: any) => sum + (item.productPrice * item.count + 3000),
    0,
  );
  console.log("selectedItems", selectedItems);
  // useEffect(() => {
  //   const newCartProducts: DeleteProduct[] = selectedItems.map((product) => ({
  //     productId,
  //     color: product.color,
  //     size: product.size,
  //   }));
  //   setDeleteProducts(newCartProducts);
  // }, [selectedProducts]);

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
                deleteCart();
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
                    <TextInfo>
                      <p>{item.productName}</p>
                      <p>
                        {item.size}/{item.color}
                      </p>
                    </TextInfo>
                    <p>{item.productPrice.toLocaleString()}원</p>
                    <p>{item.count}개</p>
                    <p>3,000원</p>
                    <p>{totalPrice.toLocaleString()}원</p>
                    {/* 계산된 총 가격 표시 */}
                    <SelectTab>
                      <SelectButton title="주문하기" />
                      <SelectButton title="X 삭제" />
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
                <div>{totalPriceSum.toLocaleString()}원</div>
              </>
            )}
          </TotalPrice>
        </>
      )}
    </div>
  );
}
