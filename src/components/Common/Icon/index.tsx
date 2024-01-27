import React from "react";
import styled from "styled-components";
import Icons from "../../../constants/icon";
import "bootstrap-icons/font/bootstrap-icons.css";

interface IconProps {
  /** 아이콘 이름 */
  iconName: string;
  iconSize?: string;
  color?: string;
  border?: number;
  opacity?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledIcon = styled.i<{ border?: number }>`
  ${({ border }) => `
   -webkit-text-stroke: ${border}px;
`}
`;

function Icon({
  iconName,
  iconSize = "1.5rem",
  color,
  border = 0.1,
  opacity,
  onClick,
}: IconProps) {
  return (
    <StyledIcon
      className={Icons[iconName]}
      style={{ fontSize: iconSize, color, opacity }}
      border={border}
      onClick={onClick}
    />
  );
}

export default Icon;
