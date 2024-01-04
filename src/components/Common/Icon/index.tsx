import React from "react";
import styled from "styled-components";
import Icons from "../../../constants/icon";
import "bootstrap-icons/font/bootstrap-icons.css";

interface IconProps {
  /** 아이콘 이름 */
  iconName: string;
  size?: number;
  color?: string;
  border?: number;
  opacity?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledIcon = styled.i<{ border?: number; size?: number }>`
  ${({ border, size }) => `
   -webkit-text-stroke: ${border}px;
       width: ${size};

   
`}
`;

function Icon({
  iconName,
  size = 1.5,
  color,
  border = 0.1,
  opacity,
  onClick,
}: IconProps) {
  return (
    <StyledIcon
      className={Icons[iconName]}
      style={{ fontSize: size, color, opacity }}
      border={border}
      onClick={onClick}
      size={size}
    />
  );
}

export default Icon;
