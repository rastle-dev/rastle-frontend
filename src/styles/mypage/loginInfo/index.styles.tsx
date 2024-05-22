import styled from "styled-components";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";
import media from "@/styles/media";

interface ButtonProps {
  inValid: boolean;
}
export const Wrapper = styled.div<{ isLoading?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 4rem;
  //height: 100%;
  width: 55rem;
  height: ${({ isLoading }) => (isLoading ? "50rem" : "auto")};
  @media (max-width: 1007px) {
    width: 94%;
  }
`;
export const Box = styled.div<ButtonProps>`
  display: flex;
  flex-direction: row;
  ${media.mobile} {
    width: 44rem;
    font-size: 1.4rem;
  }
  align-items: ${({ inValid }) => (inValid ? "center" : "flex-end")};
`;
export const PasswordInput = styled(Input)`
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
  @media (max-width: 1007px) {
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
      border: none;
      font-weight: 400;
    }
  }
`;
export const PasswordChangeButton = styled(Button)`
  border-radius: 0.625rem;
  width: 5.3rem;
  height: 3rem;
  padding: 0.62rem;
  font-size: 1rem;
`;
export const MobileLogoutButton = styled(Button)`
  border: none;
  border-radius: 0;
  width: 8rem;
  height: 3rem;
  padding: 0.62rem;
  color: red;
  font-weight: 400;
  font-size: 1.4rem;

  @media (min-width: 1007px) {
    display: none;
  }
  &:hover {
    border: none;
    color: red;
    font-weight: 500;
  }
  &:focus {
    font-weight: 500;
  }
`;

export const DeleteButtonWrapper = styled.div`
  padding-top: 5rem;
  display: flex;
  justify-content: flex-end; /* 오른쪽 끝으로 이동 */
  width: 55.7rem;
  @media (max-width: 1007px) {
    width: 95%;
  }
`;
export const DeleteButton = styled(Button)`
  border: none;
  border-radius: 0;
  width: 8rem;
  height: 3rem;
  padding: 0.62rem;
  font-size: 1.3rem;
  ${media.mobile} {
    width: 8rem;
    font-size: 1.4rem;
  }
  &:hover {
    border: none;
    color: red;
    font-weight: 500;
  }
  &:focus {
    font-weight: 500;
  }
`;
