import React from "react";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";

type ButtonType = "default" | "clicked";
interface ColorButtonProps {
  /** 클릭했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** button 사이즈  */
  size?: number;
  /** icon 색 조정 */
  color?: string;
  /** 버튼의 type : 클릭 | 클릭X */
  buttonType: ButtonType;
}

const Wrapper = styled.div<{
  size: number;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType: ButtonType;
}>`
  ${({ size, buttonType }) => `
  width: ${size}rem;
  height: ${size}rem;
  padding : 0.15rem;
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
}>`
  ${({ color }) => `
  background-color: ${color};
  width : 100%;
  height : 100%;
  border: 0.1px solid #9B9B9B;

`}
`;

export default function ColorButton({
  size = 2,
  color = "black",
  onClick,
  buttonType = "default",
}: ColorButtonProps) {
  return (
    <Wrapper buttonType={buttonType} size={size} onClick={onClick}>
      <Inner color={color} />
    </Wrapper>
  );
}
