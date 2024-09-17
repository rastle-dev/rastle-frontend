import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainHeader from "@/components/Layout/MainHeader";
import dynamic from "next/dynamic";

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
  width: 100%;
  display: flex;
  justify-content: center;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}
const Footer = dynamic(() => import("@/components/Layout/Footer"), {
  ssr: false,
});

function MainLayout({ children }: MainLayoutProps) {
  const [loadFooter, setLoadFooter] = useState(false);

  useEffect(() => {
    const footerPlaceholder = document.getElementById("footer-placeholder");

    if (footerPlaceholder) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setLoadFooter(true);
            observer.disconnect();
          }
        },
        { rootMargin: "100px" }, // 이 설정으로 footer가 뷰포트에 들어오기 100px 전에 로드됩니다.
      );

      observer.observe(footerPlaceholder);

      // 컴포넌트가 unmount될 때 observer 해제
      return () => observer.disconnect();
    }
    return undefined;
  }, []);

  return (
    <Full>
      <MainHeader />
      <Inner>{children}</Inner>
      <div id="footer-placeholder">{loadFooter && <Footer />}</div>
    </Full>
  );
}

export default MainLayout;
