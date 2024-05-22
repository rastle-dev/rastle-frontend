import React from "react";
import * as S from "@/styles/product/index.styles";
import { SelectedProduct } from "@/interface/product/detailProduct";
import { SelectedItem } from "@/interface/Cancel/SelectedItem";
import COLORS from "@/constants/color";

interface CountTableProps {
  product: SelectedProduct | SelectedItem;
  inputChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    productOrderNumber: false | number,
  ) => void;
  handleIncrement: (key: string | undefined | number) => void;
  handleDecrement: (key: string | undefined | number) => void;
}

export default function MobileCountTable({
  product,
  inputChangeHandler,
  handleIncrement,
  handleDecrement,
}: CountTableProps) {
  return (
    <S.NumberInputContainer>
      <S.MobileCountDownIcon
        iconName="circleMinus"
        iconSize="2.5rem"
        color={COLORS.GREY[400]}
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
      <S.MobileProductCountButton
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
      <S.MobileCountUpIcon
        iconName="circlePlus"
        iconSize="2.5rem"
        color={COLORS.GREY[400]}
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
    </S.NumberInputContainer>
  );
}
