import React from "react";
import styled from "styled-components";
import Icons from "../../constants/icon";
import "bootstrap-icons/font/bootstrap-icons.css";

interface ColorButtonProps {
  /** 클릭했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** button 사이즈  */
  size?: string;
  /** icon 색 조정 */
  color?: string;
  /** border 조정 */
  border?: number;
}

const Wrapper = styled.button<{
  size: string;
  color: string;
  border: number;
}>`
  ${({ size, color }) => `
  width: ${size};
  height: ${size};
  padding: 0.2rem;
  background: ${color};
  border: 0.1px solid #9B9B9B;
`}
`;

function ColorButton({
  size = "1.5rem",
  color = "black",
  border = 0.1,
  onClick,
}: ColorButtonProps) {
  return (
    <Wrapper
      size={size}
      color={color}
      border={border}
      onClick={onClick}
    ></Wrapper>
  );
}

export default ColorButton;
