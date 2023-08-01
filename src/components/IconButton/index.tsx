import React from "react";
import styled from "styled-components";
import Icons from "../../constants/icon";
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
  /* 데스크탑 화면에서 아이콘을 숨길지 여부 */
  hideOnDesktop?: boolean;
}
const Wrapper = styled.button<{ hideOnDesktop: boolean }>`
  padding: 0;

  background-color: white;
  border: none;
  cursor: pointer;

  // @media (min-width: 769px) {
  //   display: ${({ hideOnDesktop }) => (hideOnDesktop ? "none" : "block")};
  // }
`;

const StyledIcon = styled.i<{ border: number }>`
  ${({ border }) => `
   -webkit-text-stroke: ${border}px;
`}
`;

function IconButton({
  iconName,
  iconSize = "1.5rem",
  color,
  border = 0.1,
  onClick,
  hideOnDesktop = false,
}: IconButtonProps) {
  return (
    <Wrapper hideOnDesktop={hideOnDesktop} onClick={onClick}>
      <StyledIcon
        className={Icons[iconName]}
        style={{ fontSize: iconSize, color }}
        border={border}
      />
    </Wrapper>
  );
}

export default IconButton;
