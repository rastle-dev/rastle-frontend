import styled from "styled-components";
import React, { ReactNode } from "react";
import MainHeader from "@/components/Layout/MainHeader";
import Footer from "@/components/Layout/Footer";
import dynamic from "next/dynamic";

const Full = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  flex-direction: column;
  background-color: white;
  //padding-top: 5.5rem; /* header때문에 추가 */
`;

const Inner = styled.div`
  width: 100%;
  //height: 100vh;
  display: flex;
  justify-content: center;
`;
interface MainLayoutProps {
  children: ReactNode;
}
// const Footer = dynamic(() => import("@/components/Layout/Footer/index"));

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Full>
      <MainHeader />
      <Inner>{children}</Inner>
      <Footer />
    </Full>
  );
}

export default MainLayout;
