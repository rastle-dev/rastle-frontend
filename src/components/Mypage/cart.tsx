import React, { useState } from "react";
import useMypage from "@/hooks/useMypage";
import PATH from "@/constants/path";
import { useRouter } from "next/dist/client/router";
import LoadingBar from "@/components/LoadingBar";
import { createOrder } from "@/api/shop";
import errorMsg from "@/components/Toast/error";
import { toast } from "react-toastify";
import * as S from "@/styles/mypage/cart/index.styles";

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

interface CartProduct {
  cartProductId: number;
  color: string;
  count: number;
  mainThumbnailImage: string;
  productId: number;
  productName: string;
  productPrice: number;
  size: string;
}
export default function Cart() {
  const {
    cartProduct,
    deleteCart,
    selectedItems,
    setSelectedItems,
    deleteProducts,
    setDeleteProducts,
    mutateDeleteCartProduct,
    isLoading,
    deleteButtonDisabled,
  } = useMypage();
  const router = useRouter();
  const [cartOrderProducts, setCartOrderProducts] = useState<number[]>([]);
  const handleProductCheckboxChange = (item: ProductItem) => {
    // 항목이 이미 선택되었는지 확인
    const isSelected = selectedItems.includes(item);

    // 이미 선택된 경우 선택 해제하고, 그렇지 않은 경우 selectedItems 배열에 추가합니다.
    if (isSelected) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item),
      );
      setCartOrderProducts(
        cartOrderProducts.filter((v: number) => v !== item.cartProductId),
      );
      setDeleteProducts(
        deleteProducts.filter((v: number) => v !== item.cartProductId),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
      setDeleteProducts([...deleteProducts, item.cartProductId]);
      setCartOrderProducts([...cartOrderProducts, item.cartProductId]);
    }
  };
  const orderList = cartOrderProducts.join(",");
  const handleHeaderCheckboxChange = () => {
    // 모든 항목이 이미 선택된 경우, selectedItems를 비웁니다. 그렇지 않으면 모든 항목을 선택합니다.
    if (selectedItems.length === cartProduct?.data.content.length) {
      setSelectedItems([]);
      setCartOrderProducts([]);
      setDeleteProducts([]);
    } else {
      setSelectedItems(cartProduct?.data.content);
      const cartProductIds = cartProduct?.data.content.map(
        (item: CartProduct) => item.cartProductId,
      );
      const productIds = cartProduct?.data.content.map(
        (item: CartProduct) => item.cartProductId,
      );
      setDeleteProducts(cartProductIds);
      setCartOrderProducts(productIds);
    }
  };
  const totalPriceSum = cartProduct?.data.content.reduce(
    (sum: number, item: CartProduct) => sum + item.productPrice * item.count,
    0,
  );

  const onClickOrderButton = async () => {
    const orderProducts = selectedItems.map((product: any) => ({
      productId: product.productId,
      name: product.productName,
      color: product.color,
      size: product.size,
      count: product.count,
      totalPrice: product.productPrice, // totalPrice 값은 필요에 따라 설정해 주세요.
    }));
    console.log("aa", selectedItems);
    if (orderProducts.length === 0) {
      toast.dismiss();
      errorMsg("주문하실 상품을 선택해주세요");
    } else {
      try {
        const data = await createOrder({
          orderProducts,
        });

        if (data) {
          const productOrderNumbers: string[] = data.data.orderProducts.map(
            (product: { productOrderNumber: string }) =>
              product.productOrderNumber,
          );

          router.push({
            pathname: PATH.ORDER,
            query: {
              orderList,
              selectedProducts: JSON.stringify(selectedItems),
              orderDetailId: data.data.orderDetailId,
              orderNumber: data.data.orderNumber,
              productOrderNumbers,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onClickWholeOrderButton = async () => {
    const orderProducts = cartProduct?.data.content.map((product: any) => ({
      productId: product.productId,
      name: product.productName,
      color: product.color,
      size: product.size,
      count: product.count,
      totalPrice: product.productPrice, // totalPrice 값은 필요에 따라 설정해 주세요.
    }));
    const whole = cartProduct?.data.content.map(
      (product: any) => product.cartProductId,
    );
    const wholeOrderList = whole.join(",");
    try {
      const data = await createOrder({
        orderProducts,
      });

      if (data) {
        const productOrderNumbers: string[] = data.data.orderProducts.map(
          (product: { productOrderNumber: string }) =>
            product.productOrderNumber,
        );
        router.push({
          pathname: PATH.ORDER,
          query: {
            orderList: wholeOrderList,
            selectedProducts: JSON.stringify(cartProduct?.data.content),
            orderDetailId: data.data.orderDetailId,
            orderNumber: data.data.orderNumber,
            productOrderNumbers,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onClickSelectedOrderButton = async (item: any) => {
    const orderProducts = selectedItems.map((product: any) => ({
      productId: product.productId,
      name: product.productName,
      color: product.color,
      size: product.size,
      count: product.count,
      totalPrice: product.productPrice, // totalPrice 값은 필요에 따라 설정해 주세요.
    }));

    try {
      const data = await createOrder({
        orderProducts,
      });

      if (data) {
        const productOrderNumbers: string[] = data.data.orderProducts.map(
          (product: { productOrderNumber: string }) =>
            product.productOrderNumber,
        );

        router.push({
          pathname: PATH.ORDER,
          query: {
            orderList: item.cartProductId,
            selectedProducts: JSON.stringify(selectedItems),
            orderDetailId: data.data.orderDetailId,
            orderNumber: data.data.orderNumber,
            productOrderNumbers,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.Wrap isLoading={isLoading}>
      <h2>장바구니</h2>
      {cartProduct?.data.content.length === 0 ? (
        <S.NODATA>
          장바구니에 상품이 없어요. &nbsp;장바구니에 상품을 담아보세요! 😋
        </S.NODATA>
      ) : (
        <>
          <S.TabMenu>
            {isLoading && <LoadingBar type={6} />}
            <button
              type="button"
              onClick={() => {
                if (deleteProducts.length === 0) {
                  toast.dismiss();
                  errorMsg("삭제하실 상품을 선택해주세요");
                } else {
                  mutateDeleteCartProduct.mutate(deleteProducts.join(","));
                }
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
          </S.TabMenu>
          <S.Table>
            <S.TableHeader>
              <S.Select
                type="checkbox"
                checked={
                  selectedItems.length === cartProduct?.data.content.length
                }
                onChange={handleHeaderCheckboxChange}
              />
              {menuList.map((menu) => (
                <p>{menu}</p>
              ))}
            </S.TableHeader>
            <S.TableContent>
              {cartProduct?.data.content.map((item: any) => {
                // 제품 가격과 수량을 곱하고 3,000원을 더한 값을 계산
                const totalPrice = item.productPrice * item.count + 3000;

                return (
                  <S.ProductInfo key={item.productId}>
                    <S.Select
                      type="checkbox"
                      checked={selectedItems.includes(item)}
                      onChange={() => handleProductCheckboxChange(item)}
                    />
                    <S.Img src={item.mainThumbnailImage} />
                    <S.MobileTextInfo>
                      <S.TextInfo>
                        <h4>{item.productName}</h4>
                        <h4>
                          {item.size}/{item.color}
                        </h4>
                      </S.TextInfo>
                      <p>{item.productPrice.toLocaleString()}원</p>
                      <p>{item.count}개</p>
                      <p>3,000원</p>
                      <p>{totalPrice.toLocaleString()}원</p>
                      {/* 계산된 총 가격 표시 */}
                    </S.MobileTextInfo>
                    <S.SelectTab>
                      <S.SelectButton
                        title="주문하기"
                        onClick={async () => {
                          try {
                            await onClickSelectedOrderButton(item);
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                      />
                      <S.DeleteButton
                        title="X"
                        onClick={() => {
                          // 버튼이 활성화되어 있을 때만 뮤테이션을 시작합니다.
                          if (!deleteButtonDisabled) {
                            mutateDeleteCartProduct.mutate(item.cartProductId);
                          }
                        }}
                        disabled={deleteButtonDisabled}
                      />
                    </S.SelectTab>
                  </S.ProductInfo>
                );
              })}
            </S.TableContent>
          </S.Table>

          <S.TotalPrice>
            {totalPriceSum === 0 ? (
              <>
                <p>상품 구매 금액</p>
                <div>{totalPriceSum?.toLocaleString()}원</div>
              </>
            ) : (
              <>
                <p>상품 구매 금액</p>
                <div>{totalPriceSum?.toLocaleString()}원</div>
                <p>+ 배송비</p>
                <div>3,000원</div>
                <p>= 합계</p>
                <div>{(totalPriceSum + 3000).toLocaleString()}원</div>
              </>
            )}
          </S.TotalPrice>
          <S.ButtonWrapper>
            <S.OrderButton
              title="전체상품 주문"
              type="shop"
              onClick={async () => {
                try {
                  await onClickWholeOrderButton();
                } catch (error) {
                  console.error(error);
                }
              }}
            />
            <S.SelectOrderButton
              title="선택상품 주문"
              type="shop"
              onClick={async () => {
                try {
                  await onClickOrderButton();
                } catch (error) {
                  console.error(error);
                }
              }}
            />
          </S.ButtonWrapper>
        </>
      )}
    </S.Wrap>
  );
}
