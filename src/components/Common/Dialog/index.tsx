import React from "react";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import COLORS from "../../../constants/color";

interface DialogProps {
  size?: number;
  /** 다이얼로그 제목 */
  title?: string;
  /** 쇼핑 계속하기 버튼 클릭했을 때 호출할 함수 */
  visible?: boolean;
  onClickConfirmButton?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 장바구니로 가기 버튼 클릭했을 때 호출할 함수 */
  onClickRefuseButton?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  confirm?: string;
  refuse?: string;
}

const DarkWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.2);
`;

const WhiteWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;
const WhiteBox = styled.div<{
  size: number;
}>`
  ${({ size }) => `
    width: ${size}rem;
`}

  box-sizing: border-box;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 4px 8px 8px rgba(0, 0, 0, 0.05);
  padding: 3rem 3rem 3rem 4.5rem;
  position: relative;
  h2 {
    font-size: 2.1rem;
    font-weight: 700;
    margin-bottom: 2.25rem;
    color: ${COLORS.GREY[600]};
  }

  h4 {
    font-weight: 300;
    margin-top: 1rem;
    margin-bottom: 6.5rem;
    color: ${COLORS.GREY[400]};
    white-space: pre-line;
    font-size: 1.4rem;
    display: flex;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3.8rem;
`;

const StyledConfirmButton = styled.div<{
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}>`
  margin-right: 1.54rem;
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 330;
  line-height: normal;
  cursor: pointer;

  &:hover {
    font-weight: 500;
  }
`;

const StyledRefuseButton = styled.div<{
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}>`
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-right: 4.5rem;

  cursor: pointer;

  &:hover {
    font-weight: 500;
  }
`;

export default function Dialog({
  title = "다이얼로그의 설명을 작성하세요!",
  confirm = "승인버튼",
  refuse = "취소버튼",
  onClickConfirmButton,
  size = 45,
  onClickRefuseButton,
  visible = false,
}: DialogProps) {
  return (
    <>
      {visible && <DarkWrapper />}

      {visible && (
        <DarkWrapper>
          <WhiteWrapper>
            <WhiteBox size={size}>
              <h2>{title}</h2>
              <ButtonWrapper>
                <StyledConfirmButton onClick={onClickConfirmButton}>
                  {confirm}
                </StyledConfirmButton>
                <StyledRefuseButton onClick={onClickRefuseButton}>
                  {refuse}
                </StyledRefuseButton>
              </ButtonWrapper>
            </WhiteBox>
          </WhiteWrapper>
        </DarkWrapper>
      )}
    </>
  );
}
