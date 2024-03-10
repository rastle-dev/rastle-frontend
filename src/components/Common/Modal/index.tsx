import React from "react";
import styled from "styled-components";
import IconButton from "@/components/Common/IconButton";

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  width?: number;
}
const ButtonWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
`;
const ModalBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  display: flex;
  z-index: 999;
`;

const ModalBox = styled.div<{ width: number }>`
  ${({ width }) => `
    width: ${width && width}rem;
  `}
  position: fixed;
  border-radius: 1rem;
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    //width: 100%;
    max-width: 90%;
  }
`;

export default function Modal({
  children,
  closeModal,
  width = 50,
}: ModalProps) {
  return (
    <ModalBackground onClick={closeModal}>
      <ModalBox onClick={(e) => e.stopPropagation()} width={width}>
        <ButtonWrapper>
          <IconButton
            iconName="deleteSmall"
            iconSize="2rem"
            border={0.6}
            onClick={closeModal}
          />
        </ButtonWrapper>
        {children}
      </ModalBox>
    </ModalBackground>
  );
}
