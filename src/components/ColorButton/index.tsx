import React from "react";
import styled from "styled-components";
import Icons from "../../constants/icon";
import "bootstrap-icons/font/bootstrap-icons.css";

type ButtonType = "default" | "clicked";
interface ColorButtonProps {
  /** 클릭했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** button 사이즈  */
  size?: number;
  /** icon 색 조정 */
  color?: string;
  /** border 조정 */
  border?: number;
  buttonType: ButtonType;
}

const Wrapper = styled.div<{
  size: number;
  border: number;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType: ButtonType;
}>`
  ${({ size, buttonType }) => `
  width: ${size}rem;
  height: ${size}rem;
  display : flex;
  justify-content: center;
  align-items : center;
  border: ${
    {
      default: "1px solid #9B9B9B",
      clicked: "1px solid #000",
    }[buttonType]
  };
`}
`;

const Inner = styled.div<{
  color: string;
  size: number;
}>`
  ${({ color, size }) => `
  background-color: ${color};
  width: ${size - size / 10}rem;
  height : ${size - size / 10}rem;
  // border: 0.1px solid #9B9B9B;

`}
`;

export default function ColorButton({
  size = 2,
  color = "black",
  border = 0.1,
  onClick,
  buttonType = "default",
}: ColorButtonProps) {
  return (
    <Wrapper
      buttonType={buttonType}
      size={size}
      border={border}
      onClick={onClick}
    >
      <Inner size={size} color={color}></Inner>
    </Wrapper>
  );
}
