import React from "react";
import styled from "styled-components";
import COLORS from "../../../constants/color";

const Wrapper = styled.div``;
const Label = styled.div<{ invalid?: boolean }>`
  font-size: 1rem;
  color: ${(props) => (props.invalid ? COLORS.RED : COLORS.블랙)};
  padding: 0 0 0.1rem 0.2rem;

  @media screen and (min-width: 0px) and (max-width: 769px) {
    font-size: 1.3rem;
    font-weight: 500;
  }
`;

const InputWrapper = styled.input<{
  size: number;
  invalid?: boolean;
  readOnly: boolean;
}>`
  ${({ size, readOnly }) => `
    width: ${size}rem;
    cursor: ${readOnly ? "default" : "pointer"};
`}
  width: 100%;
  padding: 0.9rem 0.2rem;
  border: none;
  border-bottom: 0.07rem solid
    ${(props) => (props.invalid ? COLORS.RED : COLORS.GREY[300])};
  // border-bottom:
  ${(props) =>
    props.onChange
      ? `0.07rem solid ${COLORS.블랙}`
      : `0.14rem solid ${COLORS.GREY[300]}`};
  color: ${COLORS.블랙};
  font-size: 1rem;
  ::placeholder {
    color: ${COLORS.GREY[400]};
    font-weight: 200;
  }
  outline: none;
  border-radius: 0;
`;

const Message = styled.p<{ invalid?: boolean }>`
  font-size: 0.7rem;
  margin-bottom: 0;
  color: ${(props) => (props.invalid ? COLORS.RED : COLORS.블랙)};
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
  checked?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  maxLength?: number;
};

export default function Input({
  value,
  onChange,
  type,
  placeholder = "",
  labelHidden = false,
  label,
  size = 0,
  readOnly = false,
  message = "",
  className,
  checked,
  invalid = false,
  disabled = false,
  maxLength,
}: InputProps) {
  const isCheckbox = type === "checkbox";
  let inputWidth = "100%"; // 기본값 설정
  if (isCheckbox) inputWidth = "auto";
  else if (size !== 0) inputWidth = `${size}%`; // size를 입력하지 않을 경우 100%

  return (
    <Wrapper style={{ width: inputWidth }}>
      {!labelHidden && <Label invalid={invalid}>{label}</Label>}
      <InputWrapper
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder.toString()}
        size={size}
        readOnly={readOnly}
        className={className}
        checked={checked}
        invalid={invalid}
        disabled={disabled}
        maxLength={maxLength}
      />
      {message.length > 0 && <Message invalid={invalid}> {message}</Message>}
    </Wrapper>
  );
}
