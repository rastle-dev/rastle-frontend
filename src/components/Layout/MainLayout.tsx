import styled from "styled-components";
import React, { ReactNode } from "react";
import MainHeader from "@/components/Layout/MainHeader";
// import Footer from "@/components/Layout/Footer";
import dynamic from "next/dynamic";
import LazyHydrate from "react-lazy-hydration";

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
const Footer = dynamic(() => import("@/components/Layout/Footer/index"), {
  ssr: false, // 서버 사이드에서 Lazy 로딩을 지원
});
function MainLayout({ children }: MainLayoutProps) {
  return (
    <Full>
      <MainHeader />
      <Inner>{children}</Inner>
      <LazyHydrate whenVisible>
        <Footer />
      </LazyHydrate>
    </Full>
  );
}

export default MainLayout;
