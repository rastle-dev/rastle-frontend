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
};

const Wrapper = styled.button<{
  type: ButtonType;
  disabled: boolean;
  className?: string;
  width: string;
}>`
  ${({ type, width, disabled }) => `
    width: ${width};
    font-size: ${
      { default: "1.25rem", shop: "1.25rem", size: "1.875rem" }[type]
    };
     padding: ${
       {
         default: "1.6rem 0 1.6rem 0",
         shop: "1.17rem 0 1.17rem 0",
         size: "0.5rem 0 0.5rem 0",
       }[type]
     };
     background-color: ${(disabled && "#E6E6E6") || COLORS.WHITE};
     border-radius: ${{ default: "15px", shop: "5px", size: "none" }[type]}; 
     border: ${
       (disabled && "1px solid #E6E6E6") ||
       {
         default: `1px solid ${COLORS.BLACK}`,
         shop: `1px solid ${COLORS.BLACK}`,
         size: `1px solid ${COLORS.WHITE}`,
       }[type]
     };
     color: ${(disabled && "#E6E6E6") || COLORS.BLACK};
    &:hover{
      background-color: ${(disabled && "#E6E6E6") || COLORS.WHITE};
      cursor: ${disabled ? "default" : "pointer"};
      border: ${
        (disabled && "1px solid #E6E6E6") || `1px solid ${COLORS.BLACK}`
      };
      color: ${(disabled && "1px solid #E6E6E6") || `${COLORS.BLACK}`};
    }
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
    >
      {title}
    </Wrapper>
  );
}
