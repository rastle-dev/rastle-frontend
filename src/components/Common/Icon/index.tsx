import React from "react";
import styled from "styled-components";
import Icons from "../../../constants/icon";
import "bootstrap-icons/font/bootstrap-icons.css";

interface IconProps {
  /** 아이콘 이름 */
  iconName: string;
  iconSize?: string;
  mobileIconSize?: string;
  color?: string;
  border?: number;
  opacity?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledIcon = styled.i<{
  border?: number;
  iconSize?: string;
  mobileIconSize?: string;
}>`
  ${({ border }) => `
    -webkit-text-stroke: ${border}px;
  `}

  font-size: ${(props) => props.iconSize};

  @media (max-width: 768px) {
    font-size: ${(props) =>
      props.mobileIconSize || props.iconSize}; /* 모바일일 경우의 폰트 크기 */
  }
`;

function Icon({
  iconName,
  iconSize = "1.5rem",
  mobileIconSize = "3rem",
  color,
  border = 0.1,
  opacity,
  onClick,
}: IconProps) {
  return (
    <StyledIcon
      className={Icons[iconName]}
      iconSize={iconSize}
      style={{ color, opacity }}
      mobileIconSize={mobileIconSize}
      border={border}
      onClick={onClick}
    />
  );
}

export default Icon;
