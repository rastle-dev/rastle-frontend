import React from "react";
import LoadingBar from "@/components/LoadingBar";
import errorMsg from "@/components/Toast/error";
import { toast } from "react-toastify";
import * as S from "@/styles/mypage/cart/index.styles";
import useCart from "@/hooks/mypage/cart/useCart";
import { ProductItem } from "@/interface/cartProductItem";

export default function Cart() {
  const {
    deleteCart,
    selectedItems,
    deleteProducts,
    mutateDeleteCartProduct,
    isLoading,
    deleteButtonDisabled,
    setCartOrderProducts,
    handleHeaderCheckboxChange,
    handleProductCheckboxChange,
    onClickSelectedOrderButton,
    totalPriceSum,
    onClickWholeOrderButton,
    onClickOrderButton,
    menuList,
    setDeleteProducts,
    setSelectedItems,
    cartProduct,
  } = useCart();

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
                  setCartOrderProducts([]);
                  setDeleteProducts([]);
                  setSelectedItems([]);
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
          <S.CartBox>
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
                {cartProduct?.data.content.map((item: ProductItem) => {
                  // 제품 가격과 수량을 곱하고 3,000원을 더한 값을 계산
                  const totalPrice = item.productPrice * item.count + 3000;
                  return (
                    <S.ProductInfo key={item.cartProductId}>
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
                        {item.discountPrice !== undefined ? (
                          <S.Price>
                            <S.DiscountPrice>
                              {item.productPrice.toLocaleString()}원
                            </S.DiscountPrice>
                            <S.DiscountedPrice>
                              {item.discountPrice.toLocaleString()}원
                            </S.DiscountedPrice>
                          </S.Price>
                        ) : (
                          <S.Price>
                            {item.productPrice.toLocaleString()}원
                          </S.Price>
                        )}
                        <p>{item.count}개</p>
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
                              mutateDeleteCartProduct.mutate(
                                `${item.cartProductId}`,
                              );
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
            <S.DeliveryCharge>
              <p>기본</p>
              <h3>3000원</h3>
            </S.DeliveryCharge>
          </S.CartBox>

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
