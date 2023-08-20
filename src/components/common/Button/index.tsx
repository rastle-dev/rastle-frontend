import React from "react";
import styled from "styled-components";
import COLORS from "../../../constants/color";

type ButtonType = "default" | "shop" | "size";
type ButtonProps = {
  title?: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  width?: string;
  /** 버튼 활성화 (onClick)을 감지하기 위한 props*/
  isActive?: boolean;
};

const Wrapper = styled.button<{
  type: ButtonType;
  disabled: boolean;
  className?: string;
  width: string;
  isActive?: boolean;
}>`
  ${({ type, width, disabled, isActive }) => `
    width: ${width};
    font-size: ${
      { default: "1.25rem", shop: "1.25rem", size: "1.875rem" }[type]
    };
     padding: ${
       {
         default: "1.5rem 0 1.5rem 0",
         shop: "1.17rem 0 1.17rem 0",
         size: "0.5rem 0 0.5rem 0",
       }[type]
     };
     background-color: ${(disabled && "#E6E6E6") || COLORS.화이트};
     border-radius: ${{ default: "12px", shop: "5px", size: "none" }[type]}; 
     
      display: ${isActive ? `none` : `none`};
     border: ${
       (disabled && "1px solid #E6E6E6") ||
       {
         default: `1px solid ${COLORS.블랙}`,
         shop: `1px solid ${COLORS.블랙}`,
         size: `1px solid ${COLORS.화이트}`,
       }[type]
     };
     color: ${(disabled && "#9B9B9B") || COLORS.블랙};
    &:hover{
      background-color: ${(disabled && "#F5F5F5") || COLORS.화이트};
      cursor: ${disabled ? "default" : "pointer"};
      border: ${
        (disabled && "1px solid #E6E6E6") || `1px solid ${COLORS.블랙}`
      };
      color: ${(disabled && "1px solid #E6E6E6") || `${COLORS.블랙}`};
    }
    cursor: ${disabled ? "default" : "pointer"};
    
`}
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Button({
  title,
  type = "default",
  disabled = false,
  onClick,
  className,
  width,
}: ButtonProps) {
  return (
    <Wrapper
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      width={width!}
      isActive
    >
      {title}
    </Wrapper>
  );
}
