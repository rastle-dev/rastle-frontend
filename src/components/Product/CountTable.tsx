import React from "react";
import * as S from "@/styles/product/index.styles";
import Icon from "@/components/Common/Icon";
import COLORS from "@/constants/color";
import { SelectedProduct } from "@/interface/product/detailProduct";
import { SelectedItem } from "@/interface/Cancel/SelectedItem";

interface CountTableProps {
  product: SelectedProduct | SelectedItem;
  inputChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    productOrderNumber: false | number,
  ) => void;
  handleIncrement: (key: string | undefined | number) => void;
  handleDecrement: (key: string | undefined | number) => void;
  handleDelete: (key: string | undefined | number) => void;
}

export default function CountTable({
  product,
  inputChangeHandler,
  handleIncrement,
  handleDecrement,
  handleDelete,
}: CountTableProps) {
  console.log("product", product.count);
  return (
    <React.Fragment key={`${product.size}-${product.color}`}>
      <S.ProductCountInfo>
        <S.ProductCountLeftInfo>
          <S.ProductCountTitle>
            {"title" in product ? product.title : product.name}
          </S.ProductCountTitle>
          <S.ProductCountColor>{product.color} / </S.ProductCountColor>
          <S.ProudctCountSize>{product.size}</S.ProudctCountSize>
        </S.ProductCountLeftInfo>
        <S.ProductCountRightInfo>
          <S.ProductCountButton
            type="number"
            min={1}
            value={product.count}
            onChange={(event) =>
              inputChangeHandler(
                event,
                "productOrderNumber" in product && product.productOrderNumber,
              )
            }
          />
          <S.NumberInputContainer>
            <S.CountUpButton
              src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_up.gif"
              onClick={() => {
                let keyToPass;
                if ("key" in product) {
                  keyToPass = product.key;
                } else if ("productOrderNumber" in product) {
                  keyToPass = product.productOrderNumber;
                }
                handleIncrement(keyToPass);
              }}
            />
            <S.CountDownButton
              src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_down.gif"
              onClick={() => {
                let keyToPass;
                if ("key" in product) {
                  keyToPass = product.key;
                } else if ("productOrderNumber" in product) {
                  keyToPass = product.productOrderNumber;
                }
                handleDecrement(keyToPass);
              }}
            />
          </S.NumberInputContainer>
          <S.ProductCountDelete>
            <Icon
              iconSize="1.2rem"
              iconName="delete"
              color={COLORS.GREY.상세페이지}
              onClick={() => {
                let keyToPass;
                if ("key" in product) {
                  keyToPass = product.key;
                } else if ("productOrderNumber" in product) {
                  keyToPass = product.productOrderNumber;
                }
                handleDelete(keyToPass);
              }}
            />
          </S.ProductCountDelete>
        </S.ProductCountRightInfo>
      </S.ProductCountInfo>
    </React.Fragment>
  );
}
