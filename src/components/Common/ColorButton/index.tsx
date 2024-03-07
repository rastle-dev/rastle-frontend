import React from "react";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";

interface ColorButtonProps {
  /** 클릭했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** button 사이즈  */
  size?: number;
  /** icon 색 조정 */
  color: string | { [key: string]: string };
  /** 버튼의 type : 클릭 | 클릭X */
  clicked?: boolean;
  dataCy?: string;
}

const Wrapper = styled.div<{
  size: number;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  clicked?: boolean;
}>`
  ${({ size, clicked }) => `
  width: ${size}rem;
  height: ${size}rem;
  padding : 0.1rem;
  display : flex;
  justify-content: center;
  align-items : center;
  border: ${clicked ? `1px solid black` : `1px solid #e0e0e0`};
  `}
`;

const Inner = styled.div<{
  color: string | { [key: string]: string };
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
  color = "블랙",
  onClick,
  clicked = false,
  dataCy = "",
}: ColorButtonProps) {
  return (
    <Wrapper clicked={clicked} size={size} onClick={onClick} data-cy={dataCy}>
      <Inner color={color} />
    </Wrapper>
  );
}
