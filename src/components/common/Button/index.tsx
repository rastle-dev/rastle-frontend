import React from "react";
import styled from "styled-components";
import COLORS from "../../../constants/color";

type ButtonType = "default" | "shop" | "size" | "small";
type ButtonProps = {
  title?: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

const Wrapper = styled.button<{
  type: ButtonType;
  disabled: boolean;
  className?: string;
}>`
  ${({ type, disabled }) => `
    width:  ${
      {
        default: "26.25rem",
        shop: "10.275rem",
        size: "7.12rem",
        small: "4.125rem",
      }[type]
    };
    font-size: ${
      {
        default: "1.25rem",
        shop: "1.25rem",
        size: "1.875rem",
        small: "1rem",
      }[type]
    };
     padding: ${
       {
         default: "1.2rem 0 1.2rem 0",
         shop: "1.17rem 0 1.17rem 0",
         size: "0.5rem 0 0.5rem 0",
         small: "0.4rem 0 0.4rem 0",
       }[type]
     };
     background-color: ${(disabled && "#E6E6E6") || COLORS.WHITE};
     border-radius: ${
       { default: "15px", shop: "5px", size: "none", small: "5px" }[type]
     }; 
     border: ${
       (disabled && "1px solid #E6E6E6") ||
       {
         default: `1px solid ${COLORS.BLACK}`,
         shop: `1px solid ${COLORS.BLACK}`,
         size: `1px solid ${COLORS.WHITE}`,
         small: `1px solid ${COLORS.BLACK}`,
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
}: ButtonProps) {
  return (
    <Wrapper type={type} onClick={onClick} disabled={disabled}>
      {title}
    </Wrapper>
  );
}
