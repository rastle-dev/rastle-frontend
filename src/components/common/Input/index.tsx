import React from "react";
import styled from "styled-components";
import COLORS from "../../../constants/color";

const Wrapper = styled.div``;
const Label = styled.div`
  font-size: 1rem;
  color: ${COLORS.BLACK};
  padding: 0 0 0.1rem 0.2rem;
`;

const InputWrapper = styled.input<{ size: number }>`
  ${({ size }) => `
    width: ${size}rem;
`}
  padding: 0.9rem 0.2rem;
  border: none;
  border-bottom: 0.07rem solid ${COLORS.GREY[300]};
  // border-bottom:
  //   ${(props) =>
    props.onChange
      ? `0.07rem solid ${COLORS.BLACK}`
      : `0.14rem solid ${COLORS.GREY[300]}`};
  color: ${COLORS.BLACK};
  font-size: 1rem;
  ::placeholder {
    color: ${COLORS.GREY[400]};
    font-weight: 200;
  }
  outline: none;
`;

const Message = styled.p`
  font-size: 1rem;
  color: ${COLORS.BLACK};
`;

type InputProps = {
  /** input 안의 초깃값 */
  value?: string | number;
  /** 변화가 일어났을떄 호출되는 함수 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** input type : ex> text,password,checkbox etc. */
  type?: string;
  /** 자리표시자 */
  placeholder?: string | number;
  /** label 숨길지 여부 */
  labelHidden?: boolean;
  /** label 내용 */
  label?: string;
  /** input 너비 */
  size?: number;
  /** 읽기 전용 */
  readOnly?: boolean;
  /** input의 입력 조건 */
  message?: string;
  /** classname */
  className?: string;
};

export default function Input({
  value,
  onChange,
  type,
  placeholder = "",
  labelHidden = false,
  label,
  size = 26.25,
  readOnly = false,
  message = "",
  className,
}: InputProps) {
  return (
    <Wrapper>
      {!labelHidden && <Label>{label}</Label>}
      <InputWrapper
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder.toString()}
        size={size}
        readOnly={readOnly}
        className={className}
      />
      {message.length > 0 && <Message> {message}</Message>}
    </Wrapper>
  );
}
