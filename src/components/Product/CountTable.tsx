import React from "react";
import * as S from "@/styles/product/index.styles";
import Icon from "@/components/Common/Icon";
import COLORS from "@/constants/color";
import { SelectedProduct } from "@/interface/product/detailProduct";

interface CountTableProps {
  product: SelectedProduct;
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleIncrement: (key: string | undefined) => void;
  handleDecrement: (key: string | undefined) => void;
  handleDelete: (key: string | undefined) => void;
}

export default function CountTable({
  product,
  inputChangeHandler,
  handleIncrement,
  handleDecrement,
  handleDelete,
}: CountTableProps) {
  return (
    <React.Fragment key={`${product.size}-${product.color}`}>
      <S.ProductCountInfo>
        <S.ProductCountLeftInfo>
          <S.ProductCountTitle>{product.title}</S.ProductCountTitle>
          <S.ProductCountColor>{product.color} / </S.ProductCountColor>
          <S.ProudctCountSize>{product.size}</S.ProudctCountSize>
        </S.ProductCountLeftInfo>
        <S.ProductCountRightInfo>
          <S.ProductCountButton
            type="number"
            min={1}
            value={product.count}
            onChange={(event) => inputChangeHandler(event)}
          />
          <S.NumberInputContainer>
            <S.CountUpButton
              src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_up.gif"
              onClick={() => handleIncrement(product.key)}
            />
            <S.CountDownButton
              src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_down.gif"
              onClick={() => handleDecrement(product.key)}
            />
          </S.NumberInputContainer>
          <S.ProductCountDelete>
            <Icon
              iconSize="1.2rem"
              iconName="delete"
              color={COLORS.GREY.상세페이지}
              onClick={() => handleDelete(product.key)}
            />
          </S.ProductCountDelete>
        </S.ProductCountRightInfo>
      </S.ProductCountInfo>
    </React.Fragment>
  );
}
