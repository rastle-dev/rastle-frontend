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
  gap: 0.5rem;
  padding-top: 1rem;
  width: 55rem;
  height: ${({ isLoading }) => (isLoading ? "50rem" : "auto")};
  @media (max-width: 1007px) {
    width: 94%;
  }
`;
export const Box = styled.div<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: ${({ inValid }) => (inValid ? "center" : "flex-end")};
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
  width: 6rem;
  height: 3rem;
  padding: 0.62rem;
  font-size: 1rem;
  @media (max-width: 1007px) {
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

export const DeliveryBox = styled.div`
  padding-top: 3rem;
  font-size: 1.333rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const DeliveryInput = styled(Input)`
  font-size: 1.333rem;
  width: 100%;
`;
export const Postal = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
export const PostalButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const PostalButton = styled(Button)`
  padding: 1rem 3rem 1rem 3rem;
  border-radius: 10px;
  font-size: 1rem;
  width: 11rem;
  ${media.small} {
    width: 10.5rem;
  }
  ${media.xsmall} {
    width: 10.5em;
  }
`;
