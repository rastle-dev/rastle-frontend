import React from "react";
import styled from "styled-components";
import Icons from "../../constants/icon";
import "bootstrap-icons/font/bootstrap-icons.css";

interface DialogProps {
  /** 다이얼로그 제목 */
  title?: string;
  /** 쇼핑 계속하기 버튼 클릭했을 때 호출할 함수 */
  onClickShopButton?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 장바구니로 가기 버튼 클릭했을 때 호출할 함수 */
  onClickBasketButton?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const DarkWrapper = styled.div<{}>`
  width: 39rem;
  height: 17.25rem;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: S-Core Dream;
`;

const WhiteWrapper = styled.div<{}>`
  width: 33rem;
  height: 11.25rem;
  background-color: white;

  h2 {
    text-align: center;
    margin-top: 2.4rem;
    font-size: 1.6rem;
    font-weight: 300;
    font-style: normal;
  }
`;

const ButtonWrapper = styled.div<{}>`
  display: flex;
  justify-content: flex-end;
  margin-top: 3.8rem;
`;

const StyledShopButton = styled.div<{
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}>`
  margin-right: 1.54rem;
  color: #000;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 330;
  line-height: normal;
  cursor: pointer;

  &:hover {
    border: 0.3px solid;
  }
`;

const StyledBasketButton = styled.div<{
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}>`
  color: #000;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-right: 4.5rem;

  cursor: pointer;

  &:hover {
    border: 0.3px solid;
  }
`;

export default function Dialog({
  title = "해당 장바구니에 상품이 담겼습니다 🛒",
  onClickShopButton,
  onClickBasketButton,
}: DialogProps) {
  return (
    <DarkWrapper>
      <WhiteWrapper>
        <h2>{title}</h2>
        <ButtonWrapper>
          <StyledShopButton onClick={onClickShopButton}>
            쇼핑 계속하기
          </StyledShopButton>
          <StyledBasketButton onClick={onClickBasketButton}>
            장바구니로 이동하기
          </StyledBasketButton>
        </ButtonWrapper>
      </WhiteWrapper>
    </DarkWrapper>
  );
}
