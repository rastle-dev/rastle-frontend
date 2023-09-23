import React from "react";
import styled from "styled-components";
import * as S from "@/styles/login/index.styles";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import media from "@/styles/media";
import useMypage from "@/hooks/useMypage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 4rem;
  width: 50%;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
const PasswordInput = styled(Input)`
  width: 95%;
  height: 4rem;
  font-size: 1.2rem;
  &::placeholder {
    font-size: 1.2rem;
    border: none;
    font-weight: 400;
  }
  &:focus {
    border-bottom: 2px solid;
  }
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  ${media.mobile} {
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
      border: none;
      font-weight: 400;
    }
  }
`;
const PasswordChangeButton = styled(Button)`
  border-radius: 0.625rem;
  width: 5.3rem;
  height: 3rem;
  padding: 0.62rem;
  font-size: 1rem;
`;
const DeleteButtonWrapper = styled.div`
  padding-top: 5rem;
  display: flex;
  justify-content: flex-end; /* 오른쪽 끝으로 이동 */
  width: 50%;
`;
const DeleteButton = styled(Button)`
  border: none;
  border-radius: 0;
  width: 5.3rem;
  height: 3rem;
  padding: 0.62rem;
  font-size: 1rem;
  &:hover {
    border: none;
    color: red;
    font-weight: 500;
  }
  &:focus {
    font-weight: 500;
  }
`;
export default function LoginInfo() {
  const { email, password, onChangePassword } = useMypage();
  const inputs = [
    {
      label: "이메일 주소",
      value: email,
    },
    {
      placeholder: "●●●●●●●●",
      label: "비밀번호",
      type: "password",
      onChange: onChangePassword,
      buttonTitle: "변경",
    },
    {
      label: "전화번호",
      value: "010-3009-2255",
      onChange: onChangePassword,
    },
  ];
  console.log(password);
  return (
    <div>
      <h2>로그인 정보</h2>
      {inputs.map((input) => (
        <Wrapper>
          {input.buttonTitle ? (
            <Box>
              <PasswordInput
                key={input.label}
                placeholder={input.placeholder}
                label={input.label}
                type={input.type}
                value={input.value}
                onChange={input.onChange}
              />
              <PasswordChangeButton title="변경" />
            </Box>
          ) : (
            <S.StyledInput
              key={input.label}
              placeholder={input.placeholder}
              label={input.label}
              type={input.type}
              value={input.value}
              onChange={input.onChange}
            />
          )}
        </Wrapper>
      ))}
      <DeleteButtonWrapper>
        <DeleteButton title="탈퇴하기" />
      </DeleteButtonWrapper>
    </div>
  );
}
