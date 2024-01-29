import React from "react";
import styled from "styled-components";
import Icons from "../../../constants/icon";
import "bootstrap-icons/font/bootstrap-icons.css";

interface IconButtonProps {
  /** 아이콘 이름 */
  iconName: string;
  /** 클릭했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** icon 사이즈 */
  iconSize?: string;
  /** icon 색 조정 */
  color?: string;
  /** border 조정 */
  border?: number;
}
const Wrapper = styled.button`
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const StyledIcon = styled.i<{ border: number }>`
  ${({ border }) => `
   -webkit-text-stroke: ${border}px;
`}
`;

function IconButton({
  iconName,
  iconSize = "2.5rem",
  color,
  border = 0.1,
  onClick,
}: IconButtonProps) {
  return (
    <Wrapper onClick={onClick}>
      <StyledIcon
        className={Icons[iconName]}
        style={{ fontSize: iconSize, color }}
        border={border}
      />
    </Wrapper>
  );
}

export default IconButton;
