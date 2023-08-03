import styled from "styled-components";
import React, { ReactNode } from "react";
import DefaultHeader from "@/components/common/Layout/DefaultHeader";

const Full = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  flex-direction: column;
  background-color: white;
`;

const Inner = styled.div`
  width: 88%;
  display: flex;
  justify-content: center;
`;
interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Full>
      <DefaultHeader />
      <Inner>{children}</Inner>
    </Full>
  );
}

export default DefaultLayout;
