import React from "react";
import * as S from "./index.styles";
import Input from "@/components/common/Input";
import ItemElement from "@/components/ItemElement";
import { ProductCategory } from "@/pages";
import Button from "@/components/common/Button";

type ProductItem = {
  defaultImg: string;
  productName: string;
  price: string;
  size: string;
  color: string;
};
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
];
export default function Mypage() {
  return (
    <S.Container>
      <h1>MYPAGE</h1>
      <S.Wrapper>
        <S.Sidebar>
          <S.Menu>
            <h2>쇼핑 정보</h2>
            <S.SubMenu>주문 내역</S.SubMenu>
            <S.SubMenu>장바구니</S.SubMenu>
          </S.Menu>
          <S.Menu>
            <h2>내 정보</h2>
            <S.SubMenu>로그인 정보</S.SubMenu>
            <S.SubMenu>기본 배송지</S.SubMenu>
          </S.Menu>
        </S.Sidebar>
        <S.Content>
          <h2>장바구니</h2>
          <S.TabMenu>
            <p>선택상품 삭제</p>
            <p>장바구니 비우기</p>
          </S.TabMenu>
          <S.Table>
            <S.TableHeader>
              <S.Select type="checkbox" />
              <p>정보</p>
              <p>판매가</p>
              <p>수량</p>
              <p>배송비</p>
              <p>합계</p>
              <p>선택</p>
            </S.TableHeader>
            <S.TableContent>
              <S.ProductInfo>
                <S.Select type="checkbox" />
                <S.Img src="/image/product4.jpg" />
                <S.TextInfo>
                  <p>틴 워시드 버뮤다 데님 팬츠</p>
                  <p>L/인디고</p>
                </S.TextInfo>
                <p>38,900원</p>
                <p>2개</p>
                <p>3,000원</p>
                <p>42,900원</p>
                <S.SelectTab>
                  <S.SelectButton title="주문하기" />
                  <S.SelectButton title="X 삭제" />
                </S.SelectTab>
              </S.ProductInfo>
              {shopItems.map((item) => (
                <S.ProductInfo>
                  <S.Select type="checkbox" />
                  <S.Img src={item.defaultImg} />
                  <S.TextInfo>
                    <p>{item.productName}</p>
                    <p>
                      {item.size}/{item.color}
                    </p>
                  </S.TextInfo>
                  <p>{item.price}</p>
                  <p>2개</p>
                  <p>3,000원</p>
                  <p>42,900원</p>
                  <S.SelectTab>
                    <S.SelectButton title="주문하기" />
                    <S.SelectButton title="X 삭제" />
                  </S.SelectTab>
                </S.ProductInfo>
              ))}
            </S.TableContent>
          </S.Table>
        </S.Content>
      </S.Wrapper>
    </S.Container>
  );
}
